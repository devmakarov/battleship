import * as React from "react";
import { type DragEvent, useMemo, useState } from "react";
import * as styles from "./Ship.css.ts";

import { useIsMobile } from "../../hooks/useIsMobile.ts";
import type { ShipDataTransfer, ShipProps } from "./types.ts";
import ShipBlock from "./ShipBlock.tsx";
import { EInTheQueue } from "../Game/types.ts";

const DEFAULT_SHIP_SIZE = 36;

const Ship = (props: ShipProps) => {
  const [isShaking, setIsShaking] = useState(false);
  const [placement] = useState(props.data.placement);
  const [isDragging, setIsDragging] = useState(false);

  const size = props.size ?? DEFAULT_SHIP_SIZE;
  const isMobile = useIsMobile();
  const isDraggable = useMemo(
    () =>
      !props.disabled &&
      !props.isPlaying &&
      props.isInTheQueue === EInTheQueue.Unset &&
      !isMobile,
    [props.isPlaying, props.disabled, props.isInTheQueue, isMobile],
  );

  const cellStyles = useMemo(() => {
    return {
      "--cell-height":
        placement === "horizontal"
          ? `${size}px`
          : `${props.data.size * size}px`,
      "--cell-width":
        placement === "horizontal"
          ? `${props.data.size * size}px`
          : `${size}px`,
    } as React.CSSProperties;
  }, [props.data.size, size, placement]);

  const shipBlocks = [...Array(props.data.size)].map((_, i) => {
    const row = props.row! + (placement === "vertical" ? i : 0);
    const col = props.col! + (placement === "horizontal" ? i : 0);
    const key = `${row},${col}`;
    const cellValue = props.data.cellsMap?.[key];

    return (
      <ShipBlock
        key={i}
        index={i}
        row={row}
        col={col}
        cellValue={cellValue}
        isDragging={isDragging}
        isShaking={isShaking}
        mode={props.mode}
      />
    );
  });

  const prepareShipInfo = ({
    rowOffset,
    colOffset,
  }: {
    rowOffset: number;
    colOffset: number;
  }) => {
    const item: ShipDataTransfer = {
      row: props.row,
      col: props.col,
      rowOffset,
      colOffset,
      ...props.data,
      cellsMap: props.data.cellsMap
        ? Object.keys(props.data.cellsMap)
        : ([] as string[]),
      id: props.id!,
    };

    return item;
  };

  const toggleDirection = () => {
    if (!isDraggable || !props.isToggleAllowed || !props.toggleShipPlacement) {
      return;
    }

    const isToggled = props.toggleShipPlacement(
      prepareShipInfo({
        rowOffset: 0,
        colOffset: 0,
      }),
    );

    if (!isToggled) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    setIsDragging(true);

    const rect = (event.target as HTMLDivElement).getBoundingClientRect();

    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    const colOffset = Math.floor(offsetX / size);
    const rowOffset = Math.floor(offsetY / size);

    event.dataTransfer.setData(
      "application/json",
      JSON.stringify(
        prepareShipInfo({
          rowOffset,
          colOffset,
        }),
      ),
    );
  };

  const onDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      draggable={isDraggable}
      style={cellStyles}
      className={`
        ${styles.ship} 
        ${props.position}
        ${placement} 
        
        ${props.mode === "opponent" && !props.data.isDestroyed ? "opponent" : ""}
        ${props.disabled ? "disabled" : ""}
        ${!isDraggable ? "readOnly" : ""}
        ${props.data.isDestroyed ? "destroyed" : ""} 
        ${isDragging ? "dragging" : ""}
        ${isShaking ? styles.shake : ""}
      `}
      data-size={props.data.size}
      data-row={props.row}
      data-col={props.col}
      onClick={toggleDirection}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      {shipBlocks}
    </div>
  );
};

export default Ship;
