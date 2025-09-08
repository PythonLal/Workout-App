let currentRoutine = [];
let currentExerciseIndex = 0;
let timeLeft = 0;
let timerAnimationFrame;
let lastTime = 0;
let isPaused = false;
let currentSection = 'warmup';
let totalRoutineTime = 0;
let completedTime = 0;
let touchStartX = 0;
let touchEndX = 0;
let imageCache = new Map();

// Event listeners for initialization
document.addEventListener('DOMContentLoaded', initializeApp);

function initializeApp() {
    // Initialize swipe detection for mobile
    const exerciseDisplay = document.querySelector('.exercise-display');
    exerciseDisplay.addEventListener('touchstart', handleTouchStart, false);
    exerciseDisplay.addEventListener('touchend', handleTouchEnd, false);

    // Initialize progress bar
    const progressBarContainer = document.createElement('div');
    progressBarContainer.className = 'progress-container';
    progressBarContainer.innerHTML = `
        <div class="progress-bar" id="workout-progress">
            <div class="progress-fill" id="progress-fill"></div>
        </div>
        <div class="progress-text" id="progress-text">0%</div>
    `;
    document.querySelector('.exercise-header').appendChild(progressBarContainer);

    // Preload audio and add keyboard shortcuts
    document.getElementById('chime').load();
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

function handleKeyboardShortcuts(event) {
    if (event.code === 'Space') {
        togglePause();
        event.preventDefault();
    } else if (event.code === 'ArrowRight' || event.code === 'KeyN') {
        proceedToNext();
    }
}

const handleTouchStart = (event) => touchStartX = event.changedTouches[0].screenX;

function handleTouchEnd(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipeGesture();
}

function handleSwipeGesture() {
    const swipeDistance = touchEndX - touchStartX;
    const minSwipeDistance = 50;
    
    if (swipeDistance < -minSwipeDistance) proceedToNext();
    else if (swipeDistance > minSwipeDistance) togglePause();
}

function preloadImages(routine) {
    routine.forEach(exercise => {
        if (!imageCache.has(exercise.gifUrl)) {
            const img = new Image();
            img.src = exercise.gifUrl;
            img.onload = () => imageCache.set(exercise.gifUrl, img);
            img.onerror = () => {
                console.warn(`Failed to load image: ${exercise.gifUrl}`);
                imageCache.set(exercise.gifUrl, 'fallback.png');
            };
        }
    });
}

const calculateTotalTime = (routine) => routine.reduce((total, exercise) => 
    exercise.isRepBased ? total : total + exercise.duration, 0);

function updateProgressBar() {
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');

    if (!progressFill || !progressText) return;

    const percentage = totalRoutineTime === 0 ? 0 : Math.min(Math.floor((completedTime / totalRoutineTime) * 100), 100);
    progressFill.style.width = `${percentage}%`;
    progressText.textContent = `${percentage}%`;
}

function toggleElementDisplay(selector, display) {
    const element = document.querySelector(selector);
    if (element) element.style.display = display;
}

function showRoutineSelection() {
    showMainTitle();
    toggleElementDisplay('.routine-selection', 'grid');
    toggleElementDisplay('.complete', 'none');
}

function startRoutine(day) {
    hideMainTitle();
    if (!weeklyRoutines[day]) {
        console.error('Invalid routine day:', day);
        return;
    }

    currentRoutine = weeklyRoutines[day].exercises;
    preloadImages(currentRoutine);
    totalRoutineTime = calculateTotalTime(currentRoutine);
    completedTime = 0;
    currentExerciseIndex = 0;
    
    toggleElementDisplay('.routine-selection', 'none');
    toggleElementDisplay('.exercise-display', 'flex');
    toggleElementDisplay('.complete', 'none');

    updateProgressBar();
    startExercise();
}

function updateBreakIndicator(isBreak) {
    const breakIndicator = document.querySelector('.break-indicator');
    const timerContainer = document.querySelector('.timer-container');
    
    breakIndicator.style.display = isBreak ? 'block' : 'none';
    timerContainer.classList.toggle('break-mode', isBreak);
}

function startExercise() {
    cancelAnimationFrame(timerAnimationFrame);

    if (currentExerciseIndex >= currentRoutine.length) {
        showComplete();
        return;
    }

    const exercise = currentRoutine[currentExerciseIndex];
    updateBreakIndicator(exercise.isBreak);
    
    document.querySelector('.exercise-name').textContent = exercise.name;
    document.querySelector('.exercise-info').innerHTML = exercise.info || '';

    // Set aria-label for accessibility
    const exerciseGifContainer = document.querySelector('.exercise-gif');
    exerciseGifContainer.setAttribute('aria-label', `Visual demonstration of ${exercise.name}`);

    // Use cached image if available
    const imageUrl = imageCache.has(exercise.gifUrl) ?
        (imageCache.get(exercise.gifUrl) instanceof HTMLImageElement ?
            imageCache.get(exercise.gifUrl).src : imageCache.get(exercise.gifUrl)) :
        exercise.gifUrl;

    exerciseGifContainer.innerHTML = `<img src="${imageUrl}" alt="${exercise.name}" style="object-fit: contain; width: 100%; height: 100%;">`;
    document.querySelector('.exercise-progress').textContent = `Exercise ${currentExerciseIndex + 1} of ${currentRoutine.length}`;

    // Display motivational message
    handleMotivationalMessage(exercise.isBreak);

    // Reset pause state
    isPaused = false;
    updatePauseButton();

    if (exercise.isRepBased) {
        handleRepBasedExercise(exercise);
    } else {
        handleTimeBasedExercise(exercise);
    }
}

function handleMotivationalMessage(isBreak) {
    let motivationElement = document.querySelector('.motivation-message');
    if (!motivationElement) {
        motivationElement = document.createElement('div');
        motivationElement.className = 'motivation-message';
        document.querySelector('.timer-container').insertAdjacentElement('beforebegin', motivationElement);
    }
    
    if (!isBreak) {
        motivationElement.textContent = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
        motivationElement.style.display = 'block';
    } else {
        motivationElement.style.display = 'none';
    }
}

function handleRepBasedExercise(exercise) {
    toggleElementDisplay('.timer', 'none');
    toggleElementDisplay('.reps-display', 'block');
    toggleElementDisplay('.proceed-btn', 'block');
    toggleElementDisplay('.timer-controls', 'none');
    document.querySelector('.reps-display').textContent = exercise.reps;
}

function handleTimeBasedExercise(exercise) {
    toggleElementDisplay('.timer', 'block');
    toggleElementDisplay('.reps-display', 'none');
    toggleElementDisplay('.timer-controls', 'flex');
    toggleElementDisplay('.proceed-btn', 'block');
    
    timeLeft = exercise.duration;
    updateTimerDisplay();
    startTimer();
}

function togglePause() {
    isPaused = !isPaused;
    updatePauseButton();

    if (isPaused) {
        cancelAnimationFrame(timerAnimationFrame);
    } else {
        lastTime = performance.now();
        startTimer();
    }
}

function updatePauseButton() {
    const pauseBtn = document.querySelector('.control-btn');
    pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';
    pauseBtn.classList.toggle('pause', !isPaused);
    pauseBtn.classList.toggle('resume', isPaused);
    pauseBtn.setAttribute('aria-pressed', isPaused);
    pauseBtn.setAttribute('aria-label', isPaused ? 'Resume workout' : 'Pause workout');
}

function startTimer() {
    cancelAnimationFrame(timerAnimationFrame);
    lastTime = performance.now();

    function animateTimer(currentTime) {
        if (isPaused) return;

        const deltaTime = currentTime - lastTime;

        if (deltaTime >= 1000) {
            lastTime = currentTime;
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();

                if (timeLeft === 0) {
                    playCompletionSound();
                    vibrateIfSupported();
                    setTimeout(proceedToNext, 1000);
                }
            }
        }

        if (timeLeft > 0) timerAnimationFrame = requestAnimationFrame(animateTimer);
    }

    timerAnimationFrame = requestAnimationFrame(animateTimer);
}

