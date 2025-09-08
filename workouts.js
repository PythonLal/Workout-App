// Base exercise templates to eliminate duplication
const BASE_EXERCISES = Object.freeze({
    neckRotations: { name: "Neck rotations", info: "Gently rotate your head in circles to warm up neck muscles", gifUrl: "Neck rotations.gif", isRepBased: true },
    armCircles: { name: "Arm circles", info: "Circle your arms forward and backward to warm up shoulders", gifUrl: "Arm circles.gif", isRepBased: true },
    hipRotations: { name: "Hip rotations", info: "Rotate your hips in circles to improve mobility", gifUrl: "Hip rotations.gif", isRepBased: true },
    spotJogging: { name: "Spot jogging", info: "Jog in place to elevate heart rate", gifUrl: "Spot jogging.gif" },
    hanumanDand: { name: "Hanuman Dand", info: "Complete full-body exercise that builds strength and endurance", gifUrl: "Hanuman Dand.gif" },
    hinduPushups: { name: "Hindu Push-ups", info: "Dynamic push-up variation that improves chest, shoulder and tricep strength", gifUrl: "Dand.gif" },
    diamondPushups: { name: "Diamond Push-ups", info: "Form a diamond shape with hands to focus on triceps", gifUrl: "Diamond Push-ups.gif" },
    mountainClimbers: { name: "Mountain Climbers", info: "Drive knees to chest rapidly to elevate heart rate and engage core", gifUrl: "Mountain Climbers.gif" },
    plankHold: { name: "Plank Hold", info: "Hold plank position to strengthen core", gifUrl: "Plank Hold.gif" },
    jumpingJacks: { name: "Jumping jacks", info: "Full body warmup to prepare for the workout", gifUrl: "Jumping jacks.gif" },
    walkingLunges: { name: "Walking Lunges", info: "Perform lunges while moving forward", gifUrl: "Lunges.gif" },
    gluteBridge: { name: "Glute Bridge", info: "Lift hips up and down to strengthen lower back and glutes", gifUrl: "Glute Bridge.gif" },
    russianTwists: { name: "Russian Twists", info: "Rotate torso side to side to engage obliques", gifUrl: "Russian Twists.gif" },
    bicycleCrunches: { name: "Bicycle Crunches", info: "Rotate elbow to opposite knee to engage abs and obliques", gifUrl: "Bicycle Crunches.gif" },
    sidePlanks: { name: "Side Planks", info: "Hold side plank while performing circular motions with free arm", gifUrl: "Side Planks.gif" },
    birdDog: { name: "Bird Dog Exercise", info: "Extend opposite arm and leg while balancing to improve stability", gifUrl: "Bird Dog Exercise.gif" },
    burpees: { name: "Burpees", info: "Complete burpee movement for full body conditioning", gifUrl: "Burpees.gif" },
    stretching: { name: "Stretching", info: "Complete stretching routine", gifUrl: "Stretching.gif" }
});

// Helper function to create exercise variations with different durations/reps
const createExercise = (base, duration, reps = null, infoSuffix = "", nameSuffix = "") => Object.freeze({
    ...base,
    name: base.name + nameSuffix,
    duration,
    ...(reps && { reps }),
    info: base.info + infoSuffix,
    isRepBased: !!reps
});

