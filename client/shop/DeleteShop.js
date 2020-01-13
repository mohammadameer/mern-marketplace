import React, { useState } from "react";
import auth from "../auth/auth-helper";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { remove } from "./shop-api";

const DeleteShop = props => {
  const [open, setOpen] = useState(false);

  const jwt = auth.isAuthenticated();

  const handleClick = () => setOpen(!open);

  const deleteShop = () => {
    remove(
      {
        shopId: props.shop._id
      },
      {
        t: jwt.token
      }
    ).then(data => {
      if (data.error) return console.error(data.error);
      setOpen(false);
      props.onRemove(props.shop);
    });
  };

  return (
    <span>
      <IconButton aria-label="Delete" onClick={handleClick} color="secondary">
        <Delete />
      </IconButton>

      <Dialog open={open} onClose={handleClick}>
        <DialogTitle>{`Delete ${props.shop.name}`}</DialogTitle>
        <DialogContent>
          Confirm To Delete your shop {props.shop.name}
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteShop} color="secondary" autoFocus="autoFocus">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
};

export default DeleteShop;
