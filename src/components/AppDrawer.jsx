import {
  Drawer,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Typography,
  Collapse,
} from "@mui/material";

import {
  Cancel as CancelIcon,
  Home as HomeIcon,
  ElectricMeter as ElectricMeterIcon,
  Info as InfoIcon,
  BatchPrediction as PredictIcon,
  Business as BusinessIcon,
  Bungalow as BungalowIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

import { useDrawer } from "../providers/DrawerProvider";
import { useNavigate } from "react-router-dom";
import profile from "../assets/embc-profile.png";

export default function AppDrawer() {
  const navigate = useNavigate();
  const { openDrawer, setOpenDrawer, listDrop, setListDrop } = useDrawer();
  return (
    <Drawer anchor="left" open={openDrawer}>
      <Box sx={{ width: 300 }}>
        <IconButton
          disableRipple
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            padding: 0,
          }}
          onClick={() => setOpenDrawer(false)}
        >
          <CancelIcon sx={{ width: 38, height: 38, color: "inherit" }} />
        </IconButton>
        <Box
          sx={{
            height: 160,
            bgcolor: "header.background",
            textAlign: "center",
            paddingTop: 5,
          }}
        >
          <img src={profile} alt="embc profile" />
          <Typography variant="h6" sx={{ color: "text.color", paddingTop: 1 }}>
            Electric Meter Bill Calculation
          </Typography>
        </Box>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              sx={{ paddingLeft: 4 }}
              onClick={() => {
                navigate("/");
                setOpenDrawer(false);
              }}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              sx={{ paddingLeft: 4 }}
              onClick={() => {
                setListDrop(!listDrop);
              }}
            >
              <ListItemIcon>
                <ElectricMeterIcon />
              </ListItemIcon>
              <ListItemText primary="Meter" />
              {listDrop ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
          </ListItem>
          <ListItem>
            <Collapse in={listDrop} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => {
                      navigate("/house");
                      setOpenDrawer(false);
                    }}
                  >
                    <ListItemIcon>
                      <BungalowIcon />
                    </ListItemIcon>
                    <ListItemText primary="House Use" />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => {
                      navigate("/business");
                      setOpenDrawer(false);
                    }}
                  >
                    <ListItemIcon>
                      <BusinessIcon />
                    </ListItemIcon>
                    <ListItemText primary="Business Use" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Collapse>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton sx={{ paddingLeft: 4 }}>
              <ListItemIcon>
                <PredictIcon />
              </ListItemIcon>
              <ListItemText primary="Predict" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton sx={{ paddingLeft: 4 }}>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
