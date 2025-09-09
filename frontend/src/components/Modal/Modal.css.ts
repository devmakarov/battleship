import { style } from "@vanilla-extract/css";

export const modal = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",

  position: "fixed",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  zIndex: 2,
  backgroundColor: "#00000063",
  padding: "16px",
});

export const box = style({
  width: "100%",
  maxWidth: "420px",
  padding: "16px 8px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  background: "white",
  borderRadius: "8px",
  textAlign: "center",
});

export const typeWin = style({
  border: "4px solid  #29b40045",
});

export const typeLose = style({
  border: "4px solid #ff1111ab",
});

export const GameIsTerminated = style({
  border: "4px solid #0000007a",
});

export const title = style({
  textTransform: "uppercase",
  fontSize: "14px",
  fontWeight: "bold",
});

export const text = style({
  fontSize: "14px",
});

export const newGame = style({
  margin: "16px auto 0",
});
