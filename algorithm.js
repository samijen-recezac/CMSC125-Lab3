import { sleep } from './utils.js';

export async function dijkstra(grid, start, end, speed) {
  const queue = [start];
  start.distance = 0;

  while (queue.length) {
    queue.sort((a, b) => a.distance - b.distance);
    const current = queue.shift();

    if (current.visited) continue;
    current.visited = true;

    document.getElementById(`cell-${current.x}-${current.y}`).classList.add('visited');
    await sleep(speed);

    if (current === end) break;

    for (const neighbor of getNeighbors(grid, current)) {
      if (!neighbor.visited && !neighbor.isWall) {
        const newDist = current.distance + neighbor.weight;
        if (newDist < neighbor.distance || neighbor.distance === undefined) {
          neighbor.distance = newDist;
          neighbor.previous = current;
          queue.push(neighbor);
        }
      }
    }
  }

  // Backtrack
  let pathNode = end.previous;
  while (pathNode && pathNode !== start) {
    document.getElementById(`cell-${pathNode.x}-${pathNode.y}`).classList.add('path');
    pathNode = pathNode.previous;
    await sleep(speed);
  }
}
