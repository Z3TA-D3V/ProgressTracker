# Tracky!

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.1.

mfe's were created using [@angular-architects/module-federation](https://www.npmjs.com/package/@angular-architects/module-federation) ng add command on version 20.0.0.

mef's use the `manifest.json` on the angular-mfe-host to dynamic resolve redirection of the remoteEntry.js on each mfe.

Manifest load is done through the `main.ts` file on the host mfe.

Dynamic resolution is done via `app.routes.ts` where every route uses the Manifest for a direct connection to the remote mfe. (angular-mfe-nav).

Remote MFEs indicates which file has to be exported and bundled through webpack in the `remoteEntry.js` of every MFE. It also defines which dependecies wants to share with the host MFE.

## Development server

To start a local development server, run:

```bash
ng serve
```

ng serve has to be done in angular-mfe-host via `http://localhost:4200/` and in angular-mfe-nav via `http://localhost:4201/`

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

To generate a new MFE, run:

```bash
ng add @angular-architects/module-federation --port 4202
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

For more information about Webpack Module Federation Architects pack, visits [@angular-architects/module-federation] (https://www.npmjs.com/package/@angular-architects/module-federation) page.

For more information about native Webpack 5 with the module-federation-plugin on which @angular-architects is based, visits [module-federation-plugin] (https://webpack.js.org/plugins/module-federation-plugin/) page.
