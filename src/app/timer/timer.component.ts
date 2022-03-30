import { Component, OnInit, Input } from '@angular/core';
import { Exercise } from '../exercise';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})
export class TimerComponent implements OnInit {
  @Input() exercises: Exercise[] = [];
  currentEx: number = 0;
  currentRep: number = 0;
  timeLeft: number = 0;
  phase: number = 0;
  interval: any;

  constructor() {}

  ngOnInit(): void {
    this.restart();
  }
  restart() {
    this.currentEx = 0;
    this.currentRep = 0;
    this.phase = 0;
    const ex = this.exercises[this.currentEx];
    this.timeLeft = this.getTimeOfCurrentPhase();
  }
  formatPhase(phase: number) {
    switch (phase) {
      case 0:
        return 'Preparação';
      case 1:
        return 'Exercício';
      case 2:
        return 'Descanso';
    }
    return 'Erro01';
  }



  start() {
    if (!this.interval) {
      this.interval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          this.next();
        }
      }, 100);
    }
  }
  pause() {
    clearInterval(this.interval);
    this.interval = undefined;
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
  getTimeOfCurrentPhase() {
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
