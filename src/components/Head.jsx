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
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Header() {
  const [t, i18n] = useTranslation("translate");
  const navigate = useNavigate();
  const { setOpenDrawer } = useDrawer();
  const { mode, setMode } = useTheme();
  const [langIcon, setLangIcon] = useState("en");

  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

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

          {langIcon == "en" ? (
            <IconButton
              onClick={() => {
                setLangIcon("my");
                handleChangeLanguage("my");
              }}
            >
              <img
                src={myanmar}
                alt="Language Flag"
                title="myanmar"
                width={25}
                height={25}
              />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                setLangIcon("en");
                handleChangeLanguage("en");
              }}
            >
              <img
                src={english}
                alt="Language Flag"
                title="myanmar"
                width={25}
                height={25}
              />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
