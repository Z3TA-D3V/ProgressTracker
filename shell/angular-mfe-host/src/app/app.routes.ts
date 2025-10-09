import { inject } from '@angular/core/primitives/di';
import { Router, Routes } from '@angular/router';
import { HomeView } from 'src/views/HomeView/HomeView';
import { TrackingMenuView } from 'src/views/TrackingMenuView/TrackingMenuView';

export const routes: Routes = [
    {
       path: '',
       component: HomeView
    },
    {
        path: 'tracking',
        loadComponent: () => TrackingMenuView
    }

];
