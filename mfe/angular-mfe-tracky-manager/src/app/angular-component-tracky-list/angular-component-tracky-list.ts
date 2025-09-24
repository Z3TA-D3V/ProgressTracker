import { AfterViewInit, Component, inject, signal, WritableSignal } from '@angular/core';
import { createSwapy, Swapy } from 'swapy';
import { ExerciseService, ExercisesSaved } from '@shared/exercise-mfe-ctx'
import { AngularComponentTrackyAdd } from '../angular-component-tracky-add/angular-component-tracky-add';

@Component({
  selector: 'angular-component-tracky-list',
  imports: [AngularComponentTrackyAdd],
  templateUrl: './angular-component-tracky-list.html',
  styleUrl: './angular-component-tracky-list.css'
})
export class AngularComponentTrackyList implements AfterViewInit {

  container: HTMLElement | null = null;
  swapy: Swapy = null as any;
  exerciseService: ExerciseService = inject(ExerciseService);

  // Can declare and use signals directly in the component because it doesnt depend on the DOM. No constructor needed.
  
  //mockedExercisesSaved = signal(this.exerciseService.getMockedExercisesSaved());
  exercisesSaved = this.exerciseService.exercisesSaved;
  showEditModal = signal(false);
  exerciseToEdit: WritableSignal<ExercisesSaved> = signal({id: 0, name: '', reps: 0, weight: 0, date: new Date(), series:[]});

  // Initialize Swapy after the view is initialized, securiring that the DOM is ready
  ngAfterViewInit(){
    this.buildSwapy();
  }

  buildSwapy(){
    this.container = document.querySelector('.container');
    this.swapy = createSwapy(this.container as HTMLElement, {
      animation: 'spring'
    });
    this.swapy.enable(true)
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
