// MultiPoint
// 缓冲区, 多点绘制
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

  // 设置顶点位置等数据
  var n = initVertexBuffers(gl);
  if (n < 0) {
    console.log("Failed To Set The Positions Of The Vertices");
    return;
  }

  // 设置 Canvas 背景色
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // 清空 Canvas
  gl.clear(gl.COLOR_BUFFER_BIT);

  // 绘制 n 点
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
  // 精度限定
  "precision mediump float;\n" +
  "uniform vec4 u_FragColor;\n" +
  "void main() {\n" +
  // 设置颜色
  "gl_FragColor = u_FragColor;\n" +
  "}\n";

function initVertexBuffers(gl) {
  var vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);

  // 点个数
  var n = 3;

  // 创建缓冲区对象
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log("Failed To Create The Buffer Object");
    return -1;
  }

  // 将缓冲区对象绑定到目标
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  // 向缓冲区对象中写入数据
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  var a_Position = gl.getAttribLocation(gl.program, "a_Position");
  if (a_Position < 0) {
    console.log("Failed To Get The Storage Location Of a_Position");
    return;
  }
  // 将缓冲区对象分配给 a_Position 变量
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  // 连接 a_Position 变量与分配给他的缓冲区对象
  gl.enableVertexAttribArray(a_Position);

  // 设置默认大小
  var a_PointSize = gl.getAttribLocation(gl.program, "a_PointSize");
  if (a_PointSize < 0) {
    console.log("Failed To Get The Storage Location Of a_PointSize");
    return;
  }
  gl.vertexAttrib1f(a_PointSize, 10.0);

  // 设置默认颜色
  var u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");
  if (!u_FragColor) {
    console.log("Failed To Get The Storage Location Of u_FragColor");
    return;
  }
  gl.uniform4f(u_FragColor, 1.0, 0.0, 0.0, 1.0);

  return n;
}
