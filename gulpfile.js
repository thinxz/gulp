// 01 打包 HTML
const Gulp = require("gulp");
const FileInclude = require("gulp-file-include");

const Dist = "build/";
Gulp.task("copy-html", () => {
  return Gulp.src("src/view/*.html")
    .pipe(
      FileInclude({
        // HTML模板替换，具体用法见下文
        prefix: "##",
        basepath: "@file"
      })
    )
    .on("error", function(err) {
      console.error("Task:copy-html,", err.message);
      this.end();
      // 拷贝
    })
    .pipe(Gulp.dest(Dist));
});

// 02 打包 JS文件
const Uglify = require("gulp-uglify");
Gulp.task("copy-js", () => {
  Gulp.src("src/js/**")
    // 压缩js
    .pipe(Uglify())
    // 拷贝
    .pipe(Gulp.dest(Dist + "/js"));
});

// 03 打包 CSS文件
const Minifycss = require("gulp-minify-css");
Gulp.task("copy-css", () => {
  Gulp.src("src/css/*.css")
    // 压缩css
    .pipe(Minifycss())
    // 拷贝
    .pipe(Gulp.dest(Dist + "/css"));
});

// 04 打包 Image
Gulp.task("copy-images", () => {
  Gulp.src("src/images/*")
    // 拷贝
    .pipe(Gulp.dest(Dist + "/images"));
});

// 05 开启本地 HTTP 服务器 -> 监听 build 目录变化实现浏览器自动刷新
const WebServer = require("gulp-webserver");
Gulp.task("web-server", () => {
  // 监听build目录
  Gulp.src(Dist).pipe(
    WebServer({
      // 端口
      port: 8080,
      // 地址
      host: "localhost",
      // 配置热刷新
      livereload: true,
      // 配置启动成功自动打开指定页面
      open: "http://localhost:8080/index.html"
    })
  );
});

// 06 自动构建监听文件变化 gulp watch
const Watch = require("gulp-watch");
Gulp.task("watch", () => {
  // 监听HTML变化
  Gulp.watch("src/view/*", ["copy-html"]);
  // 监听js变化
  Gulp.watch("src/js/**", ["copy-js"]);
  // 监听css变化
  Gulp.watch("src/css/*", ["copy-css"]);
  // 监听image变化
  Gulp.watch("src/images/*", ["copy-images"]);
});

// 07 自动清理
const Clean = require("gulp-clean");
Gulp.task("clean", () => {
  return Gulp.src(Dist).pipe(Clean());
});

// 配置任务
Gulp.task("copy-sources", ["copy-css", "copy-js", "copy-html", "copy-images"]);

// RunSequence是用来设置任务串行执行, 因为有些任务是有先后顺序依赖，[]内的并行执行，()内的串行执行
const RunSequence = require("gulp-run-sequence");
Gulp.task("start", () => {
  RunSequence("clean", ["copy-sources", "watch"], "web-server");
});

// 默认启动任务
Gulp.task("default", ["start"]);
