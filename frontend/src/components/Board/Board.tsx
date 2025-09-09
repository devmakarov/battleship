import * as styles from "./Board.css";
import { type DragEvent, Fragment, useRef } from "react";
import { ECellValue, Mode } from "./enums.ts";
import { useBoardValidation } from "./hooks/useBoardValidation.ts";
import { useSocket } from "../../hooks/useSocket/useSocket.ts";
import type { BoardProps } from "./types.ts";
import Ship from "../Ship/Ship.tsx";
import ShipBlockShot from "../Ship/ShipBlockShot.tsx";
import { useCellSize } from "./hooks/useCellSize.ts";
import type { ShipDataTransfer } from "../Ship/types.ts";
import { EInTheQueue } from "../Game/types.ts";

const CAPITALIZE_LETTER_A_INDEX = 65;

export const Board = ({
  state,
  setState,
  roots,
  ships,
  setShips,
  mode,
  isPlaying = false,
  isInTheQueue = EInTheQueue.Unset,
  inActive = false,
  turn,
  gameId = "",
  playerId = "",
}: BoardProps) => {
  const boardRef = useRef<HTMLDivElement>(null);
  const size = useCellSize(boardRef, 10);

  const { isNextStateValid } = useBoardValidation(state);
  const { socket } = useSocket();

  const onDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const data = JSON.parse(
      event.dataTransfer.getData("application/json"),
    ) as unknown as ShipDataTransfer;

    const boardRect = (
      event.currentTarget.closest(`.${styles.grid}`) as HTMLDivElement
    ).getBoundingClientRect();

    const mouseX = event.clientX - boardRect.left;
    const mouseY = event.clientY - boardRect.top;

    let row = Math.floor(mouseY / size) - data.rowOffset!;
    let col = Math.floor(mouseX / size) - data.colOffset!;

    row = Math.max(
      0,
      Math.min(row, 10 - (data.placement === "vertical" ? data.size : 1)),
    );
    col = Math.max(
      0,
      Math.min(col, 10 - (data.placement === "horizontal" ? data.size : 1)),
    );

    changeShipPlacement(row, col, data, false);
  };

  const changeShipPlacement = (
    row: number,
    col: number,
    data: ShipDataTransfer,
    changePlacement: boolean,
  ) => {
    const [isValid, nextState] = isNextStateValid(
      row,
      col,
      data,
      changePlacement,
    );

    if (isValid) {
      setState(nextState);

      if (data.id && ships && setShips) {
        const newShips = new Set(ships);
        newShips.add(data.id);
        setShips(newShips);
      }

      return true;
    }

    return false;
  };

  const toggleShipPlacement = (data: ShipDataTransfer) => {
    return changeShipPlacement(data.row!, data.col!, data, true);
  };

  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (mode === Mode.Myself) {
      return;
    }

    if (mode === Mode.Opponent && !turn) {
      return;
    }

    if (isInTheQueue !== EInTheQueue.Unset) {
      return;
    }

    const boardRect = (
      event.currentTarget.closest(`.${styles.grid}`) as HTMLDivElement
    ).getBoundingClientRect();

    const offsetY = 2;
    const offsetX = 0;

    const mouseX = event.clientX - boardRect.left + offsetX;
    const mouseY = event.clientY - boardRect.top + offsetY;

    const row = Math.floor(mouseY / size);
    const col = Math.floor(mouseX / size);

    if (
      state[row][col] !== ECellValue.Live &&
      state[row][col] !== ECellValue.Empty
    ) {
      return;
    }

    socket?.emit("game.move", { gameId, playerId, row, col });
  };

  function hasKey<T>(obj: Record<string, T>, key: string): boolean {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }

  function getKey<T>(obj: Record<string, T>, key: string): T | undefined {
    return obj[key];
  }

  return (
    <div
      className={`
        ${styles.board} 
        ${
          inActive ||
          (isPlaying && mode === Mode.Myself && turn) ||
          (isPlaying && mode === Mode.Opponent && !turn)
            ? styles.boardOpacity
            : ""
        }`}
    >
      <div className={styles.boardHead}>
        <div className={styles.title}></div>
        {state.map((_, rowIndex) => (
          <div key={rowIndex} className={styles.title}>
            {String.fromCharCode(rowIndex + CAPITALIZE_LETTER_A_INDEX)}
          </div>
        ))}
      </div>

      <div className={styles.boardBody}>
        <div className={styles.boardBodyRows}>
          {state.map((_, rowIndex) => (
            <div key={rowIndex} className={styles.title}>
              {rowIndex + 1}
            </div>
          ))}
        </div>

        <div className={styles.grid} ref={boardRef}>
          {state.map((row, rowIndex) => (
            <Fragment key={rowIndex}>
              {row.map((_, colIndex) => (
                <div
                  key={colIndex}
                  className={styles.cell}
                  onDragOver={onDragOver}
                  onDrop={onDrop}
                  data-row={rowIndex}
                  data-col={colIndex}
                  onClick={onClick}
                >
                  {hasKey(roots, `${rowIndex},${colIndex}`) && (
                    <Ship
                      key={`${getKey(roots, `${rowIndex},${colIndex}`)!.id}`}
                      position="absolute"
                      data={getKey(roots, `${rowIndex},${colIndex}`)!}
                      row={rowIndex}
                      col={colIndex}
                      isToggleAllowed={true}
                      toggleShipPlacement={toggleShipPlacement}
                      mode={mode}
                      isPlaying={isPlaying}
                      isInTheQueue={isInTheQueue}
                      size={size}
                    />
                  )}

                  {mode === Mode.Opponent &&
                  state[rowIndex][colIndex] === ECellValue.Shot ? (
                    <div className={styles.cellShot}>
                      <ShipBlockShot />
                    </div>
                  ) : null}

                  {state[rowIndex][colIndex] === ECellValue.Miss ? (
                    <div className={styles.missedBox}>
                      <div className={styles.missedShot}></div>
                    </div>
                  ) : null}

                  {state[rowIndex][colIndex] === ECellValue.Pointless ? (
                    <div className={styles.pointlessToShotBox}>
                      <div className={styles.missedShot}></div>
                    </div>
                  ) : null}

                  {state[rowIndex][colIndex] === ECellValue.Live ||
                  state[rowIndex][colIndex] === ECellValue.Empty ? (
                    <div
                      className={`${isPlaying && mode === Mode.Opponent && turn ? styles.cellHover : ""}`}
                    ></div>
                  ) : null}
                </div>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
