import React, { useState, useEffect } from "react";
import { read, update } from "./shop-api";
import { useParams, Redirect } from "react-router";
import auth from "../auth/auth-helper";
import {
  withStyles,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  TextField,
  Icon,
  CardActions
} from "@material-ui/core";

const EditShop = props => {
  const [state, setState] = useState({
    id: "",
    name: "",
    description: "",
    image: "",
    redirect: false,
    error: ""
  });
  const { shopId } = useParams();

  const jwt = auth.isAuthenticated();

  useEffect(() => {
    read({ shopId }).then(data => {
      if (data.error) return setState({ ...state, error: data.error });
      setState({
        ...state,
        id: data._id,
        name: data.name,
        description: data.description,
        owner: data.owner.name
      });
    });
  }, []);

  const handleChange = name => event => {
    const value = name == "image" ? event.target.files[0] : event.target.value;
    setState({ ...state, [name]: value });
  };

  const submit = () => {
    const shopData = new FormData();
    const user = {
      name: state.name,
      description: state.description,
      image: state.image
    };
    for (let name in user) {
      shopData.append(name, state[name]);
    }
    update({ shopId }, { t: jwt.token }, shopData).then(data => {
      if (data.error) return setState({ ...state, error: data.error });
      setState({ ...state, redirect: true });
    });
  };

  if (state.redirect) return <Redirect to="/seller/shops" />;

  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={5}>
        <Grid item xs={6} sm={6}>
          <Card className={classes.card}>
            <CardContent>
              <Typography
                type="headline"
                component="h2"
                className={classes.title}
              >
                Edit Shpo
              </Typography>
              <br />
              <Avatar src={`/api/shops/image/${shopId}`} />
              <br />
              <input
                accept="image/*"
                onChange={handleChange("image")}
                className={classes.input}
                id="icon-button-file"
                type="file"
              />
              <label htmlFor="icon-button-file">
                <Button variant="raised" color="default" component="span">
                  Change Logo
                </Button>
              </label>{" "}
              <span className={classes.fileName}>
                {state.image && state.image.name}
              </span>
              <TextField
                id="name"
                label="Name"
                className={classes.textField}
                value={state.name}
                onChange={handleChange("name")}
                margin="normal"
              />
              <TextField
                id="multiline-flexible"
                label="description"
                multiline
                rows="3"
                value={state.description}
                onChange={handleChange("description")}
                className={classes.textField}
                margin="normal"
              />
              <br />
              <Typography
                type="subheading"
                component="h4"
                className={classes.subheading}
              >
                Owner: {state.name}
              </Typography>
              <br />
              {state.error && (
                <Typography component="p" color="error">
                  <Icon color="error" className={classes.error}>
                    error
                  </Icon>
                  {state.error}
                </Typography>
              )}
            </CardContent>
            <CardActions>
              <Button
                color="primary"
                variant="raised"
                onClick={submit}
                className={classes.submit}
              >
                Updata
              </Button>
            </CardActions>
          </Card>
        </Grid>
        {/* <Grid item xs={6} sm={6}>
          <MyProducts shopId={shopId} />
        </Grid> */}
      </Grid>
    </div>
  );
};

const styles = theme => ({});

export default withStyles(styles)(EditShop);
