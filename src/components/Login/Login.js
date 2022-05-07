import { React, useContext } from "react";
import { auth, provider, db } from "../../firebase";

import { useSnackbar } from "notistack";
import { UserContext } from "../../Context/userContext";
import { useNavigate } from "react-router-dom";

// MUI Components
import { Stack, Button } from "@mui/material";

// Icons
import GoogleIcon from "@mui/icons-material/Google";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = () => {
    auth
      .signInWithPopup(provider)
      .then((response) => {
        if (response.user.email.split("@")[1] === "iiitl.ac.in") {
          db.collection("users")
            .add({
              name: response.user.displayName,
              email: response.user.email,
              profileImg: response.user.photoURL,
            })
            .then((res) => {
              // console.log(res);

              localStorage.setItem(
                "healthWeb-user",
                JSON.stringify({
                  name: response.user.displayName,
                  email: response.user.email,
                  profileImg: response.user.photoURL,
                })
              );
              setUser({
                name: response.user.displayName,
                email: response.user.email,
                profileImg: response.user.photoURL,
              });
              navigate("/profile");
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          enqueueSnackbar("Sign Up failed. Only for IIITL Students", {
            variant: "error",
          });
        }
      })
      .catch((error) => {});
  };

  const handleSignIn = () => {
    auth
      .signInWithPopup(provider)
      .then((response) => {
        db.collection("users")
          .where("email", "==", response.user.email)
          .get()
          .then((res) => {
            if (res.docs.map((doc) => doc.data()).length > 0) {
              localStorage.setItem(
                "healthWeb-user",
                JSON.stringify({
                  name: response.user.displayName,
                  email: response.user.email,
                  profileImg: response.user.photoURL,
                })
              );
              setUser({
                name: response.user.displayName,
                email: response.user.email,
                profileImg: response.user.photoURL,
              });
              enqueueSnackbar("Successfully signed in", { variant: "success" });
              navigate("/feed");
            } else {
              enqueueSnackbar("you don't have account, Sign Up to continue", {
                variant: "error",
              });
            }
          });
      })
      .catch((error) => {
        console.log(error.message);
        enqueueSnackbar("An error occured, try again later!", {
          variant: "error",
        });
      });
  };

  return (
    <Stack direction="row" spacing={2}>
      <Button
        onClick={handleSignIn}
        sx={{
          backgroundColor: "#DB4437",
          "&:hover": {
            backgroundColor: "rgba(219,68,55,0.9)",
          },
        }}
        variant="contained"
        startIcon={<GoogleIcon />}
      >
        Login
      </Button>
      <Button
        onClick={handleSignUp}
        sx={{
          backgroundColor: "#0F9D58",
          "&:hover": {
            backgroundColor: "rgba(15,157,88,0.9)",
          },
        }}
        variant="contained"
        startIcon={<GoogleIcon />}
      >
        Sign Up
      </Button>
    </Stack>
  );
};

export default Login;
