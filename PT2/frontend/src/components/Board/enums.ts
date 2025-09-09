export const Mode = {
  Myself: "myself",
  Opponent: "opponent",
} as const;

export type Mode = (typeof Mode)[keyof typeof Mode];

export enum ECellValue {
  Empty = 0,
  Live = 1,
  Shot = 2,
  Miss = 3,
  Pointless = 4,
}
