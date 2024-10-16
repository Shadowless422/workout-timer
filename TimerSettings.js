class TimerSettings {
    constructor(workoutTime = 45, restTime = 15, rounds = 3, cycles = 1) {
        this.workoutTime = workoutTime;
        this.restTime = restTime;
        this.rounds = rounds;
        this.cycles = cycles;
    }

    update(settings) {
        this.workoutTime = settings.workoutTime || this.workoutTime;
        this.restTime = settings.restTime || this.restTime;
        this.rounds = settings.rounds || this.rounds;
        this.cycles = settings.cycles || this.cycles;
    }

    validate() {
        return this.workoutTime > 0 && this.restTime > 0 && this.rounds > 0 && this.cycles > 0;
    }
}

module.exports = TimerSettings;