import { Node } from './node.js';

export class Grid {
  constructor(size) {
    this.size = size;
    this.nodes = this.createGrid();
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
}
