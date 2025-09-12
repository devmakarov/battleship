import { v4 as generateId } from "uuid";

export type ShipInfo = {
    id: string;
    size: number;
    placement: "horizontal" | "vertical";
    cellsMap: Record<string, number>;
    isDestroyed: boolean;
    neighbours: [number, number][];
};

type Cell = string;

function makeCell(r: number, c: number): Cell {
    return `${r},${c}`;
}

function parseCell(cell: Cell): [number, number] {
    return cell.split(",").map(Number) as [number, number];
}

function getNeighbours(cells: [number, number][], n: number): [number, number][] {
    const dirs = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1],  [1, 0],  [1, 1],
    ];

    const neighbours = new Set<string>();

    for (const [r, c] of cells) {
        for (const [dr, dc] of dirs) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
                neighbours.add(`${nr},${nc}`);
            }
        }
    }

    return [...neighbours].map(s => s.split(",").map(Number) as [number, number]);
}

function find(x: Cell, parentMap: Record<Cell, Cell>): Cell {
    let p = parentMap[x] ?? x;
    if (p !== x) {
        p = find(p, parentMap);
        parentMap[x] = p;
    }
    return p;
}

function union(a: Cell, b: Cell, parentMap: Record<Cell, Cell>) {
    const rootA = find(a, parentMap);
    const rootB = find(b, parentMap);
    if (rootA !== rootB) {
        parentMap[rootB] = rootA;
    }
}

export function getBoardState(state: number[][]) {
    const parent: Record<Cell, Cell> = {};

    state.forEach((row, r) => {
        row.forEach((val, c) => {
            if (val === 1 || val === 2) {
                const cell = makeCell(r, c);
                parent[cell] = cell;
            }
        });
    });

    state.forEach((row, r) => {
        row.forEach((val, c) => {
            if (val === 1 || val === 2) {
                const cell = makeCell(r, c);

                if (c + 1 < row.length && (row[c + 1] === 1 || row[c + 1] === 2)) {
                    union(cell, makeCell(r, c + 1), parent);
                }

                if (
                    r + 1 < state.length &&
                    (state[r + 1][c] === 1 || state[r + 1][c] === 2)
                ) {
                    union(cell, makeCell(r + 1, c), parent);
                }
            }
        });
    });

    const shipCellsMap: Record<Cell, Cell[]> = {};

    Object.keys(parent).forEach((cell) => {
        const root = find(cell, parent);

        if (!shipCellsMap[root]) {
            shipCellsMap[root] = [];
        }

        shipCellsMap[root].push(cell);
    });

    const roots: Record<Cell, ShipInfo> = {};
    const destroyed = [0, 0, 0, 0];

    Object.entries(shipCellsMap).forEach(([root, cells]) => {
            const cellsMap: Record<string, number> = {};
            let isDestroyed = true;

            const coords = cells.map((cell) => {
                const parsed = parseCell(cell);

                if (state[parsed[0]][parsed[1]] === 1) {
                    isDestroyed = false;
                }

                cellsMap[cell] = state[parsed[0]][parsed[1]];
                return parsed;
            });

            const allRowsSame = coords.every(([r]) => {
                return r === coords[0][0];
            });

            const placement: ShipInfo["placement"] = allRowsSame
                ? "horizontal"
                : "vertical";
            const size = cells.length;

            if (isDestroyed) {
                 roots[root] = { id: generateId(), size, placement, cellsMap, isDestroyed, neighbours: getNeighbours(coords, state.length) };
                 destroyed[size - 1] += 1;
            }
    });

    return {
        roots,
        destroyed
    }
}

