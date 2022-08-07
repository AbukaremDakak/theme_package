import React, { createContext, useEffect, useState } from "react";
import { defaultTheme, getUsedTheme } from "../hooks/useThemes";

export const ThemeContext = createContext();

function ThemeProvider({ children, getLocalState }) {
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    const localState = getLocalState();

    if (localState.usedTheme) {
      setTheme(getUsedTheme(localState));
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
