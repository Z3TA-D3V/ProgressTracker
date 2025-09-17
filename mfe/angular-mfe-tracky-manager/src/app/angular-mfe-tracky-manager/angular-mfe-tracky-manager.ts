import { Component, computed, inject } from '@angular/core';
import HeroMfeCtx from '@shared/hero-mfe-ctx'; // Idealmente esto sería un paquete NPM compartido entre el host y el MFE

// Standalones componentes del MFE Tracky Manager.
import { AngularComponentTrackyDate } from '../angular-component-tracky-date/angular-component-tracky-date';
import { AngularComponentTrackyList } from '../angular-component-tracky-list/angular-component-tracky-list';
import { AngularComponentTrackyAdd } from '../angular-component-tracky-add/angular-component-tracky-add';

@Component({
  selector: 'angular-mfe-tracky-manager',
  imports: [AngularComponentTrackyDate, AngularComponentTrackyAdd, AngularComponentTrackyList],
  templateUrl: './angular-mfe-tracky-manager.html',
  styleUrl: './angular-mfe-tracky-manager.css'
})
export class AngularMfeTrackyManager {

  heroMfeCtx = inject(HeroMfeCtx);

  active = computed(() => !this.heroMfeCtx.active()); // La lógica de este MFE depende del estado del Hero MFE

}
