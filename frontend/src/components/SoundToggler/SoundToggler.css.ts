import { style } from "@vanilla-extract/css";
import { vars } from "../../theme.css.ts";

export const container = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  height: "max-content",
  minWidth: "100px",
  userSelect: "none",
  marginTop: 6,
});

export const box = style({
  width: 14,
  height: 14,
  borderRadius: 2,
  border: `2px solid ${vars.color.shipBorder}`,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: "all 160ms ease",
  background: "white",
  selectors: {
    "&:focus": {
      boxShadow: "0 0 0 4px rgba(59,130,246,0.12)",
      outline: "none",
    },
  },
  cursor: "pointer",
});

export const boxChecked = style({
  borderColor: "transparent",
  background: vars.color.shipBorder,
});

export const icon = style({
  width: 14,
  height: 14,
  display: "block",
  stroke: "white",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  transition: "transform 160ms ease, opacity 160ms ease",
});

export const labelText = style({
  fontSize: 12,
  cursor: "pointer",
  textTransform: "uppercase",
  color: vars.color.shipBorder,
});
