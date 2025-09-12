import { style } from "@vanilla-extract/css";
import { vars } from "../../theme.css.ts";

export const parent = style({
  display: "flex",
  alignItems: "center",
  gap: "10px",
});

export const ship = style({
  display: "flex",
  gap: 2,
});

export const block = style({
  width: "8px",
  height: "8px",
  backgroundColor: "#5f98e9",
});

export const destroyed = style({
  backgroundColor: vars.color.red,
});
