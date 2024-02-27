import { AppBar, Toolbar, Box, IconButton, Typography } from "@mui/material";
import {
  Menu as MenuIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDrawer } from "../providers/DrawerProvider";
import { useTheme } from "../providers/AppThemeProvider";
import logo from "../assets/logo.png";
import myanmar from "../assets/myanmar-flag.svg";
import english from "../assets/united-states-flag.svg";

export default function Header() {
  const navigate = useNavigate();
  const { openDrawer, setOpenDrawer } = useDrawer();
  const { mode, setMode } = useTheme();
  return (
    <AppBar position="static" sx={{ bgcolor: "header.background" }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton color="inherit" onClick={() => setOpenDrawer(true)}>
          <MenuIcon />
        </IconButton>

        <img
          src={logo}
          alt="embc logo"
          width={30}
          height={30}
          onClick={() => {
            navigate("/");
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {mode === "light" ? (
            <IconButton
              color="inherit"
              onClick={() => {
                setMode("dark");
              }}
            >
              <DarkModeIcon titleAccess="dark" />
            </IconButton>
          ) : (
            <IconButton
              color="inherit"
              onClick={() => {
                setMode("light");
              }}
            >
              <LightModeIcon titleAccess="light" />
            </IconButton>
          )}

          <IconButton>
            <img
              src={myanmar}
              alt="Language Flag"
              title="myanmar"
              width={25}
              height={25}
            />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
