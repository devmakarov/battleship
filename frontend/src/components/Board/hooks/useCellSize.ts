import { useState, useLayoutEffect, type RefObject } from "react";

export const useCellSize = (
  boardRef: RefObject<HTMLElement | null>,
  cols = 10,
) => {
  const [cellSize, setCellSize] = useState<number>(0);

  useLayoutEffect(() => {
    if (!boardRef.current) return;

    const updateSize = () => {
      const rect = boardRef.current!.getBoundingClientRect();
      setCellSize(rect.width / cols);
    };

    // initial size
    updateSize();

    // observe size changes
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(boardRef.current);

    return () => resizeObserver.disconnect();
  }, [boardRef, cols]);

  return cellSize;
};
