import { Node } from './node.js';

export class Grid {
  constructor(size) {
    this.size = size;
    this.grid = this.createGrid();
    this.startNode = null;
    this.endNode = null;
  }

  createGrid() {
    const grid = [];
    for (let i = 0; i < this.size; i++) {
      const row = [];
      for (let j = 0; j < this.size; j++) {
        row.push(new Node(i, j));
      }
      grid.push(row);
    }
    return grid;
  }

  clearGrid() {
    for (let row of this.grid) {
      for (let node of row) {
        node.isWall = false;
        node.isVisited = false;
        node.previous = null;
        node.distance = Infinity;
        node.isWeighted = false;
        node.inPath = false;
        node.isStart = false; 
        node.isEnd = false;    
      }
    }
    this.startNode = null;
    this.endNode = null;
  }


  render(container) {
    container.innerHTML = '';
    container.style.gridTemplateColumns = `repeat(${this.size}, 30px)`;
    container.style.gridTemplateRows = `repeat(${this.size}, 30px)`;
    this.grid.forEach(row => {
      row.forEach(node => {
        const cell = document.createElement('div');
        cell.id = node.getId();
        cell.classList.add('cell');
        container.appendChild(cell);
      });
    });
  }

  resetVisited() {
    for (let row of this.grid) {
      for (let node of row) {
        node.visited = false;
        node.distance = Infinity;
        node.previous = null;
        const cell = document.getElementById(node.getId());
        cell.classList.remove('visited', 'path');
      }
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('savedGrid', JSON.stringify(this.grid));
  }

  loadFromLocalStorage() {
    const saved = JSON.parse(localStorage.getItem('savedGrid'));
    if (!saved) return;
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const node = this.grid[i][j];
        Object.assign(node, saved[i][j]);
        const cell = document.getElementById(node.getId());
        cell.className = 'cell';
        if (node.isWall) cell.classList.add('wall');
        if (node.isStart) cell.classList.add('start');
        if (node.isEnd) cell.classList.add('end');
        if (node.weight > 1) cell.classList.add('weight');
        if (node.isStart) this.startNode = node;
        if (node.isEnd) this.endNode = node;
      }
    }
  }
}
