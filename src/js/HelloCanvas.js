// HelloCanvas
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
  // console.log(gl);

  // 指定清空 <canvas> 的颜色
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // 清空
  gl.clear(gl.COLOR_BUFFER_BIT);
}
