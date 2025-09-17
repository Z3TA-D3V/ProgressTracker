import { Component, EventEmitter, HostListener, inject, Output, signal } from '@angular/core';
import { Blendy, createBlendy } from 'blendy';
import { DateCTX } from '../service/DateCTX';
@Component({
  selector: 'angular-component-tracky-add',
  imports: [],
  templateUrl: './angular-component-tracky-add.html',
  styleUrl: './angular-component-tracky-add.css'
})
export class AngularComponentTrackyAdd {

  dateCTX = inject(DateCTX);
  currentDateString = this.dateCTX.currentDateString;

  blendy: Blendy = createBlendy({
    animation: 'dynamic' // or spring
  })

  @Output()
  public onClickedOutside = new EventEmitter<MouseEvent>();

  @HostListener('window:click', ['$event'])
  onClick(event: MouseEvent): void {
      const modal = document.getElementById("modalExercise");
      const clickedInside = modal?.contains(event.target as HTMLElement);
      if(clickedInside == undefined) return;
      if (!clickedInside) {
        this.closeModal();
      }
  }

  openModal = signal(false);

  closeModal(): void{
    this.blendy.untoggle("addExercise", () => this.openModal.set(false));
  }

  showModal(): void{
    this.openModal.set(true);
    this.blendy.toggle("addExercise");
  }
  
}
