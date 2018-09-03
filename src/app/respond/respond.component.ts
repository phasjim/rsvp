import { Component, OnInit, Input } from '@angular/core';

import { Guest } from '../../models/guest';

@Component({
  selector: 'app-rsvp',
  templateUrl: './respond.component.html',
  styleUrls: ['./respond.component.scss']
})
export class RespondComponent implements OnInit {
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
