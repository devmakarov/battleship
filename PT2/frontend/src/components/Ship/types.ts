import type { ShipInfo } from "../Setup/types.ts";
import type { Mode } from "../Board/enums.ts";
import type { EInTheQueue } from "../Game/types.ts";

export type Ship = { size: number; count: number };

export interface ShipProps {
  data: ShipInfo;
  mode: Mode;
  size?: number;
  position?: "relative" | "absolute";
  row?: number;
  col?: number;
  id?: string;
  isToggleAllowed?: boolean;
  isPlaying?: boolean;
  isInTheQueue?: EInTheQueue;
  disabled?: boolean;
  toggleShipPlacement?: (data: ShipDataTransfer) => boolean;
}

export type ShipDataTransfer = Omit<ShipInfo, "cellsMap"> & {
  cellsMap: string[];
  id?: string;
  row?: number;
  col?: number;
  rowOffset: number;
  colOffset: number;
};