// Generate exercises with variations using the helper
const EXERCISES = Object.freeze({
    // Warm-up exercises
    neckRotations: createExercise(BASE_EXERCISES.neckRotations, 30, "10 each direction"),
    armCircles: createExercise(BASE_EXERCISES.armCircles, 30, "10 each direction"),
    hipRotations: createExercise(BASE_EXERCISES.hipRotations, 30, "10 each direction"),
    spotJogging: createExercise(BASE_EXERCISES.spotJogging, 60),
    spotJogging120: createExercise(BASE_EXERCISES.spotJogging, 120),
    lightSpotJogging: createExercise(BASE_EXERCISES.spotJogging, 120, null, "", " (Light)"),
    highKnees: createExercise({ ...BASE_EXERCISES.spotJogging, name: "High knees", info: "Bring knees to chest height for increased intensity", gifUrl: "High knees.gif" }, 30),
    jumpingJacks30: createExercise(BASE_EXERCISES.jumpingJacks, 30),
    jumpingJacks60: createExercise(BASE_EXERCISES.jumpingJacks, 60),
    
    // Main exercises with duration variations
    hanumanDand120: createExercise(BASE_EXERCISES.hanumanDand, 120),
    hanumanDand180: createExercise(BASE_EXERCISES.hanumanDand, 180),
    hanumanDand240: createExercise(BASE_EXERCISES.hanumanDand, 240),
    hanumanDand300: createExercise(BASE_EXERCISES.hanumanDand, 300),
    hinduPushups120: createExercise(BASE_EXERCISES.hinduPushups, 120),
    hinduPushups180: createExercise(BASE_EXERCISES.hinduPushups, 180),
    hinduPushups240: createExercise(BASE_EXERCISES.hinduPushups, 240),
    diamondPushups120: createExercise(BASE_EXERCISES.diamondPushups, 120),
    diamondPushups180: createExercise(BASE_EXERCISES.diamondPushups, 180),
    mountainClimbers120: createExercise(BASE_EXERCISES.mountainClimbers, 120),
    mountainClimbers180: createExercise(BASE_EXERCISES.mountainClimbers, 180, null, " to elevate heart rate"),
    plankHold90: createExercise(BASE_EXERCISES.plankHold, 90),
    plankHold180: createExercise(BASE_EXERCISES.plankHold, 180, null, " while switching between palms and fingertips every 10 seconds", " with Hand Position Changes"),
    walkingLunges120: createExercise(BASE_EXERCISES.walkingLunges, 120),
    walkingLunges180: createExercise(BASE_EXERCISES.walkingLunges, 180, null, " while twisting a towel", " with Towel Wringing"),
    walkingLunges240: createExercise(BASE_EXERCISES.walkingLunges, 240, null, " while twisting a towel in alternating directions", " with Towel Wringing"),
    gluteBridge120: createExercise(BASE_EXERCISES.gluteBridge, 120),
    gluteBridge180: createExercise(BASE_EXERCISES.gluteBridge, 180),
    gluteBridgeSlow: createExercise(BASE_EXERCISES.gluteBridge, 180, null, "", " (slow)"),
    russianTwists90: createExercise(BASE_EXERCISES.russianTwists, 90),
    russianTwists120: createExercise(BASE_EXERCISES.bicycleCrunches, 120),
    russianTwists180: createExercise(BASE_EXERCISES.russianTwists, 180, null, " - Between twists, place hands on ground and lift quickly", " with Hand Release"),
    bicycleCrunches180: createExercise(BASE_EXERCISES.bicycleCrunches, 180),
    sidePlanks: createExercise(BASE_EXERCISES.sidePlanks, 180, null, " - 1.5 min each side", " with Top Arm Movements"),
    sidePlanksShort: createExercise(BASE_EXERCISES.sidePlanks, 180, null, "", " with Top Arm Movements"),
    birdDog180: createExercise(BASE_EXERCISES.birdDog, 180),
    birdDogSlow: createExercise(BASE_EXERCISES.birdDog, 180, null, "", " (slow)"),
    burpees120: createExercise(BASE_EXERCISES.burpees, 120),
    
    // Specialized exercises
    fingerExtensions: createExercise({ name: "Finger Extensions", info: "Wrap a rubber band around fingers and open against resistance", gifUrl: "Finger Extensions.gif" }, 60),
    wristCurls: createExercise({ name: "Wrist Curls and Extensions", info: "60 seconds palm up curls followed by 60 seconds palm down extensions", gifUrl: "Wrist Curls.gif" }, 180),
    wristRotations: createExercise({ name: "Wrist Rotations", info: "Hold a light object and rotate wrist in all directions", gifUrl: "Wrist Rotations.gif" }, 120),
    gentleWristRotations: createExercise({ name: "Wrist Rotations", info: "Gentle wrist rotations", gifUrl: "Wrist Rotations.gif" }, 120),
    wallSits: createExercise({ name: "Wall Sits", info: "Hold wall sit while squeezing a rolled towel or making a tight fist", gifUrl: "Wall Sits.gif" }, 180, null, "", " with Isometric Hand Squeeze"),
    calfRaises: createExercise({ name: "Standing Calf Raises", info: "Perform calf raises while holding towel with arms extended, pulling apart", gifUrl: "Standing Calf Raises.gif" }, 180, null, "", " with Towel Pull-Apart"),
    calfRaisesShort: createExercise({ name: "Standing Calf Raises", info: "Perform calf raises while holding towel with arms extended", gifUrl: "Standing Calf Raises.gif" }, 180, null, "", " with Towel Pull-Apart"),
    
    // HIIT exercises
    hiitBurpeeFinisher: createExercise({ name: "HIIT Burpee Finisher", info: "30 seconds max effort burpees followed by 10 seconds rest, repeat", gifUrl: "Burpees.gif" }, 180),
    hiitBurpeeFinisher240: createExercise({ name: "HIIT Burpee Finisher", info: "High intensity burpee intervals", gifUrl: "Burpees.gif" }, 240),
    hiitJumpingJacks: createExercise({ name: "HIIT Jumping Jack Finisher", info: "30 seconds max effort jumping jacks followed by 10 seconds rest", gifUrl: "Jumping jacks.gif" }, 120),
    hiitJumpingJacks180: createExercise({ name: "HIIT Jumping Jack Finisher", info: "High intensity jumping jack intervals", gifUrl: "Jumping jacks.gif" }, 180),
    
    // Grip exercises
    fingerCurls: createExercise({ name: "Finger Curls", info: "Roll up a small towel from the edge to strengthen finger flexors", gifUrl: "Finger Curls.webp" }, 120),
    gripHolds: createExercise({ name: "Grip Holds", info: "Hold heavy books or objects with fingertips to build hand strength", gifUrl: "Grip Holds.gif" }, 120),
    paperCrumpling: createExercise({ name: "Paper Crumpling", info: "Crumple paper one-handed, then smooth it out, repeat", gifUrl: "Paper Crumpling.gif" }, 120),
    fistClenches: createExercise({ name: "Fist Clenches", info: "Squeeze a stress ball or tennis ball repeatedly", gifUrl: "Fist Clenches.gif" }, 120),
    gripRoutine: createExercise({ name: "Grip Routine", info: "Complete grip strengthening exercises - finger curls, holds, wrist rotations, paper crumpling, fist clenches", gifUrl: "Grip Holds.gif" }, 240),
    
    // Special compound exercises
    highIntensityWarmup: createExercise({ name: "High-intensity Warmup", info: "Dynamic warmup with neck rotations, arm circles, hip rotations, spot jogging, high knees, jumping jacks", gifUrl: "High Intensity Warmup.gif" }, 300),
    gentleNeckRotations: createExercise(BASE_EXERCISES.neckRotations, 60, null, "", " (Gentle)"),
    gentleArmCircles: createExercise(BASE_EXERCISES.armCircles, 60, null, "", " (Gentle)"),
    gentleHipRotations: createExercise(BASE_EXERCISES.hipRotations, 60, null, "", " (Gentle)"),
    yogaPoses: createExercise({ name: "Gentle Yoga Poses", info: "Relaxing yoga poses for flexibility", gifUrl: "Yoga Poses.webp" }, 300),
    
    // Stretching exercises
    coolDownStretching: createExercise({ name: "Cool-down Stretching", info: "Light stretching to relax muscles", gifUrl: "Stretching.gif" }, 180),
    legStretches: createExercise({ name: "Leg Stretches", info: "Stretch your leg muscles to improve flexibility", gifUrl: "Leg Stretches.gif" }, 180),
    coreStretches: createExercise({ name: "Core Stretches", info: "Stretch your core muscles to improve flexibility", gifUrl: "Core Stretches.gif" }, 180),
    fullBodyStretch: createExercise({ name: "Full Body Stretch", info: "Complete stretching routine for all muscle groups", gifUrl: "Full Body Stretch.gif" }, 300),
    stretching: createExercise(BASE_EXERCISES.stretching, 180),
    recoveryStretching: createExercise({ name: "Recovery Stretching", info: "Recovery stretching to relax muscles", gifUrl: "Recovery Stretching.webp" }, 180),
    fullBodyStretchingLong: createExercise({ name: "Full Body Stretching", info: "Complete full body stretching routine (5-7 minutes)", gifUrl: "Full Body Stretch.gif" }, 420)
});

