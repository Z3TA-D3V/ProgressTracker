import { Component, computed, effect, inject, Signal } from '@angular/core';
import { DateCTX } from '../service/DateCTX';

@Component({
  selector: 'angular-component-tracky-date',
  imports: [],
  templateUrl: './angular-component-tracky-date.html',
  styleUrl: './angular-component-tracky-date.css'
})
export class AngularComponentTrackyDate {

  /*
  *  Inyectamos el contexto de la fecha y lo manipulamos desde aquí, al ser un servicio singleton se comparte entre componentes.
  *  Y al ser signals y computed, todo se actualiza automáticamente.
  */  

  dateCTX: DateCTX = inject(DateCTX);

  showNextButton: Signal<boolean> = computed(()=> this.dateCTX.currentDate() < this.dateCTX.todayDate);
  
  currentDateToString: Signal<string> = this.dateCTX.currentDateString;

  next(): void{
    this.dateCTX.currentDate.update(date => new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1));
  }

  previous(): void{
    this.dateCTX.currentDate.update(date => new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1));
  }

  resetToToday(): void{
    this.dateCTX.currentDate.set(this.dateCTX.todayDate);
  }
  
  getTodayDate(): Date{
    let todayDate = new Date();
    return new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());  
  }
  

}
