import { Component, EventEmitter, HostListener, inject, Output, signal } from '@angular/core';
import { Blendy, createBlendy } from 'blendy';
import { DateCTX } from '../service/DateCTX';
import { ExerciseService } from '../service/ExerciseService';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
@Component({
  selector: 'angular-component-tracky-add',
  imports: [ReactiveFormsModule],
  templateUrl: './angular-component-tracky-add.html',
  styleUrl: './angular-component-tracky-add.css'
})
export class AngularComponentTrackyAdd {

  dateCTX = inject(DateCTX);
  exerciseService = inject(ExerciseService)

  currentDateString = this.dateCTX.currentDateString;
  initialExercises = this.exerciseService.exercises;

  newExerciseChecked = signal(false);
  enableAddSerie = signal(false);

  series = signal<Array<{weight: number, reps: number, id: number}>>([]);
  openModal = signal(false);


  profileForm = new FormGroup({
    repsControl: new FormControl('0'),
    weightControl: new FormControl('0')
  })


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

  closeModal(): void{
    this.blendy.untoggle("addExercise", () => this.openModal.set(false));
    this.resetSignals();
  }

  showModal(): void{
    this.openModal.set(true);
    this.blendy.toggle("addExercise");
  }

  resetSignals(): void{
    this.series.set([]);
    this.newExerciseChecked.set(false);
    this.enableAddSerie.set(false);
    this.profileForm = new FormGroup({
      repsControl: new FormControl('0'),
      weightControl: new FormControl('0')
    })

  }

  updateCheck(): void{
    this.newExerciseChecked.set(!this.newExerciseChecked());
  }

  addSerie(): void {
    this.enableAddSerie.set(true);
  }

  saveSerie(): void {
    this.series.update(s => [...s, {weight: this.profileForm.value.weightControl as unknown as number, reps: this.profileForm.value.repsControl as unknown as number, id: this.series().length + 1}]);
  }
}
