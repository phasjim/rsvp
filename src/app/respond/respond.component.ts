import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { RespondStep } from '../app.component'
import { Guest } from '../../models/guest';

@Component({
  selector: 'app-rsvp',
  templateUrl: './respond.component.html',
  styleUrls: ['./respond.component.scss']
})
export class RespondComponent implements OnInit {
  respondStep = RespondStep;

  @Input() partyMembers: Guest;
  @Input() currentStep: RespondStep;
  
  @Output() emitStep: EventEmitter<RespondStep> = new EventEmitter<RespondStep>();

  constructor() { }

  ngOnInit() {
  }

  isEntreeSelectionDisplayed(member: Guest) {
    debugger;
    if(member.isAttending) return true;
    return false;
  }

  onBackButtonClick(nextStep: RespondStep) {
    this.emitStep.emit(nextStep);
  }
}
