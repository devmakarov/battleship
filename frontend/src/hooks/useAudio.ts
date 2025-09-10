import { useRef } from "react";

export enum EAudio {
  Miss = "Miss",
  Hit = "Hit",
  Won = "Won",
  Lost = "Lost",
  GameStarted = "GameStarted",
}

const useAudio = () => {
  const audio = useRef({
    [EAudio.Miss]: new Audio("/audio/shot.mp3"),
    [EAudio.Hit]: new Audio("/audio/hit.mp3"),
    [EAudio.Won]: new Audio("/audio/won.mp3"),
    [EAudio.Lost]: new Audio("/audio/lost.mp3"),
    [EAudio.GameStarted]: new Audio("/audio/game-started.mp3"),
  });

  const playAudio = (key: EAudio) => {
    const a = audio.current[key];
    a.currentTime = 0;
    a.volume = 0.3;
    a.play().catch((e) => console.log("Audio play error:", e));
  };

  return { playAudio };
};

export default useAudio;
