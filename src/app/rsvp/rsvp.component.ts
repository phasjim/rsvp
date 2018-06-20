import { Component, OnInit, Input } from '@angular/core';

import { Guest } from '../../models/guest';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss']
})
export class RsvpComponent implements OnInit {
  @Input() partyMembers: Guest;

  constructor() { }

  ngOnInit() {
  }

  isEntreeSelectionDisplayed(member: Guest) {
    debugger;
    if(member.isAttending) return true;
    return false;
  }
}
