import React, { useState } from "react";
import { Button, TextField, Card, withStyles } from "@material-ui/core";
import { FileCopy } from "@material-ui/icons";
import auth from "../auth/auth-helper";
import { create } from "./shop-api";
import { Redirect } from "react-router";

const NewShop = props => {
  const [state, setState] = useState({
    name: "",
    description: "",
    image: "",
    redirect: false,
    error: ""
  });

  const jwt = auth.isAuthenticated();

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

    create(
      {
        userId: jwt.user._id
      },
      {
        t: jwt.token
      },
      shopData
    ).then(data => {
      if (data.error) return setState({ ...state, error: data.error });
      setState({ ...state, redirect: true });
    });
  };

  if (state.redirect) return <Redirect to="/seller/shops" />;

  const { classes } = props;

  return (
    <Card className={classes.container}>
      <label htmlFor="icon-button-file">
        <Button raised color="secondary" component="span">
          Upload Image <FileCopy />
        </Button>
      </label>
      <input
        accept="image/*"
        onChange={handleChange("image")}
        style={{ display: "none" }}
        id="icon-button-file"
        type="file"
      />
      <span>{state.image.name}</span>
      <br />
      <TextField
        id="name"
        label="Name"
        value={state.name}
        onChange={handleChange("name")}
      />{" "}
      <br />
      <TextField
        id="multiline-flexible"
        label="description"
        multiline
        rows="2"
        value={state.description}
        onChange={handleChange("description")}
      />
      <Button onClick={submit}>Create</Button>
    </Card>
  );
};

const styles = theme => ({
  container: {
    maxWidth: "80%",
    margin: "50px auto",
    padding: 30,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
});

export default withStyles(styles)(NewShop);
