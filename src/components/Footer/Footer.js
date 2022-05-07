import React from "react";
import { Link } from "react-router-dom";

// MUI Components
import { Stack, Divider, Typography } from "@mui/material";

const Footer = () => {
  return (
    <footer>
      <Stack
        direction="row"
        sx={{
          padding: "10px 24px",
          backgroundColor: "rgb(29,29,29)",
        }}
        spacing={2}
      >
        <Stack sx={{ flexGrow: 1 }}>
          <Link to="/feed">
            <Typography variant="h5" sx={{ color: "whitesmoke" }}>
              Health Web
            </Typography>
          </Link>
          <Typography variant="legend" sx={{ color: "whitesmoke" }}>
            IIIT Lucknow
          </Typography>
        </Stack>
        <Stack sx={{ color: "whitesmoke" }} spacing={1}>
          <div>
            <Link to="/aboutus">
              <Typography variant="body2">About Us</Typography>
            </Link>
            <Divider
              orientation="horizontal"
              light={true}
              flexItem={true}
              sx={{ borderColor: "rgba(255,255,255,0.4)" }}
            />
          </div>
          <div>
            <Link to="/contact">
              <Typography variant="body2">Contact Us</Typography>
            </Link>
            <Divider
              orientation="horizontal"
              light={true}
              flexItem={true}
              sx={{ borderColor: "rgba(255,255,255,0.4)" }}
            />
          </div>
          <div>
            <Link to="/" target="_blank">
              <Typography variant="body2">Contribute</Typography>
            </Link>
            <Divider
              orientation="horizontal"
              light={true}
              flexItem={true}
              sx={{ borderColor: "rgba(255,255,255,0.4)" }}
            />
          </div>
        </Stack>
        <Stack sx={{ color: "whitesmoke" }} spacing={1}>
          <div>
            <Link to="/yoga">
              <Typography variant="body2">Yoga Aasans</Typography>
            </Link>
            <Divider
              orientation="horizontal"
              light={true}
              flexItem={true}
              sx={{ borderColor: "rgba(255,255,255,0.4)" }}
            />
          </div>
          <div>
            <Link to="/smartBMI">
              <Typography variant="body2">Smart BMI</Typography>
            </Link>
            <Divider
              orientation="horizontal"
              light={true}
              flexItem={true}
              sx={{ borderColor: "rgba(255,255,255,0.4)" }}
            />
          </div>
          <div>
            <Link to="/bloodDonation">
              <Typography variant="body2">Blood Donation</Typography>
            </Link>
            <Divider
              orientation="horizontal"
              light={true}
              flexItem={true}
              sx={{ borderColor: "rgba(255,255,255,0.4)" }}
            />
          </div>
        </Stack>
      </Stack>
    </footer>
  );
};

export default Footer;
