import * as footerStyles from "./Footer.css.ts";
import * as styles from "../../app.css.ts";

const Footer = () => (
  <footer className={footerStyles.footer}>
    <div className={`${styles.container} ${footerStyles.footerBox} `}>
      <p>Copyright © 2025 - All rights reserved</p>

      <p className={footerStyles.promo}>
        made with ❤️ by{" "}
        <a className={footerStyles.link} href="https://devmakarov.space/">
          @devmakarov
        </a>
      </p>
    </div>
  </footer>
);

export default Footer;
