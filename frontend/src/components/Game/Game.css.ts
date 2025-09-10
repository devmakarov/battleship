import { style } from "@vanilla-extract/css";
import { vars } from "../../theme.css.ts";

export const app = style({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  justifyContent: "center",
  padding: "45px 0",

  "@media": {
    "screen and (max-width: 768px)": {
      minHeight: "auto",
      padding: 0,
    },
  },
});

export const view = style({
  padding: "30px 8px",
  backgroundColor: vars.color.white,
  position: "relative",
  borderRadius: "6px",
  boxShadow: "rgba(149, 157, 165, 0.15) 0px 8px 24px",

  "@media": {
    "screen and (max-width: 768px)": {
      marginTop: "60px",
      padding: "16px 0",
      order: 2,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  },
});

export const game = style({
  display: "flex",
  gap: "60px",
  order: 1,
  width: "100%",
  padding: "0 8px",

  "@media": {
    "screen and (max-width: 768px)": {
      order: 2,
      flexDirection: "column",
      gap: "16px",
    },
  },
});

export const gameActions = style({
  marginTop: "30px",
  display: "flex",
  gap: "30px",
  padding: "0 36px",

  "@media": {
    "screen and (max-width: 768px)": {
      padding: "0 8px",
      gap: "16px",
    },
  },
});

export const playerBox = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

export const playerBoxTitle = style({
  textTransform: "uppercase",
  fontSize: "12px",
  color: vars.color.gray,
  textAlign: "center",
  fontStyle: "italic",
});

export const boardWrapper = style({
  position: "relative",
});

export const boardOverflow = style({
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  zIndex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const title = style({
  fontStyle: "italic",
  position: "absolute",
  top: "-45px",
  left: "15px",
});

export const boardPreview = style({
  width: "100%",
});

export const playModes = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  justifyContent: "center",
  alignItems: "center",
});

export const boardChooseTheOpponent = style({
  fontSize: "14px",
  marginBottom: "16px",
  textTransform: "uppercase",
  fontStyle: "italic",
  textAlign: "center",
  // fontWeight: "bold",
});
