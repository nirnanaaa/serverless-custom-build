
var child = require('child_process')
var byline = require('./byline')

module.exports = function (buildFile, cb) {
  /**
   * Child process for binary I/O.
   */

  var proc = child.spawn(buildFile, { stdio: ['pipe', 'pipe', process.stderr] });

  proc.on('error', cb);

  proc.on('exit', cb);

  /**
   * Newline-delimited JSON stdout.
   */

  var out = byline(proc.stdout);

  out.on('data', function(line){
    cb(null, line);
  });
}
