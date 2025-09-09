import * as styles from "../../app.css.ts";
import * as headerStyles from "./Header.css.ts";

const Header = () => {
  return (
    <header className={headerStyles.header}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>Battleship</h2>
        </div>
      </div>
    </header>
  );
};

export default Header;
