export class Node {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.isWall = false;
    this.isStart = false;
    this.isEnd = false;
    this.weight = 1;
    this.visited = false;
    this.distance = Infinity;
    this.previous = null;
  }

  getId() {
    return `cell-${this.row}-${this.col}`;
  }
}
