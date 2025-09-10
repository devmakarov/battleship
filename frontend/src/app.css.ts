import { style } from "@vanilla-extract/css";

export const title = style({
  padding: "8px 0",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const container = style({
  width: "100%",
  maxWidth: "940px",
  margin: "auto",
  padding: "0 16px",

  "@media": {
    "screen and (max-width: 768px)": {
      padding: "0 8px",
    },
  },
});
