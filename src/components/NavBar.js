import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Button } from '@mui/material';
import { AccountCircle, Menu as MenuIcon } from '@mui/icons-material';
import Link from 'next/link';

const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [accountEl, setAccountEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccountMenu = (event) => {
    setAccountEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAccountEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenu}>
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            style: {
              backgroundColor: '#1976d2', // Match AppBar background color
            },
          }}
        >
          <MenuItem onClick={handleClose}>
            <Link href="/" passHref>
              <Button color="inherit" sx={{ color: '#ffffff' }}>Home</Button>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link href="/about" passHref>
              <Button color="inherit" sx={{ color: '#ffffff' }}>About Us</Button>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link href="/pantry-form" passHref>
              <Button color="inherit" sx={{ color: '#ffffff' }}>Create Pantry List</Button>
            </Link>
          </MenuItem>
        </Menu>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          My Pantry Tracker
        </Typography>
        <Button
          color="inherit"
          sx={{ mr: 2, color: '#ffffff' }} // Color for Sign Up button
          component={Link}
          href="/signup"
        >
          Sign Up
        </Button>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="account"
          onClick={handleAccountMenu}
        >
          <AccountCircle />
        </IconButton>
        <Menu
          anchorEl={accountEl}
          open={Boolean(accountEl)}
          onClose={handleClose}
          PaperProps={{
            style: {
              backgroundColor: '#1976d2', // Match AppBar background color
            },
          }}
        >
          <MenuItem onClick={handleClose}>
            <Link href="/account" passHref>
              <Button color="inherit" sx={{ color: '#ffffff' }}>My Account</Button>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link href="/settings" passHref>
              <Button color="inherit" sx={{ color: '#ffffff' }}>Settings</Button>
            </Link>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
