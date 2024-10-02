import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  // Extracts pathname property(key) from an object
  const { pathname } = useLocation();

  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    if (isMobile) {
      window.scrollTo(0, 0);
    }
  }, [pathname, isMobile]);

  return null;
};

export { ScrollToTop };
