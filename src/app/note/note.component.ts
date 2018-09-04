import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RespondStep } from '../app.component'

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  respondStep = RespondStep;
  @Input() currentStep: RespondStep;
  @Output() emitStep: EventEmitter<RespondStep> = new EventEmitter<RespondStep>();

  constructor() { }

  ngOnInit() {
  }

  onBackButtonClick(nextStep: RespondStep) {
    this.emitStep.emit(nextStep);
  } 
}
