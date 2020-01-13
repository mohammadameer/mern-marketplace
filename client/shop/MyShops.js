import React, { useState, useEffect } from "react";
import auth from "../auth/auth-helper";
import { Edit } from "@material-ui/icons";
import {
  Paper,
  Typography,
  Grid,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  withStyles,
  Toolbar
} from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { listByOwner } from "./shop-api";
import DeleteShop from "./DeleteShop";

const MyShops = props => {
  const [state, setState] = useState({
    shops: [],
    redirect: false
  });

  const jwt = auth.isAuthenticated();

  const loadShops = () => {
    listByOwner({ userId: jwt.user._id }, { t: jwt.token }).then(data => {
      if (data.error) return setState({ ...state, redirect: true });
      setState({ shops: data });
    });
  };

  useEffect(() => {
    loadShops();
  }, []);

  const removeShop = shop => {
    const updatedShops = state.shops;
    const index = updatedShops.indexOf(shop);
    updatedShops.splice(index, 1);
    setState({ ...state, shops: updatedShops });
  };

  const { classes } = props;

  if (state.redirect) return <Redirect to="/signin" />;

  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Grid container justify="space-between" alignItems="center">
          <Typography type="title" className={classes.title}>
            Your Shops
          </Typography>
          <Link to="/seller/shop/new">
            <Button color="primary" variant="raised">
              New Shop
            </Button>
          </Link>
        </Grid>
        <List dense>
          {state.shops.map((shop, index) => (
            <span key={index}>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar
                    src={
                      "/api/shops/image/" +
                      shop._id +
                      "?" +
                      new Date().getTime()
                    }
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={shop.name}
                  secondary={shop.description}
                />
                {auth.isAuthenticated().user &&
                  auth.isAuthenticated().user._id == shop.owner._id && (
                    <ListItemSecondaryAction>
                      <Link to={"/seller/orders/" + shop.name + "/" + shop._id}>
                        <Button aria-label="Orders" color="primary">
                          View Orders
                        </Button>
                      </Link>
                      <Link to={"/shops/edit/" + shop._id}>
                        <IconButton aria-label="Edit" color="primary">
                          <Edit />
                        </IconButton>
                      </Link>
                      <DeleteShop shop={shop} onRemove={removeShop} />
                    </ListItemSecondaryAction>
                  )}
              </ListItem>
              <Divider />
            </span>
          ))}
        </List>
      </Paper>
    </div>
  );
};

const styles = theme => ({
  root: theme.mixins.gutters({
    margin: "auto",
    padding: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 5
  }),
  title: {
    margin: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 3}px ${
      theme.spacing.unit
    }px`,
    color: theme.palette.protectedTitle,
    fontSize: "1.2em"
  },
  addButton: {
    float: "right"
  },
  leftIcon: {
    marginRight: "8px"
  }
});

export default withStyles(styles)(MyShops);
