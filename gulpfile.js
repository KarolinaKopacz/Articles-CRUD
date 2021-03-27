let gulp = require("gulp")
let path = require("path")
var uglify = require("gulp-uglify")
let connect = require("gulp-connect")
var browserify = require("browserify")
var watchify = require("watchify")
var buffer = require("vinyl-buffer")

var tsify = require("tsify")
var source = require("vinyl-source-stream")

const configuration = {
  html: ["src/views/*.html", "src/views/**/*.html"],
  css: ["src/css/*.css"],
  font: ["src/webfonts/*"],
  js: ["src/js/index.ts"],
}
const js = (watched) => {
  return watched
    .bundle()
    .on("error", console.log)
    .pipe(source("main.js"))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"))
}
const watchJs = () =>
  watchify(
    browserify({
      entries: configuration.js,
    }).plugin(tsify)
  )
const buildJs = () => {
  return browserify({
    entries: configuration.js,
  }).plugin(tsify)
}

const html = () => {
  return gulp.src(configuration.html).pipe(gulp.dest("dist"))
}
const css = () => {
  return gulp.src(configuration.css).pipe(gulp.dest("dist"))
}
const fontAwesome = () => {
  return gulp.src(configuration.font).pipe(gulp.dest("dist/webfonts"))
}

const watch = () => {
  html()
  css()
  fontAwesome()
  const watchedJs = watchJs()

  gulp.watch(configuration.html, function watchHTML() {
    return html().pipe(connect.reload())
  })
  gulp.watch(configuration.css, function watchCSS() {
    return css().pipe(connect.reload())
  })

  js(watchedJs).pipe(connect.reload())
  watchedJs.on("update", (ev) => {
    js(watchedJs).pipe(connect.reload())
    fancy_log(ev)
  })
  return connect.server({
    port: 8090,
    root: "dist",
    livereload: true,
  })
}

gulp.task("watch:dev", watch)
gulp.task(
  "build:prod",
  gulp.series(html, css, fontAwesome, function buildJsProd() {
    return js(buildJs())
  })
)
