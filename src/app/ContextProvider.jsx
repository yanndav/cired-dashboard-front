import { useState } from "react";
import { AppContext } from "./AppContext";

const ContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  const [user, setUser] = useState({ connected: false });
  const API_URL = "http://127.0.0.1:5000";

  return (
    <AppContext.Provider value={{ theme, toggleTheme, API_URL, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};
export default ContextProvider;
