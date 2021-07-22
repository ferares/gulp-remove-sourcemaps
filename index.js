'use strict';
var Transform = require('stream').Transform;

const PLUGIN_NAME = 'gulp-remove-sourcemaps';

module.exports = function() {
  // Monkey patch Transform or create your own subclass,
  // implementing `_transform()` and optionally `_flush()`
  var transformStream = new Transform({objectMode: true});
  /**
   * @param {Buffer|string} file
   * @param {string=} encoding - ignored if file contains a Buffer
   * @param {function(Error, object)} callback - Call this function (optionally with an
   *          error argument and data) when you are done processing the supplied chunk.
   */
  transformStream._transform = function(file, encoding, callback) {
    let error = null;

    if (file.isNull()) {
      return callback(null, file);
    }

    if (file.isStream()) {
      return callback(PLUGIN_NAME + ': Streams not supported!', undefined);
    }

    let contents = file.contents.toString(encoding);
    const regex = /\/\/# sourceMappingURL=.*/g;
    contents = contents.replace(regex, '')

    file.contents = Buffer.from(contents, encoding);

    callback(null, file);
  };

  return transformStream;
};
