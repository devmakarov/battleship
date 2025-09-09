import * as styles from "./Ship.css.ts";

export default function ShipBlockShot() {
  return (
    <div className={styles.lines}>
      <div className={styles.linePositive}></div>
      <div className={styles.lineNegative}></div>
    </div>
  );
}
