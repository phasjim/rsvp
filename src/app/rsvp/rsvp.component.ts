import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { Guest } from '../../models/guest';

import * as _ from 'lodash';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss']
})
export class RsvpComponent implements OnInit {
  @Input() partyMembers: Guest[];

  partyForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    
  }

  ngOnChanges() {
    if(this.partyMembers) {
      let list = [];
      _.forEach(this.partyMembers, (guest: Guest) => {
        list.push(this.createGuest(guest));
      });
      this.partyForm = this.fb.group({
        partymemberslist: this.fb.array(list)
      });
      debugger;
    }
  }

  createGuest(guest: Guest): FormGroup {
    return this.fb.group({
      guestfirstname: guest.guestfirstname,
      guestlastname: guest.guestlastname,
      isattending: guest.isattending,
      entree: guest.entree
    });
  }

}
