export class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isWall = false;
    this.isStart = false;
    this.isEnd = false;
    this.weight = 1;
    this.visited = false;
    this.previous = null;
  }
}
