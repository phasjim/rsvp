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
  @Input() currentStep: RespondStep;
  @Input() partyMembers: Guest[];
  @Output() emitStep: EventEmitter<RespondStep> = new EventEmitter<RespondStep>();

  foods: string[] = ['chicken', 'fish', 'vegetarian'];
  
  constructor() { }

  ngOnInit() {
  }

  getEntreePlaceholderText(memberFirstName: string) {
    return memberFirstName + "'s entree";
  }

  getPartyMembersString() {
    if(this.partyMembers.length === 1) {
      return "1 member";
    } else {
      return this.partyMembers.length + " members";
    }
  }

  isEntreeSelectionDisplayed(member: Guest) {
    if(member.isAttending === true) return true;
    else return false;
  }

  isLastRow(index: number) {
    return (index + 1 === this.partyMembers.length);
  }

  onBackButtonClick(nextStep: RespondStep) {
    this.emitStep.emit(nextStep);
  }
}
