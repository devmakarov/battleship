import { style } from "@vanilla-extract/css";
import { vars } from "../../theme.css.ts";

export const promo = style({
  "@media": {
    "screen and (max-width: 768px)": {
      marginTop: "16px",
    },
  },
});

export const link = style({
  color: vars.color.black,
  textDecoration: "none",
  fontWeight: "600",
});

export const footer = style({
  background: "linear-gradient(135deg, #97c2ff, #c1dcff)",
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  padding: "8px 0px",

  "@media": {
    "screen and (max-width: 768px)": {
      marginTop: "36px",
      position: "relative",
    },
  },
});

export const footerBox = style({
  display: "flex",
  justifyContent: "space-between",
  fontSize: "14px",

  "@media": {
    "screen and (max-width: 768px)": {
      flexDirection: "column",
      fontSize: "12px",
    },
  },
});
