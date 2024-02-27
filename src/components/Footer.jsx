import { Box, Typography, IconButton } from "@mui/material";
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  X as XIcon,
} from "@mui/icons-material";
export default function Footer() {
  return (
    <Box
      sx={{
        height: 109,
        bgcolor: "header.background",
        color: "#fff",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        px: 1,
      }}
    >
      <Typography variant="h5">
        &copy; Electric Meter Bill Calculation
      </Typography>
      <Box>
        <IconButton sx={{ color: "#fff" }}>
          <FacebookIcon />
        </IconButton>
        <IconButton sx={{ color: "#fff" }}>
          <XIcon />
        </IconButton>
        <IconButton sx={{ color: "#fff" }}>
          <InstagramIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
