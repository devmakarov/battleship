import type { ShipDataTransfer } from "../../Ship/types.ts";
import { ECellValue } from "../enums.ts";

function isOutOfBounds(row: number, col: number) {
  return row < 0 || row >= 10 || col < 0 || col >= 10;
}

const directions = [
  [0, 1],
  [0, -1],
  [1, 1],
  [1, 0],
  [1, -1],
  [-1, 0],
  [-1, 1],
  [-1, -1],
];

export const useBoardValidation = (state: number[][]) => {
  const isNextStateValid = (
    row: number,
    col: number,
    data: ShipDataTransfer,
    changePlacement?: boolean,
  ): [boolean, number[][]] => {
    const copy = state.map((row) => [...row]);

    const prevCells: [number, number][] = [];

    if (data.cellsMap) {
      for (const key of data.cellsMap) {
        const parsedKey = key.split(",");
        prevCells.push([
          parsedKey[0] as unknown as number,
          parsedKey[1] as unknown as number,
        ]);
      }
    }
    const shipCells = [];

    for (let i = 0; i < data.size; i++) {
      let placement = data.placement;

      if (changePlacement) {
        if (data.placement === "horizontal") {
          placement = "vertical";
        } else {
          placement = "horizontal";
        }
      }

      const cellRow = placement === "horizontal" ? row : row + i;
      const cellCol = placement === "horizontal" ? col + i : col;

      shipCells.push([cellRow, cellCol]);
    }

    for (const [cellRow, cellCol] of prevCells) {
      copy[cellRow][cellCol] = ECellValue.Empty;
    }

    let isValid = true;

    for (const [cellRow, cellCol] of shipCells) {
      if (isOutOfBounds(cellRow, cellCol)) {
        isValid = false;
        break;
      }

      if (copy[cellRow][cellCol] !== ECellValue.Empty) {
        isValid = false;
        break;
      }

      for (const [directionRow, directionCol] of directions) {
        const row = cellRow + directionRow;
        const col = cellCol + directionCol;

        if (isOutOfBounds(row, col)) {
          continue;
        }

        if (copy[row][col] !== 0) {
          isValid = false;
          break;
        }
      }
    }

    if (!isValid) {
      return [false, state] as const;
    }

    for (const [cellRow, cellCol] of shipCells) {
      copy[cellRow][cellCol] = ECellValue.Live;
    }

    return [true, copy];
  };

  return { isNextStateValid };
};
