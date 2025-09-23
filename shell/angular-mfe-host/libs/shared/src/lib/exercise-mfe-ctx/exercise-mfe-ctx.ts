import { Injectable, signal } from "@angular/core";

export interface ExercisesSaved {
    name: string;
    id: number;
    series: Series[];
    date: Date;
}

export interface Exercise {
    name: string;
    id: number;
}
export interface Series {
    weight: number;
    reps: number;
    id: number;
}

@Injectable({ providedIn: 'root' })
export class ExerciseService {

    exercises = signal<Array<Exercise>>([]);

    exercisesSaved = signal<Array<ExercisesSaved>>([]);

    nextId = this.getExercises().length;

    constructor() {
        this.exercises.set(this.getExercises());
    }

    // This has to come from a backend in a real app
    private getExercises(): Exercise[] {
        return [
            { name: 'Pres de Banca', id: 0 },
            { name: 'Pres militar', id: 1 },
            { name: 'Dominadas', id: 2 },
            { name: 'Sentadilla', id: 3 },
            { name: 'Peso muerto', id: 4 },
            { name: 'Remo con barra', id: 5 },
            { name: 'Curl biceps', id: 6 },
            { name: 'Extensiones triceps', id: 7 },
            { name: 'Elevaciones laterales', id: 8 },
            { name: 'Abdominales', id: 9 },
        ];
    }

    public addExercise(name: string, series: Series[], date: Date): void {
        const newExercise = { name, id: this.nextId++};
        try{
            this.exercises.update(exs => [...exs, newExercise]);
            this.saveExercise(newExercise.id, series, date);
        }catch(e){
            console.error("Error adding new exercise: ", e);
        }
    }

    // Update the series of the selected exercise signal
    public saveExercise(id: number, series: Series[], date: Date): void{
        const exercise = this.exercises().find(ex => ex.id === id) || {name: "Ejercicio no encontrado", id: -1};
        try{
            this.exercisesSaved.update(exs => [...exs, {name: exercise.name as string, id: exercise.id, series, date}]);
        }catch(e){
            console.error("Error updating exercise series: ", e);
        }
    }

    public deleteExercise(id: number): void {
        try{
            this.exercises.update(exs => exs.filter(ex => ex.id !== id))
        }catch(e){
            console.error("Error deleting exercise: ", e);
        }
    }

    public deleteSavedExercise(id: number): void {
        this.exercisesSaved.update(exs => exs.filter(ex=> ex.id !== id));
    }

    public editSavedExercise(exercise: ExercisesSaved): void {
        this.exercisesSaved.update(exs => exs.map(ex => ex.id === exercise.id ? exercise : ex));
    }

    public getMockedExercisesSaved(): ExercisesSaved[] {
        return [
            { name: 'Pres de Banca', id: 0, series: [  { weight: 60, reps: 10, id: 0 }, { weight: 70, reps: 8, id: 1 }, { weight: 80, reps: 6, id: 2 } ], date: new Date() },
            { name: 'Pres militar', id: 1, series: [  { weight: 40, reps: 10, id: 0 }, { weight: 50, reps: 8, id: 1 }, { weight: 60, reps: 6, id: 2 } ], date: new Date() },
            { name: 'Dominadas', id: 2, series: [  { weight: 0, reps: 10, id: 0 }, { weight: 0, reps: 8, id: 1 }, { weight: 0, reps: 6, id: 2 } ], date: new Date() },
            { name: 'Sentadilla', id: 3, series: [  { weight: 80, reps: 10, id: 0 }, { weight: 100, reps: 8, id: 1 }, { weight: 120, reps: 6, id: 2 } ], date: new Date() },
            { name: 'Peso muerto', id: 4, series: [  { weight: 100, reps: 10, id: 0 }, { weight: 120, reps: 8, id: 1 }, { weight: 140, reps: 6, id: 2 } ], date: new Date() },
        ];
    }
}

