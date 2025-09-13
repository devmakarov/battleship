import type { DestroyedProps } from "./types.ts";
import { useCallback, useState } from "react";
import * as styles from "./Destroyed.css.ts";

export default function Destroyed({
  size,
  count,
  capacity,
  gap,
}: DestroyedProps) {
  const [ships] = useState(new Array(capacity).fill(0));

  const ship = useCallback(
    (index: number) => {
      return (
        <>
          {new Array(size).fill(0).map((_, i) => (
            <div
              key={`${size}-${i}`}
              className={`${styles.block} ${index + 1 <= count ? styles.destroyed : ""}`}
            ></div>
          ))}
        </>
      );
    },
    [size, count],
  );

  return (
    <div className={styles.parent} style={{ gap }}>
      {ships.map((_, index) => (
        <div className={styles.ship} key={index}>
          {ship(index)}
        </div>
      ))}
    </div>
  );
}
