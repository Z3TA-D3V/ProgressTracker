import {  AfterViewInit, Component, effect, inject, signal, WritableSignal } from '@angular/core';
import { createSwapy, Swapy } from 'swapy';
import { ExerciseService, ExercisesSaved } from '@shared/exercise-mfe-ctx'
import { AngularComponentTrackyAdd } from '../angular-component-tracky-add/angular-component-tracky-add';

@Component({
  selector: 'angular-component-tracky-list',
  imports: [AngularComponentTrackyAdd],
  templateUrl: './angular-component-tracky-list.html',
  styleUrl: './angular-component-tracky-list.css'
})
export class AngularComponentTrackyList {

  container: HTMLElement | null = null;
  swapy: Swapy = null as any;
  exerciseService: ExerciseService = inject(ExerciseService);

  // Can declare and use signals directly in the component because it doesnt depend on the DOM. No constructor needed.
  
  //mockedExercisesSaved = signal(this.exerciseService.getMockedExercisesSaved());
  exercisesSaved = this.exerciseService.exercisesSaved;
  showEditModal = signal(false);
  exerciseToEdit: WritableSignal<ExercisesSaved> = signal({id: 0, name: '', reps: 0, weight: 0, date: new Date(), series:[]});

  constructor() {
    effect(() => {
      const list = this.exercisesSaved();
      setTimeout(() => {
        this.buildSwapy(list);
      });
    });
  }

  buildSwapy(exercises?: ExercisesSaved[]): void{
    if(exercises && exercises.length){
      if (this.swapy && exercises.length > 0) {
        this.swapy.destroy();
      } 
      this.container = document.querySelector('.container');
      this.swapy = createSwapy(this.container as HTMLElement, {
        animation: 'dynamic'
      });
    }
  }

  deleteSavedExercise(id: number): void{
    try{
        this.exerciseService.deleteSavedExercise(id);
    }catch(e){
        console.error("Error deleting saved exercise: ", e);
    }
  }

  editExercise(exercise: ExercisesSaved): void{
    if(!exercise) return;
    this.showEditModal.set(true);
    this.exerciseToEdit.set(exercise);
  }

  excerciseSavedEvent(exercise: WritableSignal<ExercisesSaved>): void{
    this.exerciseService.editSavedExercise(exercise());
    this.showEditModal.set(false);
  }

  handleClose(event: boolean): void{
    this.showEditModal.set(!event);
  }  

}
