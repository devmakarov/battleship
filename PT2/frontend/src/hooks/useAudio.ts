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
    [EAudio.Miss]: new Audio("/src/assets/audio/shot.mp3"),
    [EAudio.Hit]: new Audio("/src/assets/audio/hit.mp3"),
    [EAudio.Won]: new Audio("/src/assets/audio/won.mp3"),
    [EAudio.Lost]: new Audio("/src/assets/audio/lost.mp3"),
    [EAudio.GameStarted]: new Audio("/src/assets/audio/game-started.mp3"),
  });

  const playAudio = (key: EAudio) => {
    audio.current[key].currentTime = 0;
    audio.current[key].volume = 0.3;
    audio.current[key].play();
  };

  return {
    playAudio,
  };
};

export default useAudio;
