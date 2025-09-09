export interface GameProps {
  defaultState: number[][];
  // isPlaying: boolean;
  // setIsPlaying: (isPlaying: boolean) => void;
  // isInTheQueue: boolean;
  // setIsInTheQueue: (isInTheQueue: boolean) => void;
}

export enum EInTheQueue {
  Unset = "Unset",
  Random = "Random",
  WithFriend = "WithFriend",
}
