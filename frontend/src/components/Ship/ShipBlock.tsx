import * as styles from "./ShipBlock.css.ts";
import { ECellValue } from "../Board/enums.ts";
import { memo } from "react";

const ShipBlock = ({
  index,
  cellValue,
  isDragging,
  isShaking,
  mode,
}: {
  index: number;
  row: number;
  col: number;
  isDragging: boolean;
  isShaking: boolean;
  mode: string;
  cellValue?: number;
}) => {
  const isShot = cellValue === ECellValue.Shot;

  const blockClass = `
    ${styles.shipBlock}
    ${isDragging ? "dragging" : ""}
    ${isShaking ? "shaking" : ""}
    ${isShot ? "shot" : mode === "opponent" ? "" : "live"}
  `;

  return <div key={index} className={blockClass}></div>;
};

export default memo(ShipBlock);
