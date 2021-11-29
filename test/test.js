const streamAssert = require('stream-assert')
const assert = require('assert')
const gulp = require('gulp')
const validateCss = require('gulp-w3c-css')
const jsValidate = require('gulp-jsvalidate')
const gulpRemoveSourcemaps = require('../')

// Sample files taken from:
// https://github.com/ganlanyuan/tiny-slider
// https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/
// https://unpkg.com/browse/swiper@7.3.0/
const filesPath = './test/files'

describe('gulp-remove-sorucemaps', () => {
  it('should remove sourcemap reference from JS files', (done) => {
    gulp.src(`${filesPath}/tiny-slider.js`)
    .pipe(gulpRemoveSourcemaps())
    .pipe(streamAssert.first(file => {
      assert.equal(file.contents.toString().indexOf('//# sourceMappingURL=../sourcemaps/tiny-slider.js.'), -1)
    }))
    .pipe(jsValidate())
    .pipe(streamAssert.end(done))
  })

  it('should remove sourcemap reference from CSS files', (done) => {
    gulp.src(`${filesPath}/tiny-slider.css`)
    .pipe(gulpRemoveSourcemaps())
    .pipe(streamAssert.first(file => {
      assert.equal(file.contents.toString().indexOf('/*# sourceMappingURL=sourcemaps/tiny-slider.css.map */'), -1)
    }))
    .pipe(validateCss())
    .pipe(streamAssert.end(done))
  })

  it('should not take too longo to remove sourcemap references from large JS files (Sample 1)', (done) => {
    gulp.src(`${filesPath}/swiper-bundle.min.js`)
    .pipe(gulpRemoveSourcemaps())
    .pipe(streamAssert.first(file => {
      assert.equal(file.contents.toString().indexOf('//# sourceMappingURL=swiper-bundle.min.js.map'), -1)
    }))
    .pipe(jsValidate())
    .pipe(streamAssert.end(done))
  })

  it('should not take too longo to remove sourcemap references from large JS files (Sample 2)', (done) => {
    gulp.src(`${filesPath}/bootstrap.bundle.min.js`)
    .pipe(gulpRemoveSourcemaps())
    .pipe(streamAssert.first(file => {
      assert.equal(file.contents.toString().indexOf('//# sourceMappingURL=bootstrap.bundle.min.js.map'), -1)
    }))
    // Validation takes too long to complete (over a minute)
    // .pipe(jsValidate())
    .pipe(streamAssert.end(done))
  })

  it('should not take too longo to remove sourcemap references from large CSS files', (done) => {
    gulp.src(`${filesPath}/bootstrap.min.css`)
    .pipe(gulpRemoveSourcemaps())
    .pipe(streamAssert.first(file => {
      assert.equal(file.contents.toString().indexOf('/*# sourceMappingURL=bootstrap.min.css.map */'), -1)
    }))
    .pipe(validateCss())
    .pipe(streamAssert.end(done))
  })
})
