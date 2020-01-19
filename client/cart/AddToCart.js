import React, { useState } from "react";
import { Redirect } from "react-router";
import { IconButton, withStyles } from "@material-ui/core";
import { AddShoppingCart, RemoveShoppingCart } from "@material-ui/icons";
import * as cart from "./cart-helper";

const AddToCart = props => {
  const [redirect, setRedirect] = useState(false);

  const addToCart = () => {
    cart.addItem(props.item, () => {
      setRedirect(true);
    });
  };

  if (redirect) return <Redirect to="/cart" />;

  const { classes } = props;

  return (
    <span>
      {props.item.quantity >= 0 ? (
        <IconButton color="secondary" dense="dense" onClick={addToCart}>
          <AddShoppingCart className={props.cartStyle || classes.iconuButton} />
        </IconButton>
      ) : (
        <IconButton disabled={true} color="secondary" dense="dense">
          <RemoveShoppingCart
            className={props.cartStyle || classes.disabledIconButton}
          />
        </IconButton>
      )}
    </span>
  );
};

const styles = theme => ({});

export default withStyles(styles)(AddToCart);
