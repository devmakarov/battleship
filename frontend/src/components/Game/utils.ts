import type { Ship } from "../Ship/types.ts";
import { ECellValue } from "../Board/enums.ts";

export function generateBattleshipGrid(): number[][] {
  const rows = 10;
  const cols = 10;
  const grid: number[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(ECellValue.Empty),
  );

  const ships: Ship[] = [
    { size: 4, count: 1 },
    { size: 3, count: 2 },
    { size: 2, count: 3 },
    { size: 1, count: 4 },
  ];

  function canPlaceShip(
    r: number,
    c: number,
    size: number,
    horizontal: boolean,
  ) {
    for (let i = 0; i < size; i++) {
      const row = r + (horizontal ? 0 : i);
      const col = c + (horizontal ? i : 0);
      if (row >= rows || col >= cols || grid[row][col] === ECellValue.Live)
        return false;

      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = row + dr;
          const nc = col + dc;
          if (
            nr >= 0 &&
            nr < rows &&
            nc >= 0 &&
            nc < cols &&
            grid[nr][nc] === ECellValue.Live
          ) {
            return false;
          }
        }
      }
    }
    return true;
  }

  function placeShip(size: number) {
    let placed = false;
    while (!placed) {
      const r = Math.floor(Math.random() * rows);
      const c = Math.floor(Math.random() * cols);
      const horizontal = Math.random() < 0.5;

      if (canPlaceShip(r, c, size, horizontal)) {
        for (let i = 0; i < size; i++) {
          const row = r + (horizontal ? 0 : i);
          const col = c + (horizontal ? i : 0);
          grid[row][col] = ECellValue.Live;
        }
        placed = true;
      }
    }
  }

  for (const ship of ships) {
    for (let i = 0; i < ship.count; i++) {
      placeShip(ship.size);
    }
  }

  return grid;
}

export const getDefaultPosition = () => {
  return Array.from({ length: 10 }, () => new Array(10).fill(ECellValue.Empty));
};

export const getOpponentPosition = () => {
  return generateBattleshipGrid();
};

export function shootRandom(grid: number[][]): [number, number] | null {
  const availableCells: [number, number][] = [];

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] !== ECellValue.Shot && grid[r][c] !== ECellValue.Miss) {
        availableCells.push([r, c]);
      }
    }
  }

  if (availableCells.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * availableCells.length);
  return availableCells[randomIndex];
}
