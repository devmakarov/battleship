import * as styles from "./ShipBlock.css.ts";
import ShipBlockShot from "./ShipBlockShot.tsx";
import { ECellValue } from "../Board/enums.ts";

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
    ${isShaking ? "shot" : ""}
    ${isShot ? "shot" : mode === "opponent" ? "" : "live"}
  `;

  return (
    <div key={index} className={blockClass}>
      {isShot && <ShipBlockShot />}
    </div>
  );
};

export default ShipBlock;
