import { Routes } from '@angular/router';
import { App } from './app';
import { HomeView } from 'src/views/HomeView/HomeView';

export const routes: Routes = [
    {
       path: '',
       loadComponent: () => HomeView
    },

];
