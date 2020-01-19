import React, { useState, useEffect } from "react";
import { read, update } from "./product-api";
import { useParams, Redirect } from "react-router";
import auth from "../auth/auth-helper";

import {
  withStyles,
  CardContent,
  Typography,
  Button,
  TextField,
  Avatar,
  CardActions
} from "@material-ui/core";
import { Link } from "react-router-dom";

const EditProduct = props => {
  const [state, setState] = useState({
    name: "",
    description: "",
    image: "",
    category: "",
    quantity: "",
    price: "",
    redirect: false,
    error: ""
  });

  const jwt = auth.isAuthenticated();

  const { shopId, productId } = useParams();

  useEffect(() => {
    read({ productId }).then(data => {
      if (data.error) return setState({ ...state, error: data.error });
      setState({ ...state, ...data, id: data._id });
    });
  }, []);

  const submit = () => {
    const productData = new FormData();
    const data = {
      name: "",
      description: "",
      image: "",
      category: "",
      quantity: "",
      price: ""
    };

    for (let name in data) {
      productData.append(name, state[name]);
    }

    update({ shopId, productId }, { t: jwt.token }, productData).then(data => {
      if (data.error) setState({ ...state, error: data.error });
      setState({ ...state, redirect: true });
    });
  };

  const handleChange = name => event => {
    const value = name == "image" ? event.target.files[0] : event.target.value;
    setState({ ...state, [name]: value });
  };

  if (state.redirect) return <Redirect to={`/seller/shop/edit/${shopId}`} />;

  const { classes } = props;

  return (
    <div>
      <CardContent>
        <Typography type="headline" component="h2" className={classes.title}>
          Edit Product
        </Typography>{" "}
        <br />
        <Avatar
          src={`/api/product/image/${productId}?${new Date().getTime()}`}
        />
        <input
          accept="image/*"
          onChange={handleChange("image")}
          className={classes.input}
          id="icon-button-file"
          type="file"
        />
        <label htmlFor="icon-button-file">
          <Button variant="raised" color="secondary" component="span">
            Change Image
          </Button>
        </label>
        <span className={classes.filename}>
          {state.image ? state.image.name : ""}
        </span>
        <TextField
          id="name"
          label="Name"
          className={classes.textField}
          value={state.name}
          onChange={handleChange("name")}
          margin="normal"
        />
        <br />
        <TextField
          id="multiline-flexible"
          label="Description"
          multiline
          rows="3"
          value={state.description}
          onChange={handleChange("description")}
          className={classes.textField}
          margin="normal"
        />
        <br />
        <TextField
          id="multiline-flexible"
          label="Category"
          multiline
          rows="3"
          value={state.category}
          onChange={handleChange("category")}
          className={classes.textField}
          margin="normal"
        />
        <br />
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          variant="raised"
          onClick={submit}
          className={classes.submit}
        >
          Update
        </Button>
        <Link to={`/seller/shops/edit/${shopId}`} className={classes.submit}>
          <Button variant="raised">Cancel</Button>
        </Link>
      </CardActions>
    </div>
  );
};

const styles = theme => ({});

export default withStyles(styles)(EditProduct);
