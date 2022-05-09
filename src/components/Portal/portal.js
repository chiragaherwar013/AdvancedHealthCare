import { React, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/userContext";
import MedicineData from "./Medicine.json";
import { useSnackbar } from "notistack";

// MUI Components
import { Stack, Paper, Typography, Avatar } from "@mui/material";
import { Grid, Divider, Chip, Button, Alert } from "@mui/material";

import TimeIcon from "@mui/icons-material/MoreTime";
const Care = (props) => {
  return (
    <Grid
      container
      spacing={2}
      justifyContent="space-evenly"
      alignItems="center"
      sx={{ marginLeft: "-16px !important" }}
    >
      {MedicineData.map((data) => {
        if (data.medicineType === props.type) {
          return (
            <Grid item xs={6} sm={4} md={4} lg={2} sx={{ height: 100 }}>
              <Paper elevation={3} sx={{ height: "100%" }}>
                <Stack
                  sx={{ padding: "10px", height: "100%" }}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Avatar
                    src={props.img}
                    alt={props.type}
                    sx={{ height: 40, width: 40 }}
                  />
                  <Stack
                    spacing={1}
                    sx={{ height: "100%" }}
                    justifyContent="space-between"
                    alignItems="flex-end"
                  >
                    <Typography variant="caption">
                      <strong>{data.medicineName}</strong>
                    </Typography>
                    <Chip
                      color="info"
                      size="small"
                      label={data.medicineQty}
                      sx={{ width: 50 }}
                    />
                  </Stack>
                </Stack>
              </Paper>
            </Grid>
          );
        }
      })}
    </Grid>
  );
};

const Portal = () => {
  const [user, setUser] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const handleUpdate = () => {
    setIsLoading(true);
    setTimeout(() => {
      enqueueSnackbar("Updated medicines", { variant: "success" });
      setIsLoading(false);
    }, 2000);
  };
  return (
    <>
      {!user ? (
        <Alert severity="error">
          Please Login with Your Provided College Id to access this Portal{" "}
        </Alert>
      ) : (
        <Stack sx={{ minHeight: "80vh", padding: "16px" }} spacing={2}>
          <Stack direction="row" justifyContent="space-evenly">
            <Paper
              elevation={3}
              sx={{
                padding: "10px",
                minWidth: 300,
                backgroundColor: "rgb(52, 86, 139)",
                color: "white",
              }}
            >
              <Stack justifyContent="center" alignItems="center" spacing={1}>
                <Avatar src="" alt="doctor" sx={{ height: 100, width: 100 }} />
                <Typography variant="body1">
                  <strong>Dr. ABC</strong>
                </Typography>
                <Typography variant="body2">
                  <strong>Contact</strong>
                </Typography>
                <Typography variant="caption">01125532553</Typography>
              </Stack>
            </Paper>
            <Paper
              elevation={3}
              sx={{
                padding: "10px",
                minWidth: 300,
                backgroundColor: "rgb(52, 86, 139)",
                color: "white",
              }}
            >
              <Stack justifyContent="center" alignItems="center" spacing={1}>
                <Avatar src="" alt="doctor" sx={{ height: 100, width: 100 }} />
                <Typography variant="body1">
                  <strong>Ms. Deepika</strong>
                </Typography>
                <Typography variant="body2">
                  <strong>Contact</strong>
                </Typography>
                <Typography variant="caption">7987316503</Typography>
              </Stack>
            </Paper>
            <Paper
              elevation={3}
              sx={{
                padding: "10px",
                minWidth: 300,
                backgroundColor: "#f54242",
                color: "white",
              }}
            >
              <Stack justifyContent="center" alignItems="center" spacing={1}>
                <Typography variant="body1">
                  <strong>Emergency</strong>
                </Typography>
                <Typography variant="body2">
                  <strong>Contacts</strong>
                </Typography>
                <Typography variant="caption">+91 - 9810181256</Typography>
                <Typography variant="caption">+91 - 9868247231</Typography>
                <Typography variant="caption">+91 - 9993380480</Typography>
                <Typography variant="caption">+91 - 8770180714</Typography>
              </Stack>
            </Paper>
            <Button
              variant="contained"
              color="primary"
              startIcon={<TimeIcon />}
              onClick={() => navigate("/appointment")}
            >
              Book Appointment
            </Button>
          </Stack>
          <Typography textAlign="center" variant="h4">
            Available Medicinal Care
          </Typography>
          <Stack
            divider={<Divider orientation="horizontal" flexItem />}
            spacing={2}
          >
            <Care type="Tablet" img="/images/medicine.png" />
            <Care type="Injection" img="/images/syringe.png" />
            <Care type="Cream" img="/images/cream.png" />
          </Stack>
          <Button variant="outlined" color="warning" onClick={handleUpdate}>
            {isLoading ? "Loading" : "Update Medicinal Data"}
          </Button>
        </Stack>
      )}
    </>
  );
};
export default Portal;
