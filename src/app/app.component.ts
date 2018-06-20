import { Component } from '@angular/core';

import { Guest, PrimaryPartyMember } from '../models/guest';
import { GoogleDriveService } from '../services/google-drive/google-drive.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ GoogleDriveService ]
})
export class AppComponent {
  rsvpStep = RsvpStep;
  step: RsvpStep = RsvpStep.login;
  
  // guestList: Guest[];
  primaryPartyMember: PrimaryPartyMember;
  partyMembers: Guest[];

  guestList: Guest[];
  primaryPartyMemberList: PrimaryPartyMember[];
  dataId: string;

  constructor(googleDriveService: GoogleDriveService) {
    this.dataId = '11wKfDNr0ylaWpbT9eAQnTtOabvVESdLv7-2trVh1s-k';
    googleDriveService.load(this.dataId)
      .then((data) => {
        // Sets guest list
        this.guestList = data;

        // Creates a list of all the "main guests"
        this.initPrimaryPartyMemberList();
      }, (error) => {
        console.log(error);
      })
  }

  ngOnInit() {
  }

  isCorrectStep(currentStep: RsvpStep) {
    return this.step === currentStep;
  }

  setPrimaryPartyMember(primaryPartyMember: PrimaryPartyMember) {
    this.primaryPartyMember = _.find(this.guestList, (g) => {
      // TODO: There needs to be a more eloquent way to convert everything toLowerCase()
      return (primaryPartyMember.partyfirstname.toLowerCase() === g.firstname) && (primaryPartyMember.partylastname.toLowerCase() === g.lastname);
    });
    console.log(this.primaryPartyMember);
    this.partyMembers = this.primaryPartyMember.partymembers;

    this.step = RsvpStep.rsvp;
  }

  /* Creates a list of all of the "main guests" */
  private initPrimaryPartyMemberList() {
    this.primaryPartyMemberList = _.filter(this.guestList, (g) => {
      return (g.guestfirstname === g.partyfirstname) && (g.guestlastname === g.partylastname);
    });

    // Iterate through guestList again and populate the partymembers array
    _.forEach(this.guestList, (g) => {
      // Find the primary party member for each guest in primaryPartyMemberList
      let primaryPartyMember = _.find(this.primaryPartyMemberList, (pg) => {
        return (pg.guestfirstname === g.partyfirstname) && (pg.guestlastname === g.partylastname);
      });

      if(!primaryPartyMember.partymembers) {
        primaryPartyMember.partymembers = [];
      }

      primaryPartyMember.partymembers.push(g);
    });
  }

}

enum RsvpStep {
  login = 1,
  rsvp,
  complete
}
