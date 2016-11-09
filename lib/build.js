'use strict';

const BbPromise = require('bluebird');
const shim = require('./shim');

module.exports = {
  build() {
    this.serverless.cli.log('[Custom Build] Enabled');
    const config = this.serverless.service.custom.build;
    const script = config.script;
    const directory = config.directory;
    const options = config.options;
    this.serverless.cli.log('[Custom Build] Script: ' + script);
    this.serverless.cli.log('[Custom Build] Options: ' + options);
    this.serverless.cli.log('[Custom Build] Artifacts: ' + directory);

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
