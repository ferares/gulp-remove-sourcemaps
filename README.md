# gulp-remove-sourcemaps
Gulp plugin for removing source maps references from files.

## Installation
`npm install --save-dev gulp-remove-sourcemaps`

## Usage
```
gulp.src(src)
    .pipe(removeSourcemaps())
    .pipe(gulp.dest(dst));
```
