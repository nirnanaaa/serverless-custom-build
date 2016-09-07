'use strict';

const BbPromise = require('bluebird');
const shim = require('./shim');

module.exports = {
  build() {
    this.serverless.cli.log('Bundling with Custom script...');
    const config = this.serverless.service.custom.build;
    const script = config.script;
    const directory = config.directory;
    const options = config.options;
    this.serverless.cli.log('[Custom Build Script] Script: ' + script);
    this.serverless.cli.log('[Custom Build Script] Options: ' + options);
    this.serverless.cli.log('[Custom Build Script] Build artifacts: ' + directory);

    return BbPromise
      .fromCallback(cb => shim(script, options, cb))
      .then(stats => {
        this.outputDir = directory;
        this.originalServicePath = this.serverless.config.servicePath;
        this.serverless.config.servicePath = directory;
        return stats;
      });
  },
};
