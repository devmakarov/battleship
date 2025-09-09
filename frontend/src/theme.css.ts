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

    missed: "#8a8a8a42",
    shot: "#ffa9a4",
    pointlessToShot: "#96a1a612",
  },
});

/*
  1. fix colors +
  2. add sound when I move a ship
  3. create a game with a specific link +
  4. upload to the github
  5. current online
  6. fix mobile version +
  7. add reset position +
  8. add rules
  9. refactor Game.tsx +


  - click
  - text
  - text 2
  - rematch
  - reset state
*/
