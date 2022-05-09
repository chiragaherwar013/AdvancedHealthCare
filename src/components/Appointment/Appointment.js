import { React, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import "./Appointment.css";

// MUI Components
import {
  Stack,
  Typography,
  Button,
  TextField,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
const Appointment = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [reason, setReason] = useState("");
  const [timeSlot, setTimeSlot] = useState("05:00 - 05:15");
  const handleSubmit = () => {
    if (reason == "") {
      enqueueSnackbar("Please fill reason", { variant: "error" });
    } else {
      enqueueSnackbar("Appointment fixed", { variant: "success" });
      navigate("/portal");
    }
  };
  return (
    <div className="appointment_container">
      <div className="appointment_timeSlot">
        <InputLabel id="timeSlot">Time Slot</InputLabel>
        <Select
          labelId="timeSlot"
          value={timeSlot}
          label="Time Slot"
          onChange={(e) => setTimeSlot(e.target.value)}
        >
          <MenuItem value={"05:00 - 05:15"}>05:00 - 05:15</MenuItem>
          <MenuItem value={"05:15 - 05:30"}>05:15 - 05:30</MenuItem>
          <MenuItem value={"05:30 - 05:45"}>05:30 - 05:45</MenuItem>
          <MenuItem value={"05:45 - 06:00"}>05:45 - 06:00</MenuItem>
          <MenuItem value={"06:00 - 06:15"}>06:00 - 06:15</MenuItem>
          <MenuItem value={"06:15 - 06:30"}>06:15 - 06:30</MenuItem>
          <MenuItem value={"06:30 - 06:45"}>06:30 - 06:45</MenuItem>
          <MenuItem value={"06:45 - 07:00"}>06:45 - 07:00</MenuItem>
        </Select>
      </div>
      <div>
        <TextField
          label="Reason"
          value={reason}
          variant="outlined"
          onChange={(e) => setReason(e.target.value)}
        />
      </div>
      <div>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};
export default Appointment;
