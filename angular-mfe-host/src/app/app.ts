import { Component, effect, signal } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [NgComponentOutlet],
  templateUrl: './app.html'
})
export class App {

  public angularMfe = signal<any[]>([]);

  async loadRemoteModules(){
    const remoteModules: Array<Promise<any>> = [
      loadRemoteModule({
        type: 'manifest',
        remoteName: 'angular-mfe-nav',
        exposedModule: './Component'
      }),
      loadRemoteModule({
        type: 'manifest',
        remoteName: 'angular-mfe-hero',
        exposedModule: './Component'
      })
    ]
    const response = await Promise.all(remoteModules);
    // TODO: Gestionar errores ya que la aplicación peta en caso de que falle alguna carga. Nos obliga a levantar todas las MFEs
    this.angularMfe.update(values => [...values, response[0].AngularMfeNav, response[1].AngularMfeHero]);
  }

  constructor() {
    effect(() => {
      this.loadRemoteModules()
    });
  }

}
