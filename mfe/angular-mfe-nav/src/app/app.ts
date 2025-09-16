import { Component, signal, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularMfeNav } from './angular-mfe-nav/angular-mfe-nav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AngularMfeNav],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('You have now loaded the angular-mfe-nav federation module!');
}
