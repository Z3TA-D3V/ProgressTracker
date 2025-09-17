const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'angular-mfe-tracky-manager',

  exposes: {
    './Component': './src/app/angular-mfe-tracky-manager/angular-mfe-tracky-manager.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
