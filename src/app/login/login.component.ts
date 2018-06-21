import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import { PrimaryPartyMember } from '../../models/guest';

import * as _ from 'lodash';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() guestList: PrimaryPartyMember[];
  @Input() enableSecretCode: boolean;

  @Output() emitPrimaryPartyMember: EventEmitter<PrimaryPartyMember> = new EventEmitter<PrimaryPartyMember>();

  guestForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges() {
  }

  onSubmit(guestForm: FormGroup) {
    let PrimaryPartyMember: PrimaryPartyMember = guestForm.value;
    this.emitPrimaryPartyMember.emit(PrimaryPartyMember);
  }

  /* Initializes the form */
  private initForm() {
    this.guestForm = this.fb.group({
      partyfirstname: ['', Validators.compose([Validators.required, this.firstnameExists(this.guestList)]) ],
      partylastname: ['', Validators.required ],
      code: ['', Validators.required ]
    }, { validator: this.validateLastnameAndCode(this.guestList, this.enableSecretCode) });
  }

   /* Custom validation to check if first name exists */
  private firstnameExists(fullGuestList: any[]) {
    return (control: FormControl): {[key: string]: any} | null => {
      let firstnameValue = control.value.toLowerCase();
      let index = _.findIndex(fullGuestList, { partyfirstname: firstnameValue});
      if(index < 0) {
        return {'firstnameDoesNotExist': firstnameValue};
      }
      return null;
    }
  }

  /* Custom validation to check if last name matches first name */
  private validateLastnameAndCode(fullGuestList: any[], enableSecretCode?: boolean) {
    return (group: FormGroup): {[key: string]: any} | null => {
      let firstnameValue = group.get('partyfirstname').value.toLowerCase();
      let lastnameValue = group.get('partylastname').value.toLowerCase();
      let codeValue = group.get('code').value.toLowerCase();
      let guest = _.find(fullGuestList, { partyfirstname: firstnameValue });

      let error = null;

      // Checks if the first name is valid
      if(group.get('partyfirstname').valid) {
        if(lastnameValue && !codeValue) {
          if(lastnameValue !== guest.partylastname) {
            error = {'lastnameNotValid': lastnameValue};
            group.get('partylastname').setErrors(error);
          }
        }
        else if (codeValue) {
          if(lastnameValue !== guest.partylastname) {
            // Clear code errors to focus on lastname
            group.get('code').setErrors(null);

            error = {'lastnameNotValid': lastnameValue};
            group.get('partylastname').setErrors(error);
          }
          else if(codeValue !== guest.code) {
            error = {'codeNotValid': codeValue};
            group.get('code').setErrors(error);
          }
        }
      } else {
        // Clear errors on last name and code to focus on firstname
        if(lastnameValue) group.get('partylastname').setErrors(null);
        if(codeValue)     group.get('code').setErrors(null);
      }
      return error;
    } 
  }
}
