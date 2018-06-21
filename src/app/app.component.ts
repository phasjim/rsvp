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

  guestList: Guest[] = [];
  primaryPartyMemberList: PrimaryPartyMember[] = [];
  dataId: string;

  constructor(googleDriveService: GoogleDriveService) {
    this.dataId = '11wKfDNr0ylaWpbT9eAQnTtOabvVESdLv7-2trVh1s-k';
    googleDriveService.load(this.dataId)
      .then((data) => {
        // sets guest list
        this.initGuestList(data);
        // sets list of primary party members
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

  /* Turn every property in guest list lowercase */
  private initGuestList(data: Guest[]) {
    _.forEach(data, (d) => {
      let newGuest = new Guest();
      newGuest.partyfirstname = d.partyfirstname.toLowerCase();
      newGuest.partylastname = d.partylastname.toLowerCase();
      newGuest.guestfirstname = d.guestfirstname.toLowerCase();
      newGuest.guestlastname = d.guestlastname.toLowerCase();
      newGuest.code = d.code.toLowerCase();

      this.guestList.push(newGuest);
    });
  }

  /* Creates a list of all of the "main guests" */
  private initPrimaryPartyMemberList() {
    // Iterate through guestList again and populate the partymembers array
    _.forEach(this.guestList, (g) => {
      // If primary party member has already been added, add the guest to its partymembers
      let index = _.findIndex(this.primaryPartyMemberList, { partyfirstname: g.partyfirstname, partylastname: g.partylastname });
      if(index >= 0) {
        this.primaryPartyMemberList[index].partymembers.push(g);
      } else {
        let newPrimaryMember = new PrimaryPartyMember(g);
        newPrimaryMember.partymembers.push(g);

        this.primaryPartyMemberList.push(newPrimaryMember);
      }
    });
  }

}

enum RsvpStep {
  login = 1,
  rsvp,
  complete
}
