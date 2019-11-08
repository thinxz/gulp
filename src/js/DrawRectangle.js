// DrawRectangle
function main() {
  // Retrieve the <canvas> element
  var canvas = document.getElementById("example");
  if (!canvas) {
    console.log("Failed To Retrieve the <canvas> element");
    return false;
  }

  // Get the rendering context for 2DCG
  var ctx = canvas.getContext("2d");

  // Draw a blue rectangle

  //Set A Bule Color
  ctx.fillStyle = "rgba(0,0,255,0.1)";

  // Fill A Rectangle With The Color
  ctx.fillRect(120, 10, 150, 150);
}
