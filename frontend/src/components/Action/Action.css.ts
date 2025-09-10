import { style } from "@vanilla-extract/css";

export const action = style({
  marginTop: "16px",

  "@media": {
    "screen and (max-width: 768px)": {
      padding: "0",
      margin: "16px 0",
      display: "flex",
      justifyContent: "center",
    },
  },
});

export const actionButton = style({
  border: "none",
  color: "#2a6dcd",
  backgroundColor: "transparent",
  fontSize: "12px",
  borderBottom: `1px solid #2a6dcd`,
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
