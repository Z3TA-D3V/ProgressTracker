import { Component } from '@angular/core';
// Standalones componentes del MFE Tracky Manager.
import { AngularComponentTrackyDate } from './components/angular-component-tracky-date/angular-component-tracky-date';
import { AngularComponentTrackyList } from './components/angular-component-tracky-list/angular-component-tracky-list';
import { AngularComponentTrackyAdd } from './components/angular-component-tracky-add/angular-component-tracky-add';

@Component({
  selector: 'angular-mfe-tracky-manager',
  imports: [AngularComponentTrackyDate, AngularComponentTrackyAdd, AngularComponentTrackyList],
  templateUrl: './angular-mfe-tracky-manager.html',
  styleUrl: './angular-mfe-tracky-manager.css'
})
export class AngularMfeTrackyManager {

}
