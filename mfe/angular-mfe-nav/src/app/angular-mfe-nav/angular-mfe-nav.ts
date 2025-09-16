import { Component, signal } from '@angular/core';

@Component({
  selector: 'angular-mfe-nav',
  imports: [],
  templateUrl: './angular-mfe-nav.html',
  styleUrl: './angular-mfe-nav.css',
  standalone: true
})
export class AngularMfeNav {

  title = signal('Progress Tracker');

}
