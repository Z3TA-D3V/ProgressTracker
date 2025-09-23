import { computed, Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class DateCTX {

     // Empiezan sincronizadas en la fecha de hoy
    todayDate = this.getTodayDate();

    currentDate = signal(this.todayDate);
    currentDateString = computed(()=> this.currentDate().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' }).toUpperCase())


    getTodayDate(){
     let todayDate = new Date();
        return new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());  
    }
  

}