class TimerSettings {
    prepareTime;
    constructor(prepareTime = 15,
                workoutTime = 150,
                restTime = 60,
                restBetweenCycles = 45,
                rounds = 5,
                cycles = 1) {
        this.prepareTime = prepareTime;
        this.workoutTime = workoutTime;
        this.restTime = restTime;
        this.restBetweenCycles = restBetweenCycles;
        this.rounds = rounds;
        this.cycles = cycles;
    }

    update(settings) {
        this.prepareTime = settings.prepareTime ?? this.prepareTime;
        this.workoutTime = settings.workoutTime ?? this.workoutTime;
        this.restTime = settings.restTime ?? this.restTime;
        this.restBetweenCycles = settings.restBetweenCycles ?? this.restBetweenCycles;
        this.rounds = settings.rounds ?? this.rounds;
        this.cycles = settings.cycles ?? this.cycles;
    }

    validate(settings) {
        const isValid = (
            ((typeof settings.prepareTime === 'number' && settings.prepareTime >= 0) || settings.prepareTime == null) &&
            ((typeof settings.workoutTime === 'number' && settings.workoutTime > 0) || settings.workoutTime == null) &&
            ((typeof settings.restTime === 'number' && settings.restTime > 0) || settings.restTime == null) &&
            ((typeof settings.restBetweenCycles === 'number' && settings.restBetweenCycles > 0) || settings.restBetweenCycles == null) &&
            ((typeof settings.rounds === 'number' && settings.rounds > 0) || settings.rounds == null) &&
            ((typeof settings.cycles === 'number' && settings.cycles > 0) || settings.cycles == null)
        );

        if (!isValid) {
            console.error("Invalid settings:", settings);
        }

        return isValid;
    }


}

module.exports = TimerSettings;