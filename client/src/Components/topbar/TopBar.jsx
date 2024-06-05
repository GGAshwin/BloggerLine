import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { AppBar, Toolbar, Button, Menu, MenuItem, IconButton, Avatar } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

export default function Topbar() {
  const { user, dispatch } = useContext(Context);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    window.location.replace('/login');
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" style={{ backgroundColor: "#333" }}>
      <Toolbar>
        <div style={{ flexGrow: 1 }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/write">Write</Button>
          <Button color="inherit" component={Link} to="/subscribe">Subscribe</Button>
        </div>
        <IconButton
          color="inherit"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
        >
          {user ? (
            <Avatar
              alt="User Avatar"
              src={user.profilePic || "https://media.istockphoto.com/id/1176363686/vector/smiling-young-asian-girl-profile-avatar-vector-icon.jpg?s=612x612&w=0&k=20&c=QuyZJNKexFQgDPr9u91hKieWKOYbaFxPb0b0gwmd-Lo="}
            />
          ) : (
            <AccountCircle />
          )}
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {user ? (
            <>
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </>
          ) : (
            <>
              <MenuItem onClick={handleClose} component={Link} to="/login">Login</MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/register">Register</MenuItem>
            </>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}