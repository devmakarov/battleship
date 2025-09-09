import { useLayoutEffect, useState } from "react";

export function useIsMobile(MOBILE_BREAKPOINT = 768) {
  const getIsMobile = () =>
    typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT;

  const [isMobile, setIsMobile] = useState<boolean>(getIsMobile());

  useLayoutEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    mql.addEventListener("change", onChange);

    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    return () => {
      mql.removeEventListener("change", onChange);
    };
  }, [MOBILE_BREAKPOINT]);

  return !!isMobile;
}
