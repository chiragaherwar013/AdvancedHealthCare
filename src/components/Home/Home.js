import { React, useContext } from "react";
import { Link } from "react-router-dom";
import Login from "../Login/Login";
import { UserContext } from "../../Context/userContext";
// MUI Components
import { Stack, Typography, Button } from "@mui/material";
const Home = () => {
  const [user] = useContext(UserContext);
  return (
    <Stack direction="row" justifyContent="space-evenly" alignItems="center">
      <img src="/images/healthwebIcon.png" height="600px" alt="Health-Web" />
      <Stack spacing={3}>
        <img
          src="https://iiitl.ac.in/wp-content/uploads/2019/10/Final_Logo_IIITL.png"
          width="100px"
          alt="IIIT Lucknow"
        />
        <Typography variant="h2">Join & Create Impact</Typography>
        {user ? (
          <Link to="/feed">
            <Button variant="outlined" color="success">
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
