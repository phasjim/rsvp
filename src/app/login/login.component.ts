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
  @Input() enableSecretCode: boolean;

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

  /* Custom validation to check if first name exists */
  firstNameExists(fullGuestList: any[]) {
      return (control: FormControl): {[key: string]: any} | null => {
        let firstNameValue = control.value.toLowerCase();
        let index = _.findIndex(fullGuestList, { firstName: firstNameValue});
        
        if(index < 0) {
          return {'firstNameDoesNotExist': firstNameValue};
        }
        return null;
      }
  }

  /* Custom validation to check if last name matches first name */
  validateLastNameAndCode(fullGuestList: any[], enableSecretCode?: boolean) {
    return (group: FormGroup): {[key: string]: any} | null => {
      let firstNameValue = group.get('firstName').value.toLowerCase();
      let lastNameValue = group.get('lastName').value.toLowerCase();
      let codeValue = group.get('code').value.toLowerCase();
      let guest = _.find(fullGuestList, { firstName: firstNameValue });

      let error = null;
      debugger;
      // Checks if the first name is valid
      if(group.get('firstName').valid) {
        if(lastNameValue && !codeValue) {
          if(lastNameValue !== guest.lastName) {
            error = {'lastNameNotValid': lastNameValue};
            group.get('lastName').setErrors(error);
          }
        }
        else if (codeValue) {
          if(lastNameValue !== guest.lastName) {
            // Clear code errors to focus on last name errors
            group.get('code').setErrors(null);

            error = {'lastNameNotValid': lastNameValue};
            group.get('lastName').setErrors(error);
          }
          else if(codeValue !== guest.code) {
            error = {'codeNotValid': codeValue};
            group.get('code').setErrors(error);
          }
        }
      }
      return error;
    } 
  }

  private initGuestList() {
    _.forEach(this.guestList, (guest) => {
      guest.firstName = guest.firstName.toLowerCase();
      guest.lastName = guest.lastName.toLowerCase();
      guest.code = guest.code.toLowerCase();
    });
  }

  private initForm() {
    this.guestForm = this.fb.group({
      firstName: ['', Validators.compose([Validators.required, this.firstNameExists(this.guestList)]) ],
      lastName: ['', Validators.required ],
      code: ['', Validators.required ]
    }, { validator: this.validateLastNameAndCode(this.guestList, this.enableSecretCode) });
  }
}
