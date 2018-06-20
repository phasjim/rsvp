import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import * as _ from 'lodash';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // TODO: This is not strongly typed
  @Input() guestList: any[];

  guestForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges() {
    if(this.guestList) this.initGuestList();
  }

  validate() {
    let index = _.findIndex(this.guestList, { firstName: 'Prita'});
  }

  /* Custom validation to check if the name exists */
  firstNameExists(fullGuestList: any[]) {
      return (control: FormControl): {[key: string]: any} | null => {
        let value = control.value.toLowerCase();
        let index = _.findIndex(fullGuestList, { firstName: value});
        debugger;
        if(index < 0) {
          return {'firstNameDoesNotExist': value};
        }
        return null;
      }
  }

  private initGuestList() {
    _.forEach(this.guestList, (guest) => {
      guest.firstName = guest.firstName.toLowerCase();
      guest.lastName = guest.lastName.toLowerCase();
      guest.code = guest.code.toLowerCase();
    });
    console.log('lowercase guest list');
    console.log(this.guestList);
  }

  private initForm() {
    this.guestForm = this.fb.group({
      firstName: ['', Validators.compose([Validators.required, this.firstNameExists(this.guestList)]) ],
      lastName: ['', Validators.required ],
      code: ['', Validators.required ]
    });
  }
}
