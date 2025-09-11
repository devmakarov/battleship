import { style } from "@vanilla-extract/css";
import { vars } from "../../theme.css.ts";

export const button = style({
  width: "100%",
  color: vars.color.black,
  border: "none",
  cursor: "pointer",
  textTransform: "uppercase",
  transition: ".3s background ease-in-out",
  padding: "8px",
  borderRadius: "4px",
  fontSize: "14px",

  selectors: {
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.6,
    },
  },
});

export const small = style({
  maxWidth: "120px",
});

export const medium = style({
  maxWidth: "160px",
});

export const large = style({
  maxWidth: "220px",
});

export const main = style({
  background: "linear-gradient(135deg, #97c2ff, #3b82f6)",
  backgroundSize: "200% 200%",
  transition: " background-position 0.5s ease",
  color: vars.color.black,
  width: "100%",
  // maxWidth: "120px",
  boxShadow: "rgba(149, 157, 165, 0.15) 0px 8px 24px",

  ":hover": {
    backgroundPosition: "right center",
  },
});

export const green = style({
  background: "linear-gradient(135deg, #bcffaf, #3ed858)",
  backgroundSize: "200% 200%",
  transition: "background-position 0.5s ease",
  color: vars.color.black,
  width: "100%",
  boxShadow: "rgba(149, 157, 165, 0.15) 0px 8px 24px",

  ":hover": {
    backgroundPosition: "right center",
  },
});

export const modal = style({
  background: "#d6d6f71",
  border: `2px solid ${vars.color.shipBorder}`,
  margin: "16px auto 0",
  fontSize: "14px",

  ":hover": {
    background: "#becaf08c",
  },
});