// Enhanced break durations with GIF support
const BREAKS = Object.freeze({
    short: Object.freeze({ name: "Quick Rest", duration: 15, info: "Take a short break - breathe deeply and shake out your muscles", gifUrl: "Break.gif", isBreak: true }),
    medium: Object.freeze({ name: "Rest & Hydrate", duration: 30, info: "Take a break, drink water, and prepare for the next exercise", gifUrl: "Break.gif", isBreak: true }),
    long: Object.freeze({ name: "Extended Break", duration: 60, info: "Take a longer break - stretch lightly and catch your breath", gifUrl: "Break.gif", isBreak: true }),
    recovery: Object.freeze({ name: "Recovery Break", duration: 45, info: "Recovery time - focus on deep breathing and muscle relaxation", gifUrl: "Break.gif", isBreak: true }),
    waterBreak: Object.freeze({ name: "Water Break", duration: 20, info: "Hydration break - drink water and towel off", gifUrl: "Break.gif", isBreak: true })
});

// Helper function to create exercise sequences with breaks
const withBreaks = (exercises, breakType = 'short') => { const result = []; const breakObj = BREAKS[breakType]; exercises.forEach((exercise, index) => { result.push(exercise); if (index < exercises.length - 1) result.push(breakObj); }); return result; };

// Optimized workout routines using shared exercises
const weeklyRoutines = Object.freeze({
    monday: Object.freeze({ name: "Monday - Upper Body Focus", exercises: Object.freeze([EXERCISES.neckRotations, EXERCISES.armCircles, EXERCISES.spotJogging, EXERCISES.highKnees, BREAKS.medium, ...withBreaks([EXERCISES.hanumanDand240, EXERCISES.hinduPushups180, EXERCISES.diamondPushups180, EXERCISES.mountainClimbers120, EXERCISES.plankHold180, EXERCISES.fingerExtensions, EXERCISES.wristCurls, EXERCISES.hiitBurpeeFinisher]), EXERCISES.coolDownStretching]) }),
    tuesday: Object.freeze({ name: "Tuesday - Lower Body Focus", exercises: Object.freeze([EXERCISES.hipRotations, EXERCISES.jumpingJacks60, EXERCISES.highKnees, EXERCISES.spotJogging120, BREAKS.medium, ...withBreaks([EXERCISES.hanumanDand240, EXERCISES.walkingLunges240, EXERCISES.gluteBridge180, EXERCISES.wallSits, EXERCISES.calfRaises, EXERCISES.russianTwists180, EXERCISES.hiitJumpingJacks]), EXERCISES.legStretches]) }),
    wednesday: Object.freeze({ name: "Wednesday - Core & Grip Focus", exercises: Object.freeze([EXERCISES.neckRotations, EXERCISES.armCircles, EXERCISES.hipRotations, EXERCISES.spotJogging, EXERCISES.highKnees, EXERCISES.jumpingJacks30, BREAKS.medium, ...withBreaks([EXERCISES.hanumanDand180, EXERCISES.bicycleCrunches180, EXERCISES.sidePlanks, EXERCISES.birdDog180, EXERCISES.fingerCurls, EXERCISES.gripHolds, EXERCISES.paperCrumpling, EXERCISES.fistClenches]), EXERCISES.wristRotations, EXERCISES.coreStretches]) }),
    thursday: Object.freeze({ name: "Thursday - Full Body HIIT", exercises: Object.freeze([EXERCISES.neckRotations, EXERCISES.armCircles, EXERCISES.hipRotations, EXERCISES.spotJogging, EXERCISES.highKnees, EXERCISES.jumpingJacks60, BREAKS.medium, ...withBreaks([EXERCISES.hanumanDand120, EXERCISES.mountainClimbers120, EXERCISES.burpees120], 'medium'), ...withBreaks([EXERCISES.hinduPushups120, EXERCISES.walkingLunges120, EXERCISES.russianTwists120], 'medium'), ...withBreaks([EXERCISES.diamondPushups120, EXERCISES.gluteBridge120, EXERCISES.plankHold90]), EXERCISES.russianTwists90, EXERCISES.fullBodyStretch]) }),
    friday: Object.freeze({ name: "Friday - Strength & Endurance", exercises: Object.freeze([EXERCISES.neckRotations, EXERCISES.armCircles, EXERCISES.hipRotations, EXERCISES.spotJogging, EXERCISES.highKnees, EXERCISES.jumpingJacks60, BREAKS.medium, EXERCISES.hanumanDand300, BREAKS.recovery, EXERCISES.hinduPushups240, BREAKS.waterBreak, EXERCISES.wallSits, EXERCISES.sidePlanksShort, EXERCISES.calfRaisesShort, EXERCISES.gripRoutine, EXERCISES.stretching]) }),
    saturday: Object.freeze({ name: "Saturday - Power & Conditioning", exercises: Object.freeze([EXERCISES.highIntensityWarmup, BREAKS.medium, EXERCISES.hanumanDand180, BREAKS.short, EXERCISES.mountainClimbers180, BREAKS.short, EXERCISES.hiitBurpeeFinisher240, BREAKS.recovery, EXERCISES.diamondPushups180, EXERCISES.birdDog180, EXERCISES.walkingLunges180, EXERCISES.hiitJumpingJacks180, EXERCISES.recoveryStretching]) }),
    sunday: Object.freeze({ name: "Sunday - Active Recovery & Flexibility", exercises: Object.freeze([EXERCISES.gentleNeckRotations, EXERCISES.gentleArmCircles, EXERCISES.gentleHipRotations, EXERCISES.lightSpotJogging, BREAKS.long, EXERCISES.yogaPoses, BREAKS.waterBreak, EXERCISES.birdDogSlow, EXERCISES.gluteBridgeSlow, EXERCISES.gentleWristRotations, EXERCISES.fullBodyStretchingLong]) })
});

