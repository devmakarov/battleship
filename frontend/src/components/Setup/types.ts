export type ShipInfo = {
  size: number;
  placement: "horizontal" | "vertical";
  cellsMap: Record<string, number>;
  isDestroyed: boolean;
  neighbours: [number, number][];
  id: string;
};

export interface PositionSetupProps {
  state: number[][];
  onReady: (state: number[][]) => void;
  ships: Set<string>;
}

export interface IShip {
  data: ShipInfo;
}
