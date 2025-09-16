import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularMfeHero } from './angular-mfe-hero/angular-mfe-hero';

@Component({
  selector: 'app-root',
  imports: [AngularMfeHero],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-mfe-hero');
}
