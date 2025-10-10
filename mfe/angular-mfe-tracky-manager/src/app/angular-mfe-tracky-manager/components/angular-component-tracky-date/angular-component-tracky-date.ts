import { AfterViewInit, Component, computed, effect, inject, OnDestroy, Signal } from '@angular/core';
import { DateCTX } from '@shared/date-mfe-ctx'; // Idealmente esto sería un paquete NPM compartido entre el host y el MFE
import flatpickr from 'flatpickr';
import { Spanish } from 'flatpickr/dist/l10n/es';
import { Instance } from 'flatpickr/dist/types/instance';

@Component({
  selector: 'angular-component-tracky-date',
  imports: [],
  templateUrl: './angular-component-tracky-date.html',
  styleUrl: './angular-component-tracky-date.css'
})
export class AngularComponentTrackyDate implements AfterViewInit, OnDestroy {


  /*
  *  Inyectamos el contexto de la fecha y lo manipulamos desde aquí, al ser un servicio singleton se comparte entre componentes.
  *  Y al ser signals y computed, todo se actualiza automáticamente.
  */  
  dateCTX: DateCTX = inject(DateCTX);
  private flatpickrInstance?: Instance = undefined;
  
  showNextButton: Signal<boolean> = computed(()=> this.dateCTX.currentDate() < this.dateCTX.todayDate);
  currentDateToStringEN: Signal<string> = this.dateCTX.currentDateStringEN;
  currentDateISOString: Signal<string> = this.dateCTX.currentDateISOString;

  // Every time date changes, update flatpickr date
  constructor(){
    effect(()=> {
      const currentDate = this.dateCTX.currentDate();
      if(this.flatpickrInstance){
        this.flatpickrInstance.setDate(currentDate, false); // false para evitar el evento onChange
      }
    })
  }

  ngAfterViewInit(): void {
    this.flatpickrInstance = this.initFlatpickr();
  }

  // Cleanup on destroy
  ngOnDestroy(): void {
    if (this.flatpickrInstance) {
      this.flatpickrInstance.destroy();
    }
  }

  private initFlatpickr(): Instance | undefined {
  const dateInput = document.getElementById('date-input') as HTMLInputElement;

  try {
    const flatpickrInstance = flatpickr(dateInput, {
      // Configuración mínima para testing
      dateFormat: 'Y-m-d',
      maxDate: 'today',
      allowInput: false,
      clickOpens: true,
      animate: true,
      position: "below center",      
      
      onChange: (selectedDates: Date[]) => {
        if (selectedDates.length > 0) {
          this.dateCTX.currentDate.set(selectedDates[0]);
        }
        console.log(this.dateCTX);
      },
      
      onReady: () => {
        
      },
      
      onOpen: () => {
        
      },
      
      onClose: () => {
        
      }
    });
    
    return flatpickrInstance;
  
  } catch (error) {
    return undefined;
  }
  }

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
