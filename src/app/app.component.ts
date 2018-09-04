import { Component } from '@angular/core';

import { Guest, MainGuest } from '../models/guest';

import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  respondStep = RespondStep;
  step: RespondStep = RespondStep.login;
  
  mainGuest: MainGuest;
  partyMembers: Guest[];

  // TODO: Need to read this from somewhere
  guestList = [
    { firstName: 'Prita', lastName: 'Hasjim', code: '123', partyMembers: [
      { firstName: 'Prita', lastName: 'Hasjim', isAttending: null, entree: null }
    ]}, 
    { firstName: 'Derek', lastName: 'Bloom', code: '123', partyMembers: [
      { firstName: 'Derek', lastName: 'Bloom', isAttending: null, entree: null },
      { firstName: 'Brianna', lastName: 'Blumenthal-Cohen', isAttending: null, entree: null }
    ]},
    { firstName: 'Kirk', lastName: 'Saechao', code: '123', partyMembers: [
      { firstName: 'Kirk', lastName: 'Saechao', isAttending: null, entree: null },
      { firstName: 'Sabrina', lastName: 'Saechao', isAttending: null, entree: null },
      { firstName: 'Alex', lastName: 'Saechao', isAttending: null, entree: null }
    ]}
  ];

  constructor() { }

  ngOnInit() {
  }

  isCorrectStep(currentStep: RespondStep) {
    return this.step === currentStep;
  }

  setMainGuest(mainGuest: MainGuest) {
    this.mainGuest = _.find(this.guestList, (g) => {
      // TODO: There needs to be a more eloquent way to convert everything toLowerCase()
      return (mainGuest.firstName.toLowerCase() === g.firstName) && (mainGuest.lastName.toLowerCase() === g.lastName);
    });
    console.log(this.mainGuest);
    this.partyMembers = this.mainGuest.partyMembers;

    this.step = RespondStep.respond;
  }

  setNextStep(nextStep: RespondStep) {
    this.step = nextStep;
  }
}

// TODO: Add this to it's own model
export enum RespondStep {
  login = 1,
  respond,
  note,
  complete
}
