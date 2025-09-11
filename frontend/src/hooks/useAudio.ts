import { useRef } from "react";
import { useAudioStore } from "../stores/useAudioStore.ts";

export enum EAudio {
  Miss = "Miss",
  Hit = "Hit",
  Won = "Won",
  Lost = "Lost",
  GameStarted = "GameStarted",
}

export function useAudio() {
  const { isMuted } = useAudioStore();

  const audio = useRef({
    [EAudio.Miss]: new Audio("/audio/shot.mp3"),
    [EAudio.Hit]: new Audio("/audio/hit.mp3"),
    [EAudio.Won]: new Audio("/audio/won.mp3"),
    [EAudio.Lost]: new Audio("/audio/lost.mp3"),
    [EAudio.GameStarted]: new Audio("/audio/game-started.mp3"),
  });

  const playAudio = (key: EAudio) => {
    const currentAudio = audio.current[key];
    currentAudio.muted = isMuted;
    currentAudio.currentTime = 0;
    currentAudio.volume = 0.3;
    currentAudio.play().catch((e) => console.log("Audio play error:", e));
  };

  return { playAudio };
}
