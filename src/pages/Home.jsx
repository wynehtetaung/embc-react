import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import calculate from "../assets/calculate.png";

export default function Home() {
  const navigate = useNavigate();
  const [t, i18n] = useTranslation("translate");
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingX: 8,
          paddingTop: 10,
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{ fontWeight: "400", fontSize: 80, color: "header.background" }}
          >
            <span>{t("body.text_three")}</span>
          </Typography>
          <Typography sx={{ fontSize: 60, color: "text.color" }}>
            {t("body.text_two")}{" "}
          </Typography>
          <Typography sx={{ fontSize: 60, color: "text.color" }}>
            {t("body.text_one")}
          </Typography>

          <Button
            variant="outlined"
            sx={{
              bgcolor: "button.background",
              width: 120,
              mt: 2,
              p: 1,
              color: "#fff",
            }}
            onClick={() => {
              navigate("/house");
            }}
          >
            {t("body.btn_text")}
          </Button>
        </Box>

        <img
          src={calculate}
          alt="Calculate png"
          style={{ maxWidth: 510, maxHeight: 510 }}
        />
      </Box>
    </Box>
  );
}
