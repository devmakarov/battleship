import * as styles from "./Game.css.ts";
import { useOnlineStore } from "../../stores/useOnlineStore.ts";
import { useEffect } from "react";
import { useSocket } from "../../hooks/useSocket/useSocket.ts";

const GameHeader = () => {
  const { setOnOnlineUpdate } = useSocket();
  const { count, setCount } = useOnlineStore();

  useEffect(() => {
    setOnOnlineUpdate((data) => {
      setCount(data.count);
    });
  }, []);

  return (
    <div className={styles.title}>
      <h2 className={styles.titleBox}>
        Battleship
        <span className={styles.online}>{count} players online</span>
      </h2>
    </div>
  );
};

export default GameHeader;
