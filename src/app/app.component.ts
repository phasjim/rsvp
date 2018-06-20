import { Component } from '@angular/core';

import { Guest, MainGuest } from '../models/guest';

import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  rsvpStep = RsvpStep;
  step: RsvpStep = RsvpStep.login;
  
  mainGuest: MainGuest;
  partyMembers: Guest[];

  // TODO: Need to read this from somewhere
  guestList = [
    { firstName: 'Prita', lastName: 'Hasjim', code: '123', partyMembers: [
      { firstName: 'Prita', lastName: 'Hasjim', isAttending: false, entree: '' }
    ]}, 
    { firstName: 'Derek', lastName: 'Bloom', code: '123', partyMembers: [
      { firstName: 'Derek', lastName: 'Bloom', isAttending: false, entree: '' },
      { firstName: 'Brianna', lastName: 'B-C', isAttending: false, entree: '' }
    ]}
  ];

  constructor() { }

  ngOnInit() {
  }

  isCorrectStep(currentStep: RsvpStep) {
    return this.step === currentStep;
  }

  setMainGuest(mainGuest: MainGuest) {
    this.mainGuest = _.find(this.guestList, (g) => {
      // TODO: There needs to be a more eloquent way to convert everything toLowerCase()
      return (mainGuest.firstName.toLowerCase() === g.firstName) && (mainGuest.lastName.toLowerCase() === g.lastName);
    });
    console.log(this.mainGuest);
    this.partyMembers = this.mainGuest.partyMembers;

    this.step = RsvpStep.rsvp;
  }

}

enum RsvpStep {
  login = 1,
  rsvp,
  complete
}
