import { useEffect } from "react";
import { withRouter } from "react-router-dom";

function ScrollToTop({ history, children }) {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    return () => {
      unlisten();
    };
  }, []);

  return { ...children };
}

export default withRouter(ScrollToTop);
