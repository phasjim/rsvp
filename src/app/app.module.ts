import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

/* Flex Layout */
import { FlexLayoutModule } from '@angular/flex-layout';

/* Forms */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Angular Material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatRadioModule,
  MatInputModule
} from '@angular/material';

import { LoginComponent } from './login/login.component';
import { RsvpComponent } from './rsvp/rsvp.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RsvpComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    FlexLayoutModule,

    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatRadioModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
