import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import { MainGuest } from '../../models/guest';

import * as _ from 'lodash';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() guestList: MainGuest[];
  @Input() enableSecretCode: boolean;

  @Output() emitMainGuest: EventEmitter<MainGuest> = new EventEmitter<MainGuest>();


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

  onSubmit(guestForm: FormGroup) {
    let mainGuest: MainGuest = guestForm.value;
    this.emitMainGuest.emit(mainGuest);
  }

  /* Initializes the guest list */
  private initGuestList() {
    _.forEach(this.guestList, (guest) => {
      guest.firstName = guest.firstName.toLowerCase();
      guest.lastName = guest.lastName.toLowerCase();
      guest.code = guest.code.toLowerCase();
    });
  }

  /* Initializes the form */
  private initForm() {
    this.guestForm = this.fb.group({
      firstName: ['', Validators.compose([Validators.required, this.firstNameExists(this.guestList)]) ],
      lastName: ['', Validators.required ],
      code: ['', Validators.required ]
    }, { validator: this.validateLastNameAndCode(this.guestList, this.enableSecretCode) });
  }

   /* Custom validation to check if first name exists */
  private firstNameExists(fullGuestList: any[]) {
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
  private validateLastNameAndCode(fullGuestList: any[], enableSecretCode?: boolean) {
    return (group: FormGroup): {[key: string]: any} | null => {
      let firstNameValue = group.get('firstName').value.toLowerCase();
      let lastNameValue = group.get('lastName').value.toLowerCase();
      let codeValue = group.get('code').value.toLowerCase();
      let guest = _.find(fullGuestList, { firstName: firstNameValue });

      let error = null;

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
            // Clear code errors to focus on lastName
            group.get('code').setErrors(null);

            error = {'lastNameNotValid': lastNameValue};
            group.get('lastName').setErrors(error);
          }
          else if(codeValue !== guest.code) {
            error = {'codeNotValid': codeValue};
            group.get('code').setErrors(error);
          }
        }
      } else {
        // Clear errors on last name and code to focus on firstName
        if(lastNameValue) group.get('lastName').setErrors(null);
        if(codeValue)     group.get('code').setErrors(null);
      }
      return error;
    } 
  }
}
