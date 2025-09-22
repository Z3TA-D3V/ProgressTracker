import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { createSwapy, Swapy } from 'swapy';
import { ExerciseService } from '../service/ExerciseService';

@Component({
  selector: 'angular-component-tracky-list',
  imports: [],
  templateUrl: './angular-component-tracky-list.html',
  styleUrl: './angular-component-tracky-list.css'
})
export class AngularComponentTrackyList implements AfterViewInit {

  container: HTMLElement | null = null;
  swapy: Swapy = null as any;
  exerciseService: ExerciseService = inject(ExerciseService);

  // Can declare and use signals directly in the component because it doesnt depend on the DOM. No constructor needed.
  mockedExercisesSaved = signal(this.exerciseService.getMockedExercisesSaved());

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

  deleteExercise(id: number): void{
    
  }

  editExercise(id: number): void{
    // To be implemented
  }


}
