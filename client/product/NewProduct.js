import React, { useState } from "react";
import auth from "../auth/auth-helper";
import { create } from "./product-api";
import { useParams, Redirect } from "react-router";
import {
  withStyles,
  Card,
  CardContent,
  Typography,
  Button,
  TextField
} from "@material-ui/core";

const NewProduct = props => {
  const [state, setState] = useState({
    name: "",
    description: "",
    images: [],
    category: "",
    quantity: "",
    price: "",
    redirect: false,
    error: ""
  });

  const jwt = auth.isAuthenticated();

  const { shopId } = useParams();

  const handleChange = name => event => {
    const value = name == "image" ? event.target.files[0] : event.target.value;
    setState({ ...state, [name]: value });
  };

  const submit = () => {
    const productData = new FormData();
    const product = {
      name: state.name,
      description: state.description,
      images: state.images,
      category: state.category,
      quantity: state.quantity,
      price: state.price
    };
    for (let name in product) {
      productData.append(name, state[name]);
    }
    create({ shopId }, { t: jwt.token }, productData).then(data => {
      if (data.error) return setState({ ...state, error: data.error });
      setState({ ...state, redirect: true });
    });
  };

  if (state.redirect) return <Redirect to={`/shops/edit/${shopId}`} />;

  const { classes } = props;

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            New Product
          </Typography>
          <br />
          <input
            accept="image/*"
            onChange={handleChange("image")}
            className={classes.input}
            id="icon-button-file"
            type="file"
          />
          <label htmlFor="icon-button-file">
            <Button variant="raised" color="secondary" component="span">
              Upload File
            </Button>
          </label>
          <span className={classes.filename}>
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
          <br />
          <TextField
            id="multiple-flexible"
            label="description"
            multiline
            rows="2"
            value={state.description}
            onChange={handleChange("description")}
            className={classes.textField}
            margin="normal"
          />
          <br />
          <TextField
            id="category"
            label="Category"
            className={classes.textField}
            value={state.category}
            onChange={handleChange("category")}
          /><br />
          <TextField id="quantity" label="Quantity" className={classes.textField} value={state.quantity} onChange={handleChange("quantity")} type="number" margin="normal" /><br />
        </CardContent>
      </Card>
    </div>
  );
};

const styles = theme => ({});

export default withStyles(styles)(NewProduct);
