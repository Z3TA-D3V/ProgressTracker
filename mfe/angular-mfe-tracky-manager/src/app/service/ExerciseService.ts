import { Injectable, signal } from "@angular/core";

interface ExercisesSaved {
    name: string;
    id: number;
    series: Series[];
}

interface Exercise {
    name: string;
    id: number;
}
interface Series {
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

    public addExercise(name: string, series: Series[]): void {
        const newExercise = { name, id: this.nextId++};
        try{
            this.exercises.update(exs => [...exs, newExercise]);
            this.saveExercise(newExercise.id, series);
        }catch(e){
            console.error("Error adding new exercise: ", e);
        }
    }

    // Update the series of the selected exercise signal
    public saveExercise(id: number, series: Series[]): void{
        const exercise = this.exercises().find(ex => ex.id === id) || {name: "Ejercicio no encontrado", id: -1};
        try{
            this.exercisesSaved.update(exs => [...exs, {name: exercise.name as string, id: exercise.id, series}]);
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
}

