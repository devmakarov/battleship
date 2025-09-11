import { style } from "@vanilla-extract/css";
import { vars } from "../../theme.css.ts";

export const action = style({
  "@media": {
    "screen and (max-width: 768px)": {
      padding: "0",
      // margin: "5px 0",
      display: "flex",
      justifyContent: "center",
    },
  },
});

export const actionButton = style({
  border: "none",
  color: vars.color.shipBorder,
  backgroundColor: "transparent",
  fontSize: "12px",
  borderBottom: `1px solid ${vars.color.shipBorder}`,
  padding: "2px 8px",
  textTransform: "uppercase",
  cursor: "pointer",
  transition: ".3s background ease-in-out",
  textAlign: "center",

  selectors: {
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.6,
    },
  },

  "@media": {
    "screen and (max-width: 768px)": {
      fontSize: "11px",
    },
  },
});
