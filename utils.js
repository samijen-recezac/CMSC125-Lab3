export function sleep(speed) {
  const time = speed === 'fast' ? 20 : speed === 'medium' ? 100 : 300;
  return new Promise(resolve => setTimeout(resolve, time));
}

export function getNeighbors(grid, node) {
  const dirs = [[1,0], [0,1], [-1,0], [0,-1]];
  const neighbors = [];
  for (const [dx, dy] of dirs) {
    const x = node.x + dx;
    const y = node.y + dy;
    if (x >= 0 && y >= 0 && x < grid.length && y < grid[0].length) {
      neighbors.push(grid[x][y]);
    }
  }
  return neighbors;
}
