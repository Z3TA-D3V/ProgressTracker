import { loadRemoteModule } from '@angular-architects/module-federation';
import { Injectable } from '@angular/core';

export interface LoadMFEResult {
    loadedModules: any[];
    failedModules: { module: LoadRemoteModuleOptions; reason: any }[];
}

export type LoadRemoteModuleOptions = {
    type: 'script' | 'module' | 'manifest';
    remoteEntry?: string;
    remoteName: string;
    exposedModule: string;
}

@Injectable({ providedIn: 'root' })
export class MFELoader {

    options: LoadRemoteModuleOptions[] = [];
    private loadedModules: any[] = [];
    private failedModules: { module: LoadRemoteModuleOptions; reason: any }[] = [];

    public setOptions(options: LoadRemoteModuleOptions[]) {
        this.options = options;
    }

    private MFEPromiseBuilder(): Array<Promise<any>> {
        const remoteModulesPromises: Array<Promise<any>> = this.options.map(option => {
            return loadRemoteModule(option.remoteName, option.exposedModule);
        })

        return remoteModulesPromises;
    }

    public loadMFEs = async (): Promise<LoadMFEResult> => {
        // Siempre resetar los módulos antes de cargar nuevos -> Singelton Service, si no, al reedirigir a otra ruta, se acumulan los módulos
        this.resetModules();

        const MFEs = await Promise.allSettled(this.MFEPromiseBuilder());

        MFEs.forEach((MFE, index) => {
            if (MFE.status === 'fulfilled') {
                this.loadedModules.push(MFE.value[toPascalCase(this.options[index].remoteName)]);
            } else {
                this.failedModules.push({
                    module: this.options[index],
                    reason: MFE.reason
                });
                console.error(`Error loading MFE: ${this.options[index].exposedModule}`, MFE.reason);
            }
        });

        return { loadedModules: this.loadedModules, failedModules: this.failedModules };
    }

    private resetModules(): void{
        this.loadedModules = [];
        this.failedModules = [];
    }
}

function toPascalCase(str: string): string {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

