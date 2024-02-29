import {
  Box,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import { Warning as WarningIcon } from "@mui/icons-material";
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
export default function House() {
  const inputRef = useRef();
  const [choose, setChoose] = useState("");
  const [unitData, setUnitData] = useState([]);
  const [kyatData, setKyatData] = useState([]);
  const [totalKyats, setTotalKyats] = useState();
  const [totalUnits, setTotalUnits] = useState();
  const [loading, setLoading] = useState(false);
  const [t, i18n] = useTranslation("translate");
  const handleChange = (event) => {
    setUnitData("");
    setKyatData("");
    setTotalKyats("");
    setTotalUnits("");
    setChoose(event.target.value);
  };
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const api = "https://embc-api-express.glitch.me/home";

  const getCalculateData = async (choose) => {
    if (choose) {
      if (unitData.length == 0 || kyatData.length == 0) {
        setLoading(true);
      }
    }
    if (!choose) return setOpen(true);
    const unit = inputRef.current.value;
    if (!unit) return false;
    inputRef.current.value = "";
    const res = await fetch(`${api}/${choose}`, {
      method: "POST",
      body: JSON.stringify({ unit }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (res.ok) setLoading(false);
    const { totalKyats, totalUnits, totalData } = data;
    if (choose === "unit") {
      setUnitData(totalData);
    } else if (choose === "kyat") {
      setKyatData(totalData);
    }
    setTotalKyats(totalKyats);
    setTotalUnits(totalUnits);
  };

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", pt: 4, color: "title.color" }}
      >
        {t("house.title")}
      </Typography>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" color={"#ffab00"}>
          <WarningIcon
            sx={{
              mr: 1,
            }}
          />
          {t("house.dialog_title")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{t("house.dialog")}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            {t("house.dialog_close")}
          </Button>
        </DialogActions>
      </Dialog>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          pt: 10,
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ minWidth: 120, my: 3 }}>
          <FormControl sx={{ width: 150, mr: 1 }}>
            <InputLabel id="demo-simple-select-label">
              {t("house.choose_type")}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={choose}
              onChange={handleChange}
            >
              <MenuItem value={"unit"}>{t("house.unit_kyat")}</MenuItem>
              <MenuItem value={"kyat"}>{t("house.kyat_unit")}</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <TextField
          autoComplete="off"
          inputRef={inputRef}
          label={t("house.value")}
          variant="standard"
          sx={{ width: 200, marginRight: 3 }}
        />
        <Button
          variant="outlined"
          color="inherit"
          sx={{ py: 2 }}
          onClick={() => getCalculateData(choose)}
        >
          {t("house.btn_text")}
        </Button>
      </Box>
      {loading && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mt: 5,
          }}
        >
          <CircularProgress />
          <Typography variant="h6" color={"#333"}>
            {t("house.loading_text")}
          </Typography>
        </Box>
      )}
      {choose == "unit" ? (
        unitData.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TableContainer sx={{ maxWidth: "80%" }}>
              <Table
                sx={{
                  bgcolor: "table.background",
                  borderRadius: 2,
                  my: 5,
                  textAlign: "center",
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bolder" }}>
                      {t("house.range")}
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bolder" }}>
                      {t("house.unit")}
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bolder" }}>
                      {t("house.kyat")}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {unitData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.range}</TableCell>
                      <TableCell>{item.perUnit}</TableCell>
                      <TableCell>{item.calculateKyat}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bolder" }}>
                      {t("house.total")}
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bolder" }}>
                      {totalUnits}
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bolder" }}>
                      {totalKyats} {t("house.kyat")}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ) : (
          <Box></Box>
        )
      ) : choose == "kyat" ? (
        kyatData.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TableContainer sx={{ maxWidth: "80%" }}>
              <Table
                sx={{
                  bgcolor: "table.background",
                  borderRadius: 2,
                  my: 5,
                  textAlign: "center",
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bolder" }}>
                      {t("house.range")}
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bolder" }}>
                      {t("house.kyat")}
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bolder" }}>
                      {t("house.unit")}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {kyatData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.range}</TableCell>
                      <TableCell>{item.kyat}</TableCell>
                      <TableCell>{item.perUnit}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bolder" }}>
                      {t("house.total")}
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bolder" }}>
                      {totalKyats}
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bolder" }}>
                      {totalUnits % 1 == 0
                        ? totalUnits
                        : Number(totalUnits).toFixed(2)}{" "}
                      {t("house.units")}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ) : (
          <Box></Box>
        )
      ) : (
        <Box></Box>
      )}
    </Box>
  );
}
