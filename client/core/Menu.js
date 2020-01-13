import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Grid
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { Home } from "@material-ui/icons";
import auth from "../auth/auth-helper";

const Menu = () => {
  const history = useHistory();

  const isActive = path => {
    if (history.location.pathname == path) return { color: "#ffffff" };
    else return { color: "#ff4081" };
  };

  return (
    <AppBar position="static">
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Link to="/">
            <IconButton aria-label="Home" style={isActive("/")}>
              <Home />
            </IconButton>
          </Link>
          <Link to="/shops/all">
            <Button style={isActive("/shops/all")}>All Shops</Button>
          </Link>
        </Grid>
        <Grid item>
          {!auth.isAuthenticated() ? (
            <span>
              <Link to="/signup">
                <Button style={isActive("/signup")}>Sign Up</Button>
              </Link>
              <Link to="/signin">
                <Button style={isActive("/signin")}>Sign In</Button>
              </Link>
            </span>
          ) : (
            <span>
              <Link to={"/user/" + auth.isAuthenticated().user._id}>
                <Button
                  style={isActive("/user/" + auth.isAuthenticated().user._id)}
                >
                  My Profile
                </Button>
              </Link>
              {auth.isAuthenticated() && auth.isAuthenticated().user.seller && (
                <Link to="/seller/shops">
                  <Button style={isActive("/seller")}>My Shops</Button>
                </Link>
              )}
              <Button
                color="inherit"
                onClick={() => auth.signout(() => history.push("/"))}
              >
                Sign out
              </Button>
            </span>
          )}
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default Menu;
