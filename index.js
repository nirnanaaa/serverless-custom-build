'use strict';

const BbPromise = require('bluebird');

const build = require('./lib/build');
const cleanup = require('./lib/cleanup');

class WebpackBinaryPackager {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;

    Object.assign(
      this,
      cleanup,
      build
    );

    this.commands = {
      custom: {
        usage: 'Build using your own script',
        lifecycleEvents: [
          'build',
        ],
        commands: {
          build: {
            usage: 'Run using custom build script!',
            lifecycleEvents: [
              'build',
            ],
          },
        },
      },
    };

    this.hooks = {
      'before:deploy:createDeploymentArtifacts': () => BbPromise.bind(this)
        .then(this.build),

      'after:deploy:createDeploymentArtifacts': () => BbPromise.bind(this)
        .then(this.cleanup),

      'custom:build': () => BbPromise.bind(this)
        .then(this.build),
    };
  }
}

module.exports = WebpackBinaryPackager;
