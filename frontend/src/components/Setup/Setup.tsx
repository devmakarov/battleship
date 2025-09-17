import * as styles from "./Setup.css.ts";
import { useEffect, useMemo } from "react";

import { Mode } from "../Board/enums.ts";
import { useBoardState } from "../Board/hooks/useBoardState.ts";
import { DEFAULT_SHIPS, SHIPS_COUNT } from "./constants.ts";
import type { PositionSetupProps } from "./types.ts";

import Ship from "../Ship/Ship.tsx";
import { EInTheQueue } from "../Game/types.ts";

const Setup = ({ onReady, state: parentState, ships }: PositionSetupProps) => {
  const { state, setState, roots } = useBoardState(); // todo: get rid of that state

  const isCompleted = useMemo(() => {
    return Object.values(roots).length === SHIPS_COUNT;
  }, [roots]);

  useEffect(() => {
    if (isCompleted) {
      setTimeout(() => {
        onReady(state);
      }, 1000);
    }
  }, [isCompleted, onReady, state, roots]);

  useEffect(() => {
    if (parentState.length) {
      const copy = parentState.map((row) => [...row]);
      setState(copy);
    }
  }, [parentState, setState]);

  return (
    <div className={styles.container}>
      <div className={styles.ships}>
        <p className={styles.shipsTitle}>Set up your position</p>

        {DEFAULT_SHIPS.map((shipsByGroup, index) => (
          <div key={index} className={styles.row}>
            {shipsByGroup.map((ship) => (
              <Ship
                key={ship.data.id}
                data={ship.data}
                id={ship.data.id}
                disabled={ships.has(ship.data.id) || isCompleted}
                mode={Mode.Myself}
                isInTheQueue={EInTheQueue.Unset}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Setup;
