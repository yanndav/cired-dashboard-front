import { useState, useEffect } from "react";
import { AppContext } from "./AppContext";

const ContextProvider = ({ children }) => {
  // THEME OPTIONS
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  // USER CONNEXION OPTIONS
  const [user, setUser] = useState({ connected: false });
  // API URL
  const API_URL = window.REACT_API_URL;

  // SCREEN SIZE
  const useWindowDimensions = () => {
    const getWindowDimensions = () => ({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );

    useEffect(() => {
      const handleResize = () => setWindowDimensions(getWindowDimensions());
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
  };

  const { width, height } = useWindowDimensions();

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        API_URL,
        user,
        setUser,
        width,
        height,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default ContextProvider;
