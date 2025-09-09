import type { ShipInfo } from "../Setup/types.ts";
import { Mode } from "./enums.ts";
import type { EInTheQueue } from "../Game/types.ts";

export interface BoardProps {
  state: number[][];
  setState: (state: number[][]) => void;
  roots: Record<string, ShipInfo>;
  mode: Mode;
  turn: boolean;
  ships?: Set<string>;
  isPlaying?: boolean;
  isInTheQueue?: EInTheQueue;
  setShips?: (ships: Set<string>) => void;
  inActive?: boolean;
  changeTurn?: () => void;
  gameId?: string;
  playerId?: string;
}
