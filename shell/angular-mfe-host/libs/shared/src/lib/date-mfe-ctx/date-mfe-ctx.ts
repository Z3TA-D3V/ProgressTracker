import { computed, Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class DateCTX {

     // Empiezan sincronizadas en la fecha de hoy
    todayDate = new Date();

    currentDate = signal(this.todayDate);
    currentDateStringES = computed(()=> this.currentDate().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' }).toUpperCase())
    currentDateISOString = computed(()=> this.currentDate().toISOString().split('T')[0])
    currentDateStringEN = computed(()=> this.currentDate().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' }).toUpperCase())


}