import React, { useState, useContext } from "react";
import "./UserAvatar.css";
import { UserContext } from "../../Context/userContext";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

// Mui Components
import { Avatar, Menu, MenuItem } from "@mui/material";

function UserAvatar() {
  const { enqueueSnackbar } = useSnackbar();

  const [user, setUser] = useContext(UserContext);
  const history = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (selectedItem) => {
    setAnchorEl(null);
    switch (selectedItem) {
      case "profile":
        history.push(`/profile/${user?.email}`);
        break;
      case "logout":
        localStorage.removeItem("ahc_userDetails");
        setUser(null);
        enqueueSnackbar("Logout successful", { variant: "success" });
        history.push("/login");
        break;
      default:
        break;
    }
  };

  return (
    <div className="userAvatar">
      <Avatar
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        src={user?.pic}
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom" }}
        transformOrigin={{ vertical: "top" }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose("profile");
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose("logout");
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}

export default UserAvatar;
