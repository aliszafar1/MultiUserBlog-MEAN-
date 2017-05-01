import { Component, OnChanges } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppService } from './services/app.services';
import { Observer } from 'rxjs/observer';
import * as Rx from 'rxjs';
import { Subject } from 'rxjs/Rx';
declare var require;
@Component({
  selector: 'my-app',
  template: require('./app.component.html'),
  styles: [require('./app.component.css')]
})
export class AppComponent {
  uExist: any;
  constructor(private as: AppService) {
    this.uExist = this.as.checkCookie();
  };

  onSignout() {
    event.preventDefault();
    console.log('Signout');
    localStorage.removeItem("token");
    location.reload();
      }
}
