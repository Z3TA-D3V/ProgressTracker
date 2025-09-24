import { Component, computed, EventEmitter, HostListener, inject, Input, Output, signal, OnInit, Signal, WritableSignal } from '@angular/core';
import { Blendy, createBlendy } from 'blendy';
import { DateCTX } from '@shared/date-mfe-ctx'; // Idealmente esto sería un paquete NPM compartido entre el host y el MFE
import { ExerciseService, ExercisesSaved, Series } from '@shared/exercise-mfe-ctx'; // Idealmente esto sería un paquete NPM compartido entre el host y el MFE
import {Form, FormControl, FormGroup, ReactiveFormsModule,} from '@angular/forms';
@Component({
  selector: 'angular-component-tracky-add',
  imports: [ReactiveFormsModule],
  templateUrl: './angular-component-tracky-add.html',
  styleUrl: './angular-component-tracky-add.css'
})
export class AngularComponentTrackyAdd implements OnInit {

  @Input() public exerciseToEdit!: WritableSignal<ExercisesSaved>;
  
  @Output() public excerciseSavedEvent = new EventEmitter<WritableSignal<ExercisesSaved>>();
  @Output() public onCloseModal = new EventEmitter<boolean>();

  @Output() public onClickedOutside = new EventEmitter<MouseEvent>();

  dateCTX = inject(DateCTX);
  exerciseService = inject(ExerciseService)

  currentDateString = this.dateCTX.currentDateString;
  initialExercises = this.exerciseService.exercises;

  newExerciseChecked = signal(false);
  enableAddSerie = signal(false);

  series = signal<Array<Series>>([]);
  openModal = signal(false);
  openModalEdit = signal(false);

  profileForm!: FormGroup;

  blendy: Blendy = createBlendy({
    animation: 'dynamic' // or spring
  });

  ngOnInit(): void { 
    // If a SIGNAL is received as Input from FATHER, check if it's defined and initialize the form and accordingly
    if(typeof this.exerciseToEdit === 'function') {
      if(this.exerciseToEdit()) {
        this.profileForm = new FormGroup({
          repsControl: new FormControl('0'),
          weightControl: new FormControl('0'),
          exerciseSelected: new FormControl(this.exerciseToEdit().id)
        })
        this.showModal('edit');
      }
    }else{
        this.profileForm = new FormGroup({
          repsControl: new FormControl('0'),
          weightControl: new FormControl('0'),
          exerciseSelected: new FormControl(this.initialExercises()[0].id),
          exerciseCustomSelected: new FormControl('')
        })
    }
  }

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
    this.blendy.untoggle("addExercise", () => {
      this.resetSignals();
      this.openModalEdit() ? this.onCloseModal.emit(true) : this.openModal.set(false)
    });
  }

  showModal(type?: string): void{
    if(type === 'edit'){
      this.openModalEdit.set(true);
    }else{
      this.openModal.set(true);
    }
    this.blendy.toggle("addExercise");
  }

  resetSignals(): void{
    this.series.set([]);
    this.newExerciseChecked.set(false);
    this.enableAddSerie.set(false);
    this.profileForm = new FormGroup({
      repsControl: new FormControl('0'),
      weightControl: new FormControl('0'),
      exerciseSelected: new FormControl(this.initialExercises()[0].id),
      exerciseCustomSelected: new FormControl('')
    })
  }

  updateCheck(): void{
    this.newExerciseChecked.set(!this.newExerciseChecked());

    if(this.newExerciseChecked()){
      this.profileForm?.get('exerciseSelected')?.disable();
    }else{
      this.profileForm?.get('exerciseSelected')?.enable();
    }
  }

  addSerieEnabler(): void {
    this.enableAddSerie.set(true);
  }

  saveSerie(): void {
    if(this.openModalEdit() && this.exerciseToEdit()){
      this.exerciseToEdit.update(e => ({...e, series: [...e.series, {weight: Number(this.profileForm?.value.weightControl), reps: Number(this.profileForm?.value.repsControl), id: this.exerciseToEdit().series.length + 1}]}));
    }else{
      this.series.update(s => [...s, {weight: Number(this.profileForm?.value.weightControl), reps: Number(this.profileForm?.value.repsControl), id: this.series().length + 1}]);
    }
  }

  saveEjercicio(): void {
    if(this.exerciseToEdit){
      this.excerciseSavedEvent.emit(this.exerciseToEdit);
    }else{
      const exerciseCustomSelected = this.profileForm?.get('exerciseCustomSelected')?.value as string;

      if(exerciseCustomSelected != ''){
        this.exerciseService.addExercise(exerciseCustomSelected, this.series(), this.dateCTX.currentDate());
      }else{
        const exerciseId = Number(this.profileForm?.get('exerciseSelected')?.value);
        this.exerciseService.saveExercise(exerciseId, this.series(), this.dateCTX.currentDate());
      }
      this.closeModal();
      console.log("Ejercicios guardados con sus series", this.exerciseService.exercisesSaved());
      console.log("Ejercicios totales disponibles", this.exerciseService.exercises());
    }
  }
}
