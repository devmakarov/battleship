import { createGlobalTheme } from "@vanilla-extract/css";

export const vars = createGlobalTheme(":root", {
  color: {
    main: "#303099",
    secondary: "#becaf0",

    red: "#ff0000",
    darkRed: "#ff000066",
    gray: "#858585",
    black: "#23292f",
    white: "#fff",

    cellHover: "#45cd45",

    shipBorder: "#2a6dcd",
    shipBackgroundColor: "#246ff230",

    shipDragging: "#6fc219",
    shipDraggingBackgroundColor: "#6fc21966",

    missed: "#b1adad42",
    shot: "#ffa9a4",
    pointlessToShot: "#96a1a612",
  },
});
