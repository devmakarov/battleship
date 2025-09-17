import { useCallback, useMemo, useState } from "react";
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
  externalRoots: Record<Cell, ShipInfo>;
  setExternalRoots: React.Dispatch<
    React.SetStateAction<Record<Cell, ShipInfo>>
  >;
  resetState: () => void;
  prevMove: BoardPrevMove;
  setPrevMove: React.Dispatch<React.SetStateAction<BoardPrevMove>>;
  resetPrevMove: () => void;
  resetDestroyed: () => void;
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
  hasExternalRoots?: boolean;
}

export const defaultPrevMove: BoardPrevMove = { row: -1, col: -1 };
export const defaultDestroyed: Destroyed = [0, 0, 0, 0];

export const useBoardState = (
  { grid, hasExternalRoots = false }: useBoardStateParams = {
    grid: getDefaultGrid(),
  },
): UseBoardStateReturn => {
  const [externalRoots, setExternalRoots] = useState<Record<Cell, ShipInfo>>(
    {},
  );
  const [state, setState] = useState(grid);
  const [prevMove, setPrevMove] = useState(defaultPrevMove);
  const [destroyed, setDestroyed] = useState<Destroyed>([...defaultDestroyed]);

  const find = useCallback((x: Cell, parentMap: Record<Cell, Cell>): Cell => {
    let p = parentMap[x] ?? x;
    if (p !== x) {
      p = find(p, parentMap);
      parentMap[x] = p;
    }
    return p;
  }, []);

  const union = useCallback(
    (a: Cell, b: Cell, parentMap: Record<Cell, Cell>) => {
      const rootA = find(a, parentMap);
      const rootB = find(b, parentMap);
      if (rootA !== rootB) {
        parentMap[rootB] = rootA;
      }
    },
    [find],
  );

  const resetState = () => {
    setState(getDefaultGrid());
  };

  const resetDestroyed = () => {
    setDestroyed([...defaultDestroyed]);
  };

  const resetPrevMove = () => {
    setPrevMove(defaultPrevMove);
  };

  const computeRoots = useCallback(
    (state: number[][]): Record<Cell, ShipInfo> => {
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

      return newRoots;
    },
    [find, union],
  );

  const roots = useMemo(() => {
    return hasExternalRoots ? externalRoots : computeRoots(state);
  }, [hasExternalRoots, computeRoots, state, externalRoots]);

  return {
    state,
    setState,
    roots,
    resetState,
    prevMove,
    setPrevMove,
    resetPrevMove,
    destroyed,
    setDestroyed,
    externalRoots,
    setExternalRoots,
    resetDestroyed,
  };
};
