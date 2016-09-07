'use strict';

const BbPromise = require('bluebird');
const shim = require('./shim');

module.exports = {
  build() {
    this.serverless.cli.log('Bundling with Custom script...');

    return BbPromise
      .fromCallback(cb => shim(this.serverless.service.custom.buildScript, cb))
      .then(stats => {
        this.serverless.config.servicePath = './build';
        return stats;
      });
  },
};
