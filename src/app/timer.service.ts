import { Injectable } from '@angular/core';
import { Exercise } from './exercise';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  exercises: Exercise[] = [
    {
      name: 'Abdominal',
      duration: 300,
      repetitions: 3,
      preparation: 15,
      rest: 20,
    },
  ];
  currentEx: number = 0;
  currentRep: number = 0;
  timeLeft: number = 0;
  phase: number = 0;

  restart() {
    this.currentEx = 0;
    this.currentRep = 0;
    this.phase = 0;
    this.timeLeft = this.getTimeOfCurrentPhase();
  }

  next() {
    const ex = this.exercises[this.currentEx];
    if (this.phase < 2) {
      this.phase = 1;
    } else {
      if (this.currentRep < ex.repetitions - 1) {
        this.currentRep = 0;
        this.phase = 0;
      } else {
        if (this.currentEx < this.exercises.length - 1) {
          this.currentEx++;
          this.currentRep = 0;
          this.phase = 0;
        } else {
          return;
        }
      }
    }

    this.timeLeft = this.getTimeOfCurrentPhase();
  }

  decrementTimeLeft() {
    if (this.timeLeft > 0) {
      this.timeLeft--;
    } else {
      this.next();
    }
  }
  private getTimeOfCurrentPhase() {
    const ex = this.exercises[this.currentEx];
    switch (this.phase) {
      case 0:
        return ex.preparation * 10;
      case 1:
        return ex.duration * 10;
      case 2:
        return ex.rest * 10;
    }
    return 0;
  }
}
