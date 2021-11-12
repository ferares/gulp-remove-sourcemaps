const streamAssert = require('stream-assert')
const assert = require('assert')
const gulp = require('gulp')
const gulpRemoveSourcemaps = require('../')

// Sample files taken from https://github.com/ganlanyuan/tiny-slider
const filesPath = './test/files'

describe('gulp-remove-sorucemaps', () => {
  it('should remove sourcemap reference from JS file', (done) => {
    gulp.src(`${filesPath}/sample.js`)
    .pipe(gulpRemoveSourcemaps())
    .pipe(streamAssert.first(file => {
      assert.equal(file.contents.toString().indexOf('//# sourceMappingURL=../sourcemaps/tiny-slider.js.'), -1)
    }))
    .pipe(streamAssert.end(done))
  })

  it('should remove sourcemap reference from CSS file', (done) => {
    gulp.src(`${filesPath}/sample.css`)
    .pipe(gulpRemoveSourcemaps())
    .pipe(streamAssert.first(file => {
      assert.equal(file.contents.toString().indexOf('/*# sourceMappingURL=sourcemaps/tiny-slider.css.map */'), -1)
    }))
    .pipe(streamAssert.end(done))
  })
})
