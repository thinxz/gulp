// PointCanvas
function main() {
  // Retrieve the <canvas> element
  var canvas = document.getElementById("webgl");
  if (!canvas) {
    console.log("Failed To Retrieve the <canvas> element");
    return false;
  }

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log("Failed To Get The Rendering Context For WebGL");
    return false;
  }

  // 查看 WebGL 上下文环境
  console.log(gl);

  // 初始化 着色器
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log("Failed To Initialize Shaders.");
    return;
  }

  // 设置 Canvas 背景色
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // 清空 Canvas
  gl.clear(gl.COLOR_BUFFER_BIT);

  // 绘制一个点
  gl.drawArrays(gl.POINTS, 0, 1);
}

// 定义 顶点着色器 程序
var VSHADER_SOURCE =
  "void main() {\n" +
  // 设置坐标
  "gl_Position = vec4(0.0, 0.0, 0.0, 1.0);\n" +
  // 设置尺寸
  "gl_PointSize = 10.0;\n" +
  "}\n";

// 定义 片元着色器 程序
var FSHADER_SOURCE =
  "void main() {\n" +
  // 设置颜色
  "gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n" +
  "}\n";
