import { v4 as generateId } from "uuid";
import type { IShip } from "./types.ts";

export const DEFAULT_SHIPS: IShip[][] = [
  [
    {
      data: {
        size: 4,
        placement: "horizontal",
        cellsMap: {},
        isDestroyed: false,
        neighbours: [],
        id: generateId(),
      },
    },
  ],
  [
    {
      data: {
        size: 3,
        placement: "horizontal",
        cellsMap: {},
        isDestroyed: false,
        neighbours: [],
        id: generateId(),
      },
    },
    {
      data: {
        size: 3,
        placement: "horizontal",
        cellsMap: {},
        isDestroyed: false,
        neighbours: [],
        id: generateId(),
      },
    },
  ],
  [
    {
      data: {
        size: 2,
        placement: "horizontal",
        cellsMap: {},
        isDestroyed: false,
        neighbours: [],
        id: generateId(),
      },
    },
    {
      data: {
        size: 2,
        placement: "horizontal",
        cellsMap: {},
        isDestroyed: false,
        neighbours: [],
        id: generateId(),
      },
    },
    {
      data: {
        size: 2,
        placement: "horizontal",
        cellsMap: {},
        isDestroyed: false,
        neighbours: [],
        id: generateId(),
      },
    },
  ],
  [
    {
      data: {
        size: 1,
        placement: "horizontal",
        cellsMap: {},
        isDestroyed: false,
        neighbours: [],
        id: generateId(),
      },
    },
    {
      data: {
        size: 1,
        placement: "horizontal",
        cellsMap: {},
        isDestroyed: false,
        neighbours: [],
        id: generateId(),
      },
    },
    {
      data: {
        size: 1,
        placement: "horizontal",
        cellsMap: {},
        isDestroyed: false,
        neighbours: [],
        id: generateId(),
      },
    },
    {
      data: {
        size: 1,
        placement: "horizontal",
        cellsMap: {},
        isDestroyed: false,
        neighbours: [],
        id: generateId(),
      },
    },
  ],
];

export const SHIPS_COUNT = 10;
