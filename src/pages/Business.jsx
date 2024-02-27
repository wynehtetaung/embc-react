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
} from "@mui/material";
import { Warning as WarningIcon } from "@mui/icons-material";
import { useState, useRef } from "react";
export default function Business() {
  const inputRef = useRef();
  const [choose, setChoose] = useState("");
  const [unitData, setUnitData] = useState([]);
  const [kyatData, setKyatData] = useState([]);
  const [totalKyats, setTotalKyats] = useState();
  const [totalUnits, setTotalUnits] = useState();
  const handleChange = (event) => {
    setChoose(event.target.value);
  };
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const api = "https://embc-api-express.glitch.me/business";

  const getCalculateData = async (choose) => {
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
    const { totalKyats, totalUnits, totalData } = data;
    if (choose === "unit") {
      setUnitData(totalData);
    } else if (choose === "kyat") {
      setKyatData(totalData);
      console.log(totalData);
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
        Business Meter Bill Calculation
      </Typography>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" color={"#ffab00"}>
          <WarningIcon />
          {" You Need!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Please Choose Type!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
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
            <InputLabel id="demo-simple-select-label">Choose Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={choose}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={"unit"}>Units to Kyats</MenuItem>
              <MenuItem value={"kyat"}>Kyats to Units</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <TextField
          autoComplete="off"
          inputRef={inputRef}
          label={
            choose === "unit"
              ? "Enter Your Units"
              : choose == "kyat"
              ? "Enter Your Kyat"
              : "Enter Your "
          }
          variant="standard"
          sx={{ width: 200, marginRight: 3 }}
        />
        <Button
          variant="outlined"
          color="inherit"
          sx={{ py: 2 }}
          onClick={() => getCalculateData(choose)}
        >
          Calculate
        </Button>
      </Box>
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
                    <TableCell sx={{ fontWeight: "bolder" }}>Range</TableCell>
                    <TableCell sx={{ fontWeight: "bolder" }}>PerUnit</TableCell>
                    <TableCell sx={{ fontWeight: "bolder" }}>
                      Cost (MMK)
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
                    <TableCell sx={{ fontWeight: "bolder" }}>Total</TableCell>
                    <TableCell sx={{ fontWeight: "bolder" }}>
                      {totalUnits}
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bolder" }}>
                      {totalKyats} MMK
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
                    <TableCell sx={{ fontWeight: "bolder" }}>Range</TableCell>
                    <TableCell sx={{ fontWeight: "bolder" }}>
                      Kyat (MMK)
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bolder" }}>PerUnit</TableCell>
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
                    <TableCell sx={{ fontWeight: "bolder" }}>Total</TableCell>
                    <TableCell sx={{ fontWeight: "bolder" }}>
                      {totalKyats}
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bolder" }}>
                      {totalUnits % 1 == 0
                        ? totalUnits
                        : Number(totalUnits).toFixed(2)}{" "}
                      Unit
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
