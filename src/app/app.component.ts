import { Component } from '@angular/core';

import { MainGuest } from '../models/guest';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  rsvpStep = RsvpStep;
  step: RsvpStep = RsvpStep.login;
  
  mainGuest: MainGuest;

  // TODO: Need to read this from somewhere
  guestList = [
    { firstName: 'Prita', lastName: 'Hasjim', code: '123', partyMembers: [
      { firstName: 'Prita', lastName: 'Hasjim' }
    ]}, 
    { firstName: 'Derek', lastName: 'Bloom', code: '123', partyMembers: [
      { firstName: 'DereK', lastName: 'Bloom' },
      { firstName: 'Brianna', lastName: 'B-C' }
    ]}
  ];

  constructor() { }

  ngOnInit() {
  }

  isCorrectStep(currentStep: RsvpStep) {
    return this.step === currentStep;
  }

  setMainGuest(mainGuest: MainGuest) {
    this.mainGuest = mainGuest;
    this.step = RsvpStep.rsvp;
  }
}

enum RsvpStep {
  login = 1,
  rsvp,
  complete
}
