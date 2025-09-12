import { useEffect, useState } from "react";
import type { ShipInfo } from "../../Setup/types.ts";
import { v4 as generateId } from "uuid";
import { ECellValue } from "../enums.ts";

export type Cell = string;

export type Destroyed = [number, number, number, number];

export interface BoardPrevMove {
  row: number;
  col: number;
}

export interface UseBoardStateReturn {
  state: number[][];
  setState: React.Dispatch<React.SetStateAction<number[][]>>;
  roots: Record<Cell, ShipInfo>;
  setRoots: React.Dispatch<React.SetStateAction<Record<Cell, ShipInfo>>>;
  reset: () => void;
  prevMove: BoardPrevMove;
  setPrevMove: React.Dispatch<React.SetStateAction<BoardPrevMove>>;
  resetPrevMove: () => void;
  destroyed: Destroyed;
  setDestroyed: React.Dispatch<React.SetStateAction<Destroyed>>;
}

function makeCell(r: number, c: number): Cell {
  return `${r},${c}`;
}

function parseCell(cell: Cell): [number, number] {
  return cell.split(",").map(Number) as [number, number];
}

const getDefaultGrid = () => {
  return Array.from({ length: 10 }, () => new Array(10).fill(0));
};

interface useBoardStateParams {
  grid: number[][];
  defaultRoots?: Record<Cell, ShipInfo>;
}

export const defaultPrevMove: BoardPrevMove = { row: -1, col: -1 };
export const defaultDestroyed: Destroyed = [0, 0, 0, 0];

export const useBoardState = (
  { grid, defaultRoots }: useBoardStateParams = {
    grid: getDefaultGrid(),
  },
): UseBoardStateReturn => {
  const [state, setState] = useState(grid);
  const [, setParent] = useState<Record<Cell, Cell>>({});
  const [roots, setRoots] = useState<Record<Cell, ShipInfo>>({});
  const [prevMove, setPrevMove] = useState(defaultPrevMove);
  const [destroyed, setDestroyed] = useState<Destroyed>(defaultDestroyed);

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

  const reset = () => {
    setRoots({});
    setState(getDefaultGrid());
    setDestroyed([...defaultDestroyed]);
  };

  const resetPrevMove = () => {
    setPrevMove(defaultPrevMove);
  };

  useEffect(() => {
    const newParent: Record<Cell, Cell> = {};

    state.forEach((row, r) => {
      row.forEach((val, c) => {
        if (val === ECellValue.Live || val === ECellValue.Shot) {
          const cell = makeCell(r, c);
          newParent[cell] = cell;
        }
      });
    });

    state.forEach((row, r) => {
      row.forEach((val, c) => {
        if (val === ECellValue.Live || val === ECellValue.Shot) {
          const cell = makeCell(r, c);

          if (
            c + 1 < row.length &&
            (row[c + 1] === ECellValue.Live || row[c + 1] === ECellValue.Shot)
          ) {
            union(cell, makeCell(r, c + 1), newParent);
          }

          if (
            r + 1 < state.length &&
            (state[r + 1][c] === ECellValue.Live ||
              state[r + 1][c] === ECellValue.Shot)
          ) {
            union(cell, makeCell(r + 1, c), newParent);
          }
        }
      });
    });

    const shipCellsMap: Record<Cell, Cell[]> = {};
    Object.keys(newParent).forEach((cell) => {
      const root = find(cell, newParent);
      if (!shipCellsMap[root]) shipCellsMap[root] = [];
      shipCellsMap[root].push(cell);
    });

    if (defaultRoots === undefined) {
      const newRoots: Record<Cell, ShipInfo> = {};
      Object.entries(shipCellsMap).forEach(([root, cells]) => {
        const cellsMap: Record<string, number> = {};
        let isDestroyed = true;

        const coords = cells.map((cell) => {
          const parsed = parseCell(cell);

          if (state[parsed[0]][parsed[1]] === ECellValue.Live) {
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
        newRoots[root] = {
          id: generateId(),
          size,
          placement,
          cellsMap,
          isDestroyed,
          neighbours: [],
        };
      });

      setRoots(newRoots);
    } else {
      try {
        setRoots(defaultRoots);
      } catch (e) {
        console.error(e);
      }
    }

    setParent(newParent);
  }, [state, defaultRoots]);

  return {
    state,
    setState,
    roots,
    setRoots,
    reset,
    prevMove,
    setPrevMove,
    resetPrevMove,
    destroyed,
    setDestroyed,
  };
};
