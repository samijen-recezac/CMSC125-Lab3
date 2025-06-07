import { Grid } from './grid.js';
import { dijkstra } from './algorithm.js';

const gridSizeInput = document.getElementById('grid-size');
const gridContainer = document.getElementById('grid-container');
const toolSelect = document.getElementById('tool');
const speedSelect = document.getElementById('speed');
let grid = new Grid(Number(gridSizeInput.value));

grid.render(gridContainer);
attachHandlers();

document.getElementById('resize').onclick = () => {
  grid = new Grid(Number(gridSizeInput.value));
  grid.render(gridContainer);
  attachHandlers();
};

document.getElementById('start-button').onclick = async () => {
  grid.resetVisited();
  await dijkstra(grid, speedSelect.value);
};

document.getElementById('save').onclick = () => grid.saveToLocalStorage();
document.getElementById('load').onclick = () => grid.loadFromLocalStorage();

function attachHandlers() {
  grid.grid.forEach(row => {
    row.forEach(node => {
      const cell = document.getElementById(node.getId());
      cell.onclick = () => {
        const tool = toolSelect.value;
        if (tool === 'wall') {
          node.isWall = !node.isWall;
          cell.classList.toggle('wall');
        } else if (tool === 'start') {
          if (grid.startNode) document.getElementById(grid.startNode.getId()).classList.remove('start');
          grid.startNode = node;
          node.isStart = true;
          cell.classList.add('start');
        } else if (tool === 'end') {
          if (grid.endNode) document.getElementById(grid.endNode.getId()).classList.remove('end');
          grid.endNode = node;
          node.isEnd = true;
          cell.classList.add('end');
        } else if (tool === 'weight') {
          node.weight = node.weight === 1 ? 5 : 1;
          cell.classList.toggle('weight');
        }
      };
    });
  });
}

const clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", () => {
    console.log("Clearing grid...");
    grid.clearGrid();
    grid.render(gridContainer);
});


