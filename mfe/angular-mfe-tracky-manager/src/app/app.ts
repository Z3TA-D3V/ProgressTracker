import { Component, signal } from '@angular/core';
import { AngularMfeTrackyManager } from './angular-mfe-tracky-manager/angular-mfe-tracky-manager';

@Component({
  selector: 'app-root',
  imports: [ AngularMfeTrackyManager],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-mfe-tracky-manager');
  active = signal(false); 
}
