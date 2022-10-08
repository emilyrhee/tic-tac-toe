import { canvas, line } from "./canvas.js";
export { rows, columns };

const rows = 3;
const columns = rows;

for (var i = 1; i < rows; i++) {
  line(
    0,             canvas.width / rows * i,
    canvas.height, canvas.width / rows * i
  );
};

for (var i = 1; i < columns; i++) {
  line(
    canvas.height/columns * i, 0, 
    canvas.height/columns * i, canvas.width
  );
}