export function sleep(speed) {
  const map = { fast: 10, medium: 50, slow: 150 };
  return new Promise(resolve => setTimeout(resolve, map[speed]));
}

export function getNeighbors(grid, node) {
  const dirs = [[0,1],[1,0],[0,-1],[-1,0]];
  const neighbors = [];

  for (let [dx, dy] of dirs) {
    const x = node.row + dx;
    const y = node.col + dy;
    if (x >= 0 && y >= 0 && x < grid.length && y < grid[0].length) {
      neighbors.push(grid[x][y]);
    }
  }

  return neighbors;
}
