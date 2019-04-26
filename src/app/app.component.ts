import { Component } from '@angular/core';
import {AuthService} from './shared/authentication.service';

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html',
  // [book]="book" -> property-binding, damit Buch mitgegeben wird, book: Book; um das Buch zu definieren
  /*template: `
      <bs-book-list *ngIf="listOn" (showDetailsEvent)="showDetails($event)"></bs-book-list>
      <bs-book-details *ngIf="detailsOn" (showListEvent)="showList()" [book]="book"></bs-book-details>`,*/
  styles: []
})
export class AppComponent {
  constructor (private authService : AuthService) { }

  isLoggedIn() {
      return this.authService.isLoggedIn();
  }

  isAdmin(key) {
      return (this.authService.isAdmin(key));
  }

  getLoginLabel() {
      if (this.isLoggedIn()) {
          return "Logout"
      } else {
          return "Login"
      }
  }
}
