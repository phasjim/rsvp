import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import * as _ from 'lodash';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // TODO: This is not strongly typed
  @Input() guests: any[];

  guestForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.initForm();
  }

  ngOnInit() {
  }

  validate() {
    debugger;
    let index = _.findIndex(this.guests, { firstName: 'Prita'});
  }

  private initForm() {
    this.guestForm = this.fb.group({
      firstName: ['', Validators.required ],
      lastName: ['', Validators.required ],
      code: ['', Validators.required ]
    });
    debugger;
  }
}
