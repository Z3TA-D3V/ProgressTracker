import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export default class RouterMfeCTX {

    private router = inject(Router);

    navigateTo = (path: string) => {
        this.router.navigate([path]);
    }

}
