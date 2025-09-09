import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  gap: "60px",

  "@media": {
    "screen and (max-width: 768px)": {
      gap: "24px",
      flexDirection: "column",
    },
  },
});

export const ships = style({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  paddingTop: "36px",

  "@media": {
    "screen and (max-width: 768px)": {
      display: "none",
    },
  },
});

export const shipsTitle = style({
  fontWeight: "bold",
  textTransform: "uppercase",
});

export const row = style({
  display: "flex",
  gap: "16px",
});
