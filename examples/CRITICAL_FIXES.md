# Critical Code Fixes - Examples

## 1. Fix: Async Operations in Effects ❌➡️✅

### Current Problematic Code:
```typescript
// ❌ CRITICAL ANTI-PATTERN
constructor() {
  effect(() => {
    this.loadRemoteModules() // Async function in effect - DANGEROUS!
  });
}
```

### Fixed Code Options:

#### Option A: Use ngOnInit (Recommended)
```typescript
// ✅ GOOD: Move to lifecycle hook
ngOnInit() {
  this.loadRemoteModules();
}

constructor() {
  // Effects should only contain synchronous, reactive logic
}
```

#### Option B: Trigger-based approach with signals
```typescript
// ✅ GOOD: Use a trigger signal
private loadTrigger = signal(true);
private loadingState = signal<'idle' | 'loading' | 'success' | 'error'>('idle');

constructor() {
  // Effect only handles synchronous reactive logic
  effect(() => {
    if (this.loadTrigger() && this.loadingState() === 'idle') {
      this.loadingState.set('loading');
      // Queue the async operation
      setTimeout(() => this.loadRemoteModules(), 0);
    }
  });
}

async loadRemoteModules() {
  try {
    // ... async loading logic
    this.loadingState.set('success');
  } catch (error) {
    this.loadingState.set('error');
  }
}
```

## 2. Fix: Error Handling for Micro-Frontend Loading ❌➡️✅

### Current Problematic Code:
```typescript
// ❌ NO ERROR HANDLING - App crashes if any MFE fails
async loadRemoteModules(){
  const remoteModules: Array<Promise<any>> = [
    loadRemoteModule({...}),
    loadRemoteModule({...}),
    loadRemoteModule({...})
  ]
  const response = await Promise.all(remoteModules); // Crashes on any failure
  this.angularMfe.update(values => [...values, 
    response[0].AngularMfeNav,  // Hard-coded indices
    response[1].AngularMfeHero, 
    response[2].AngularMfeTrackyManager
  ]);
}
```

### Fixed Code:
```typescript
// ✅ ROBUST ERROR HANDLING
async loadRemoteModules() {
  const moduleConfigs = [
    { name: 'nav', remoteName: 'angular-mfe-nav', component: 'AngularMfeNav' },
    { name: 'hero', remoteName: 'angular-mfe-hero', component: 'AngularMfeHero' },
    { name: 'tracky', remoteName: 'angular-mfe-tracky-manager', component: 'AngularMfeTrackyManager' }
  ];

  const modulePromises = moduleConfigs.map(async (config) => {
    try {
      const module = await loadRemoteModule({
        type: 'manifest',
        remoteName: config.remoteName,
        exposedModule: './Component'
      });
      return {
        name: config.name,
        component: module[config.component],
        status: 'success' as const,
        error: null
      };
    } catch (error) {
      console.warn(`Failed to load MFE: ${config.name}`, error);
      return {
        name: config.name,
        component: null,
        status: 'error' as const,
        error: error as Error
      };
    }
  });

  try {
    const results = await Promise.all(modulePromises);
    
    // Only add successfully loaded modules
    const successfulComponents = results
      .filter(result => result.status === 'success' && result.component)
      .map(result => result.component);

    this.angularMfe.update(values => [...values, ...successfulComponents]);

    // Log failed modules for monitoring
    const failedModules = results.filter(result => result.status === 'error');
    if (failedModules.length > 0) {
      console.error('Some micro-frontends failed to load:', failedModules);
      // Could emit an event or show a user notification
    }

  } catch (error) {
    console.error('Critical error loading micro-frontends:', error);
    // Fallback behavior - maybe show an error message to user
    this.handleCriticalLoadingError(error as Error);
  }
}

private handleCriticalLoadingError(error: Error) {
  // Implement fallback UI or retry logic
  console.error('All micro-frontends failed to load. Showing fallback UI.');
  // Could set an error signal for the template to display error state
}
```

## 3. Fix: Type Safety ❌➡️✅

### Current Problematic Code:
```typescript
// ❌ POOR TYPE SAFETY
public angularMfe = signal<any[]>([]);
const remoteModules: Array<Promise<any>> = [];
```

### Fixed Code:
```typescript
// ✅ PROPER TYPE SAFETY
interface LoadedMicroFrontend {
  component: any; // This could be more specific if you have common interface
  name: string;
  status: 'loaded';
}

interface RemoteModuleConfig {
  type: 'manifest';
  remoteName: string;
  exposedModule: string;
}

interface ModuleLoadResult {
  name: string;
  component: any | null;
  status: 'success' | 'error';
  error: Error | null;
}

public angularMfe = signal<LoadedMicroFrontend[]>([]);

private createModulePromises(): Promise<ModuleLoadResult>[] {
  const configs: Array<{name: string, config: RemoteModuleConfig}> = [
    { 
      name: 'nav', 
      config: { type: 'manifest', remoteName: 'angular-mfe-nav', exposedModule: './Component' }
    },
    // ... other configs
  ];

  return configs.map(({name, config}) => this.loadSingleModule(name, config));
}
```

## 4. Fix: Form Management ❌➡️✅

### Current Problematic Code:
```typescript
// ❌ RECREATING FORMS
resetSignals(): void{
  this.profileForm = new FormGroup({
    repsControl: new FormControl('0'),
    weightControl: new FormControl('0')
  })
}
```

### Fixed Code:
```typescript
// ✅ PROPER FORM RESET
resetSignals(): void{
  this.series.set([]);
  this.newExerciseChecked.set(false);
  this.enableAddSerie.set(false);
  
  // Proper form reset
  this.profileForm.reset({
    repsControl: '0',
    weightControl: '0'
  });
}
```

## 5. Fix: DOM Manipulation ❌➡️✅

### Current Problematic Code:
```typescript
// ❌ DIRECT DOM MANIPULATION
@HostListener('window:click', ['$event'])
onClick(event: MouseEvent): void {
    const modal = document.getElementById("modalExercise");
    const clickedInside = modal?.contains(event.target as HTMLElement);
    // ...
}
```

### Fixed Code:
```typescript
// ✅ TEMPLATE REFERENCE APPROACH
@ViewChild('modalExercise', { static: false }) modalRef!: ElementRef;

@HostListener('document:click', ['$event'])
onClick(event: MouseEvent): void {
  if (this.modalRef?.nativeElement) {
    const clickedInside = this.modalRef.nativeElement.contains(event.target as HTMLElement);
    if (!clickedInside && this.openModal()) {
      this.closeModal();
    }
  }
}
```

Template:
```html
<div #modalExercise id="modalExercise" class="modal">
  <!-- modal content -->
</div>
```

These fixes address the most critical issues that could cause runtime errors, memory leaks, and maintenance problems in your Angular micro-frontend application.