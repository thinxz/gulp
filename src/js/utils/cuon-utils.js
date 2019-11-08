// 不同浏览器对获取 WebGL 上下文的参数不同
// experimental-webgl
function getWebGLContext(element, debug) {
  return element.getContext("experimental-webgl");
}
