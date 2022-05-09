import { React, useContext } from "react";
import { Link } from "react-router-dom";
import Login from "../Login/Login";
import { UserContext } from "../../Context/userContext";
import "./Home.css";

// MUI Components
import { Stack, Typography, Button } from "@mui/material";
const Home = () => {
  const [user] = useContext(UserContext);
  return (
    <Stack
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
      className="landing__page__container"
    >
      <div className="wrapper__wave">
        <div className="wave"></div>
      </div>

      <img
        src="/images/healthwebIcon.png"
        height="400px"
        alt="Health-Web"
        style={{
          zIndex: 100,
        }}
      />
      <br />
      <Stack
        spacing={3}
        sx={{ zIndex: 100 }}
        justifyContent="center"
        alignItems="center"
      >
        <img
          src="https://iiitl.ac.in/wp-content/uploads/2019/10/Final_Logo_IIITL.png"
          width="70px"
          alt="IIIT Lucknow"
        />
        <Typography variant="h2">Join & Create Impact</Typography>
        {user ? (
          <Link to="/feed">
            <Button variant="contained" color="error" size="large">
              Visit
            </Button>
          </Link>
        ) : (
          <Login />
        )}
      </Stack>
    </Stack>
  );
};
export default Home;
