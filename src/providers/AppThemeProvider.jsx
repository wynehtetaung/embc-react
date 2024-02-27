import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState, useMemo, useContext, createContext } from "react";

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export default function AppThemeProvider({ children }) {
  const [mode, setMode] = useState("light");
  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
        ...(mode == "light"
          ? {
              body: { background: "#b3e5fc" },
              header: { background: "#0277bd" },
              text: { color: "#039be5" },
              button: { background: "#0277bd" },
              table: { background: "#81d4fa" },
              title: { color: "#0277bd" },
            }
          : {
              header: { background: "#272727" },
              body: { background: "#757575" },
              button: { background: "#272727" },
              text: { color: "#424242" },
              table: { background: "#616161" },
              title: { color: "#272727" },
            }),
      },
    });
  }, [mode]);
  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}
