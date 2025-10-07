import { Component, inject, signal } from '@angular/core';

import { LoadRemoteModuleOptions, MFELoader } from 'src/utils/MFELoader';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'home-view',
  imports: [NgComponentOutlet],
  templateUrl: './HomeView.html'
})
export class HomeView {

  public MFEBuilder: MFELoader = inject(MFELoader);
  public angularMfe = signal<any[]>([]);
  public failedModules = signal<{ module: LoadRemoteModuleOptions; reason: any }[]>([]);

  constructor() {
      this.MFEBuilder.setOptions(this.MFEOptions());
      this.MFEBuilder.loadMFEs().then((modules) => {
        this.angularMfe.set(modules.loadedModules);
        this.failedModules.set(modules.failedModules);
    });
  }

  private MFEOptions(): LoadRemoteModuleOptions[]{
    return [
      {
        type: 'manifest', // Se podría meter en el servicio
        remoteName: 'angular-mfe-nav',
        exposedModule: './Component' // Se podría meter en el servicio
      },
      {
        type: 'manifest',
        remoteName: 'angular-mfe-hero',
        exposedModule: './Component'
      }
    ]
  }

}
