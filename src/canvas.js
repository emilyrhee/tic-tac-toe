import { rgb } from "./utils.js";
export { canvas, c, line };

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

function line(xi, yi, xf, yf) {
  c.beginPath();
  c.moveTo(xi, yi);
  c.lineTo(xf, yf);
  c.strokeStyle = rgb(255,128,0);
  c.stroke();
}