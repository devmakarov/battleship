import { style } from "@vanilla-extract/css";
import { vars } from "../../theme.css.ts";

export const shipBlock = style({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden",

  selectors: {
    "&.live": {
      backgroundColor: vars.color.shipBackgroundColor,
    },

    "&.shot": {
      backgroundColor: vars.color.darkRed,
    },

    "&.dragging": {
      backgroundColor: vars.color.shipDraggingBackgroundColor,
    },

    "&.shaking": {
      backgroundColor: vars.color.darkRed,
    },
  },
});
