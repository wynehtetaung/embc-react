import { Box, Container } from "@mui/material";
import Header from "./components/Head";
import AppDrawer from "./components/AppDrawer";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <Box>
      <AppDrawer />
      <Header />
      <Container
        maxWidth="xl"
        sx={{ bgcolor: "body.background", minHeight: "100vh" }}
      >
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
}