// Optimized motivational messages with better performance
const motivationalMessages = Object.freeze(["Great job! Keep pushing!", "You're making amazing progress!", "Stay strong, you've got this!", "Feel the burn, embrace the challenge!", "One more step toward your goals!", "Your future self will thank you for not giving up!", "Every rep counts, every second matters!", "Breathe, focus, and conquer!", "You're stronger than you think!", "Progress is progress, no matter how small!"]);

// Break-specific motivational messages
const breakMessages = Object.freeze(["Perfect time to breathe and reset!", "You're doing amazing - use this time to hydrate!", "Great work so far, let your muscles recover!", "Shake it out and get ready for more!", "Listen to your body during this break!", "You've earned this rest - make it count!", "Deep breaths, you're crushing this workout!", "Recharge and refocus for what's next!", "Your muscles are getting stronger with each break!", "Stay hydrated and keep that energy up!"]);

// Utility functions for better performance and maintainability
const WorkoutUtils = Object.freeze({
    getWorkout: (dayKey) => weeklyRoutines[dayKey?.toLowerCase()],
    getDays: () => Object.keys(weeklyRoutines),
    getTotalDuration: (dayKey) => { const workout = WorkoutUtils.getWorkout(dayKey); return workout?.exercises.reduce((total, exercise) => total + exercise.duration, 0) || 0; },
    getExercisesByType: (dayKey, isBreak = false) => { const workout = WorkoutUtils.getWorkout(dayKey); return workout?.exercises.filter(exercise => !!exercise.isBreak === isBreak) || []; },
    formatDuration: (seconds) => { const mins = Math.floor(seconds / 60); const secs = seconds % 60; return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`; },
    getRandomMotivation: () => motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)],
    getRandomBreakMessage: () => breakMessages[Math.floor(Math.random() * breakMessages.length)],
    isValidExercise: (exercise) => exercise && typeof exercise.name === 'string' && typeof exercise.duration === 'number' && exercise.duration > 0,
    isBreak: (exercise) => !!exercise.isBreak,
    getBreakTypes: () => Object.keys(BREAKS),
    getBreakByType: (type) => BREAKS[type],
    getWorkoutStats: (dayKey) => {
        const workout = WorkoutUtils.getWorkout(dayKey);
        if (!workout) return null;
        const exercises = workout.exercises;
        const totalExercises = exercises.length;
        const breakCount = exercises.filter(ex => ex.isBreak).length;
        const workoutExercises = totalExercises - breakCount;
        const totalDuration = WorkoutUtils.getTotalDuration(dayKey);
        const breakDuration = exercises.filter(ex => ex.isBreak).reduce((total, ex) => total + ex.duration, 0);
        const exerciseDuration = totalDuration - breakDuration;
        return Object.freeze({
            totalExercises: workoutExercises, totalBreaks: breakCount, totalDuration, exerciseDuration, breakDuration,
            formattedDuration: WorkoutUtils.formatDuration(totalDuration),
            formattedExerciseDuration: WorkoutUtils.formatDuration(exerciseDuration),
            formattedBreakDuration: WorkoutUtils.formatDuration(breakDuration),
            repBasedExercises: exercises.filter(ex => ex.isRepBased && !ex.isBreak).length,
            timeBasedExercises: exercises.filter(ex => !ex.isRepBased && !ex.isBreak).length
        });
    }
});

// Export for use in other modules (if using modules)
if (typeof module !== 'undefined' && module.exports) { module.exports = { weeklyRoutines, motivationalMessages, breakMessages, WorkoutUtils, EXERCISES, BREAKS }; }