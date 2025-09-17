import { style } from "@vanilla-extract/css";
import { vars } from "../../theme.css.ts";

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(10, 1fr)",
  width: "100%",
  maxWidth: "360px",
  margin: "0 auto",

  borderLeft: `1px solid ${vars.color.secondary}`,
  borderTop: `1px solid ${vars.color.secondary}`,
});

export const cell = style({
  aspectRatio: "1 / 1",
  borderRight: `1px solid ${vars.color.secondary}`,
  borderBottom: `1px solid ${vars.color.secondary}`,
  position: "relative",
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const cellHover = style({
  position: "absolute",
  inset: "-1px",
  zIndex: 1,
  border: `2px solid transparent`,

  ":hover": {
    cursor: "pointer",
    border: `2px solid ${vars.color.cellHover}`,
  },

  "@media": {
    "screen and (max-width: 768px)": {
      ":hover": {
        cursor: "pointer",
        border: `2px solid transparent`,
      },
    },
  },
});

export const boardBody = style({
  display: "flex",
});

export const board = style({});

export const boardOpacity = style({
  opacity: 0.25,
});

export const boardHead = style({
  display: "flex",
  opacity: 0.5,

  "@media": {
    "screen and (max-width: 768px)": {
      display: "none",
    },
  },
});

export const boardBodyRows = style({
  display: "block",
  opacity: 0.5,

  "@media": {
    "screen and (max-width: 768px)": {
      display: "none",
    },
  },
});

export const title = style({
  width: "36px",
  height: "36px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px",
});

export const missedBox = style({
  backgroundColor: vars.color.missed,
});

export const pointlessToShot = style({
  backgroundColor: vars.color.pointlessToShot,
});

export const missedShot = style({
  width: "4px",
  height: "4px",
  borderRadius: "50%",
  backgroundColor: vars.color.gray,
});

export const prevShot = style({
  backgroundColor: vars.color.prevShot,
});

export const cellShot = style({
  backgroundColor: vars.color.shot,
});

export const destroyed = style({
  maxWidth: "400px",
  width: "100%",
  paddingLeft: "36px",
  margin: "0 auto 8px",
  visibility: "visible",

  "@media": {
    "screen and (max-width: 768px)": {
      paddingLeft: 0,
    },
  },
});

export const destroyedHidden = style({
  visibility: "hidden",
});

export const destroyedContainer = style({
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "row-reverse",
});