function toggleMainTitleVisibility(isVisible) {
    const mainTitle = document.getElementById('mainTitle');
    const workoutText = document.querySelector('.workout-selection-text');
    const routineSelection = document.querySelector('.routine-selection');
    
    if (mainTitle) mainTitle.classList.toggle('main-title-hidden', !isVisible);
    if (workoutText) workoutText.style.display = isVisible ? 'block' : 'none';
    if (routineSelection) routineSelection.style.display = isVisible ? 'grid' : 'none';
}

const hideMainTitle = () => toggleMainTitleVisibility(false);
const showMainTitle = () => toggleMainTitleVisibility(true);

function playCompletionSound() {
    document.getElementById('chime').play().catch(error => 
        console.log('Audio play failed:', error));
}

const vibrateIfSupported = () => navigator.vibrate?.(200);

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.querySelector('.timer').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    // Update progress bar
    const currentExercise = currentRoutine[currentExerciseIndex];
    if (!currentExercise.isRepBased) {
        const exerciseDuration = currentExercise.duration;
        const elapsedInThisExercise = exerciseDuration - timeLeft;
        updateProgressBar(completedTime + elapsedInThisExercise);
    }
}

const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

function proceedToNext() {
    cancelAnimationFrame(timerAnimationFrame);

    // Track completed time for progress bar
    if (currentExerciseIndex < currentRoutine.length) {
        const currentExercise = currentRoutine[currentExerciseIndex];
        if (!currentExercise.isRepBased) {
            completedTime += currentExercise.duration;
            updateProgressBar();
        }
    }

    currentExerciseIndex++;
    startExercise();
}

function showComplete() {
    cancelAnimationFrame(timerAnimationFrame);
    toggleElementDisplay('.exercise-display', 'none');

    const completeSection = document.querySelector('.complete');
    completeSection.style.display = 'flex';
    completeSection.setAttribute('role', 'status');
    completeSection.setAttribute('aria-live', 'assertive');

    playCompletionSound();
    vibrateIfSupported();
    saveWorkoutCompletion();
}

function saveWorkoutCompletion() {
    try {
        const workoutHistory = JSON.parse(localStorage.getItem('workoutHistory')) || [];
        const routineType = currentSection === 'warmup' ? 'warmup' :
            currentRoutine === exercises.gripRoutine ? 'Grip' :
                currentRoutine === exercises.warmup.concat(exercises.routineA) ? 'A' : 'B';

        workoutHistory.push({
            date: new Date().toISOString(),
            routine: routineType
        });

        localStorage.setItem('workoutHistory', JSON.stringify(workoutHistory));
    } catch (error) {
        console.error('Error saving workout data:', error);
    }
}