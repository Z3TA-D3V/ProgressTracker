import { Component, inject } from '@angular/core';
import RouterMfeCTX from "@shared/router-mfe-ctx"; // Idealmente esto sería un paquete NPM compartido entre el host y el MFE
@Component({
  selector: 'angular-mfe-hero',
  imports: [],
  templateUrl: './angular-mfe-hero.html',
  styleUrl: './angular-mfe-hero.css',
  standalone: true
})
export class AngularMfeHero {

  private RouterCTX = inject(RouterMfeCTX)

  onNavigate = () => {
    this.RouterCTX.navigateTo('/tracking');
  }

}
