type Coord = [number, number];

function getNeighboursOfShip(board: number[][], shipCells: Coord[]): Coord[] {
    const n = board.length;
    const dirs = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1],  [1, 0],  [1, 1],
    ];

    const neighbours = new Set<string>();

    for (const [r, c] of shipCells) {
        for (const [dr, dc] of dirs) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < n && nc >= 0 && nc < n) {

                if (!shipCells.some(([sr, sc]) => sr === nr && sc === nc)) {
                    neighbours.add(`${nr},${nc}`);
                }
            }
        }
    }

    return [...neighbours].map(s => s.split(",").map(Number) as Coord);
}

export function checkShipKilled(board: number[][], row: number, col: number) {
    const n = board.length;

    const dirs = [
        [1, 0], [-1, 0], [0, 1], [0, -1],
    ];
    const visited = new Set<string>();
    const queue: Coord[] = [[row, col]];
    const shipCells: Coord[] = [];

    while (queue.length > 0) {
        const [r, c] = queue.shift()!;
        const key = `${r},${c}`;
        if (visited.has(key)) continue;
        visited.add(key);

        if (board[r][c] === 1 || board[r][c] === 2) {
            shipCells.push([r, c]);

            for (const [dr, dc] of dirs) {
                const nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
                    if (!visited.has(`${nr},${nc}`) &&
                        (board[nr][nc] === 1 || board[nr][nc] === 2)) {
                        queue.push([nr, nc]);
                    }
                }
            }
        }
    }

    const isDestroyed = shipCells.every(([r, c]) => board[r][c] === 2);

    if (!isDestroyed) {
        return [];
    }

    return  getNeighboursOfShip(board, shipCells);
}
