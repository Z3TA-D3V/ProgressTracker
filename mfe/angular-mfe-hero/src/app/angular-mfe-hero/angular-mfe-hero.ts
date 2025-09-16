import { Component, inject } from '@angular/core';
import HeroMfeCtx from "@shared/hero-mfe-ctx"; // Idealmente esto sería un paquete NPM compartido entre el host y el MFE
@Component({
  selector: 'angular-mfe-hero',
  imports: [],
  templateUrl: './angular-mfe-hero.html',
  styleUrl: './angular-mfe-hero.css',
  standalone: true
})
export class AngularMfeHero {

  heroMfeCTX = inject(HeroMfeCtx);

  onStart() {
    this.heroMfeCTX.active.set(false); // Señal que indica que el HERO MFE ya no está activo
  }

}
