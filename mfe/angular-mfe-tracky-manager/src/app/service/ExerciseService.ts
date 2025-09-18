import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ExerciseService {

    exercises = signal<Array<{name: string, id: number}>>([]);

    nextId = 1;

    constructor() {
        this.exercises.set(this.getExercises());
    }

    // This has to come from a backend in a real app
    private getExercises(): Array<{name: string, id: number}> {
        return [
            { name: 'Pres de Banca', id: 0},
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

    public addExercise(name: string) {
        const newExercise = { name, id: this.nextId++ };
        this.exercises.update(exs => [...exs, newExercise]);
    }

    public eleteExercise(id: number) {
        this.exercises.update(exs => exs.filter(ex => ex.id !== id))
    }

}