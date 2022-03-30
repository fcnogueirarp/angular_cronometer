import { Component, OnInit, Input } from '@angular/core';
import { Exercise } from '../exercise';
import { TimerService } from '../timer.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})
export class TimerComponent implements OnInit {
  interval: any;

  constructor(public ts: TimerService) {}

  ngOnInit(): void {
    this.ts.restart();
  }

  ngOnDestroy() {
    this.pause();
  }

  restart() {
    this.ts.restart();
  }
  next() {
    this.ts.next();
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
        this.ts.decrementTimeLeft();
      }, 100);
    }
  }
  pause() {
    clearInterval(this.interval);
    this.interval = undefined;
  }
}
