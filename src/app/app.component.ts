import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import {  initialize } from './services/bucket';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    initialize({ identity: environment.token });

  }
}
