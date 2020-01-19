import React, { useState } from "react";
import auth from "../auth/auth-helper";
import { remove } from "./product-api";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";

const DeleteProduct = props => {
  const [open, setOpen] = useState(false);

  const jwt = auth.isAuthenticated();

  const handleOpen = () => setOpen(!open);

  const deleteProduct = () => {
    remove(
      { shopId: props.shopId, productId: props.product._id },
      { t: jwt.token }
    ).then(data => {
      if (data.error) return console.log(data.error);
      setOpen(false);
      props.onRemove(props.product);
    });
  };

  return (
    <span>
      <IconButton aria-label="Delete" onClick={handleOpen} color="secondary">
        <Delete />
      </IconButton>
      <Dialog open={open} onClose={handleOpen}>
        <DialogTitle>{`Delete ${props.product.name}`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete your product {props.product.name}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpen} color="primary">
            Cancel
          </Button>
          <Button
            onClick={deleteProduct}
            color="secondary"
            autoFocus="autoFocus"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
};

export default DeleteProduct;
