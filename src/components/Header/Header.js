import { React, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/userContext";
import UserAvatar from "../UserAvatar/UserAvatar";

// MUI Components
import { AppBar, Toolbar, Stack, Typography, Button } from "@mui/material";

// Icons
import HomeIcon from "@mui/icons-material/HomeRounded";
import BloodIcon from "@mui/icons-material/BloodtypeRounded";
import BMIIcon from "@mui/icons-material/HealthAndSafetyRounded";
import YogaIcon from "@mui/icons-material/SelfImprovementRounded";
import IIITLIcon from "@mui/icons-material/ApartmentRounded";

const Header = () => {
  const [user] = useContext(UserContext);
  const navigate = useNavigate();
  const HeadLink = (props) => {
    return (
      <Link to={props.to}>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="center"
          sx={{
            padding: "5px 10px",
            borderRadius: "5px",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.1)",
              transition: "0.3s",
            },
          }}
        >
          {props.Icon}
          <Typography variant="body2">{props.label}</Typography>
        </Stack>
      </Link>
    );
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Link to="/">
          <Typography variant="h4">Health Web</Typography>
        </Link>
        <Stack
          direction="row"
          sx={{ paddingLeft: "24px", flexGrow: 1 }}
          spacing={3}
        >
          <HeadLink
            to="/feed"
            label="Home"
            Icon={<HomeIcon sx={{ fontSize: "16px" }} />}
          />
          <HeadLink
            to="/bloodDonation"
            label="Blood Donation"
            Icon={<BloodIcon sx={{ fontSize: "16px" }} />}
          />
          <HeadLink
            to="/smartBMI"
            label="Smart BMI"
            Icon={<BMIIcon sx={{ fontSize: "16px" }} />}
          />
          <HeadLink
            to="/yoga"
            label="Yoga"
            Icon={<YogaIcon sx={{ fontSize: "16px" }} />}
          />
          <HeadLink
            to="/portal"
            label="IIITL Portal"
            Icon={<IIITLIcon sx={{ fontSize: "16px" }} />}
          />
        </Stack>
        {user ? (
          <UserAvatar />
        ) : (
          <Link to="/">
            <Button variant="contained" color="warning" size="small">
              Join Us
            </Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
