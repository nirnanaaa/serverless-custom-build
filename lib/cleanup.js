'use strict';

const BbPromise = require('bluebird');
const path = require('path');
const fse = require('fs-extra');

module.exports = {
  cleanup() {
    const outDir = this.outputDir;
    this.serverless.cli.log('[Custom Build] CLI Cleanup');
    this.serverless.cli.log('[Custom Build] CLI Service Path: '+ this.serverless.config.servicePath);
    this.serverless.cli.log('[Custom Build] CLI Build: '+ outDir);
    if (outDir === this.serverless.config.servicePath) return Promise.resolve();
    const moveArtifact = new BbPromise((resolve, reject) => {
      this.serverless.config.servicePath = this.originalServicePath;
      fse.move(
        path.join(outDir, '.serverless'),
        path.join(this.serverless.config.servicePath, '.serverless'),
        (err) => {
          if (err) {
            this.serverless.cli.log('[Custom Build] CLI Error');
            reject(err);
          } else {
            this.serverless.service.package.artifact = path.join(
              this.serverless.config.servicePath,
              '.serverless',
              path.basename(this.serverless.service.package.artifact)
            );
            resolve();
          }
        }
      );
    });

    return moveArtifact
      .then(() => {
        if (this.serverless.utils.dirExistsSync(outDir)) {
          fse.removeSync(outDir);
        }
      })
      .then(() => BbPromise.resolve());
  },
};
