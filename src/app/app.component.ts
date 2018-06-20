import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // TODO: need to define a class
  guestList = [
    { firstName: 'Prita', lastName: 'Hasjim', code: '123'}, 
    { firstName: 'Bima', lastName: 'Hasjim', code: '123'}, 
    { firstName: 'Bahari', lastName: 'Hasjim', code: '123'}, 
  ];

  constructor() { }

  ngOnInit() {
  }
}
