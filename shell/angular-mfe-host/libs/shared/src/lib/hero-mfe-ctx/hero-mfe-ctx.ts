import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export default class HeroMfeCTX {

  active = signal(true);
  
  constructor() { 

  }
  


}
