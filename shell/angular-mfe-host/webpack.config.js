const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'angular-microfrontend-host',

  remotes: {
    // "angular-mfe-nav": "http://localhost:4201/remoteEntry.js"
    // This is loaded dynamically from the manifest.json in the main.ts loadManifest() from @angular-architects/module-federation
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
    'libs/shared': { singleton: true, strictVersion: true }, // your shared package
  },

});
