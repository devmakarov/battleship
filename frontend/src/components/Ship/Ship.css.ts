import { style, keyframes } from "@vanilla-extract/css";
import { vars } from "../../theme.css.ts";

export const ship = style({
  width: "var(--cell-width, 100%)",
  height: "var(--cell-height, 100%)",
  margin: "-1px",
  border: `2px solid ${vars.color.shipBorder}`,
  borderRadius: "4px",
  cursor: "move",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  selectors: {
    "&.disabled": {
      opacity: "0.5",
      cursor: "unset",
    },

    "&.absolute": {
      position: "absolute",
      left: 0,
      top: 0,
      zIndex: 1,
    },

    "&.dragging": {
      border: `2px solid ${vars.color.shipDragging}`,
    },

    "&.vertical": {
      flexDirection: "column",
    },

    "&.destroyed": {
      border: `2px solid ${vars.color.red}`,
    },

    "&.shake": {
      border: `2px solid ${vars.color.red}`,
    },

    "&.opponent": {
      borderColor: "transparent",
    },

    "&.readOnly": {
      cursor: "unset",
    },
  },
});

const shakeKeyframes = keyframes({
  "0%": { transform: "translateX(0)" },
  "10%": { transform: "translateX(-5px)" },
  "20%": { transform: "translateX(5px)" },
  "30%": { transform: "translateX(-5px)" },
  "40%": { transform: "translateX(5px)" },
  "50%": { transform: "translateX(-5px)" },
  "60%": { transform: "translateX(5px)" },
  "70%": { transform: "translateX(-5px)" },
  "80%": { transform: "translateX(5px)" },
  "90%": { transform: "translateX(-5px)" },
  "100%": { transform: "translateX(0)" },
});

export const shake = style({
  animation: `${shakeKeyframes} 0.5s ease-in-out`,
  border: `2px solid ${vars.color.red}`,
});

export const lines = style({
  width: "100%",
  height: "100%",
  position: "absolute",
  inset: 0,
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const linePositive = style({
  width: "150%",
  height: "2px",
  backgroundColor: vars.color.red,
  transform: "rotate(45deg)",
  position: "absolute",
});

export const lineNegative = style({
  width: "150%",
  height: "2px",
  backgroundColor: vars.color.red,
  transform: "rotate(-45deg)",
  position: "absolute",
});
