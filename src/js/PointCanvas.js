// PointCanvas
// attribute 变量, 从外部向顶点着色器内部传输数据
// 根据鼠标点击, 动态创建显示点
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

  // 获取 attribute 变量的存储位置
  var a_Position = gl.getAttribLocation(gl.program, "a_Position");
  if (a_Position < 0) {
    console.log("Failed To Get The Storage Location Of a_Position");
    return;
  }

  // 将顶点位置, 传递给 arrtibute 变量
  gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);

  //
  var a_PointSize = gl.getAttribLocation(gl.program, "a_PointSize");
  if (a_PointSize < 0) {
    console.log("Failed To Get The Storage Location Of a_PointSize");
    return;
  }
  //
  gl.vertexAttrib1f(a_PointSize, 10.0);

  // 注册鼠标点击事件响应函数
  canvas.onmousedown = function(ev) {
    click(ev, gl, canvas, a_Position);
  };

  // 设置 Canvas 背景色
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // 清空 Canvas
  gl.clear(gl.COLOR_BUFFER_BIT);

  // 绘制一个点
  gl.drawArrays(gl.POINTS, 0, 1);
}

// 定义 顶点着色器 程序
var VSHADER_SOURCE =
  "attribute vec4 a_Position;\n" +
  "attribute float a_PointSize;\n" +
  "void main() {\n" +
  // 设置坐标
  "gl_Position = a_Position;\n" +
  // 设置尺寸
  "gl_PointSize = a_PointSize;\n" +
  "}\n";

// 定义 片元着色器 程序
var FSHADER_SOURCE =
  "void main() {\n" +
  // 设置颜色
  "gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n" +
  "}\n";

// 鼠标点击位置数组
// 每次点击都将坐标保存 [x,y,x,y]
var g_points = [];
function click(ev, gl, canvas, a_Position) {
  var x = ev.clientX;
  var y = ev.clientY;

  var rect = ev.target.getBoundingClientRect();
  x = (x - rect.left - canvas.height / 2) / (canvas.height / 2);
  y = (canvas.width / 2 - (y - rect.top)) / (canvas.width / 2);

  g_points = [];

  // 坐标存储到数组
  g_points.push(x);
  g_points.push(y);

  // 清除
  gl.clear(gl.COLOR_BUFFER_BIT);

  // 将保存的数据数据, 进行渲染
  var len = g_points.length;
  console.log(g_points);
  for (var i = 0; i < len; i += 2) {
    // 将点的位置传递到变量中 a_Position
    gl.vertexAttrib3f(a_Position, g_points[i], g_points[i + 1], 0.0);

    // 绘制点
    gl.drawArrays(gl.POINTS, 0, 1);
  }
}
