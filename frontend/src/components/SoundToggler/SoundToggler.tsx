import { Checkbox } from "@headlessui/react";
import * as styles from "./SoundToggler.css.ts";
import { useAudioStore } from "../../stores/useAudioStore.ts";

export default function SoundToggler() {
  const { isMuted, toggleIsMuted } = useAudioStore();

  return (
    <Checkbox
      checked={!isMuted}
      onChange={() => {
        toggleIsMuted();
      }}
      className={styles.container}
    >
      {({ checked }) => (
        <>
          <div className={`${styles.box} ${checked ? styles.boxChecked : ""}`}>
            <svg viewBox="0 0 14 14" className={styles.icon} aria-hidden>
              <path
                d="M3 8L6 11L11 3.5"
                fill="transparent"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  opacity: checked ? 1 : 0,
                  transform: checked ? "scale(1)" : "scale(0.9)",
                }}
              />
            </svg>
          </div>
          <span className={styles.labelText}>
            {checked ? "Sound on" : "Sound off"}
          </span>
        </>
      )}
    </Checkbox>
  );
}
