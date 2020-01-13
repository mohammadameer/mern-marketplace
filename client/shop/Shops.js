import React, { useEffect, useState } from "react";
import { list } from "./shop-api";
import { Link } from "react-router-dom";
import {
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Typography,
  Avatar
} from "@material-ui/core";

const Shops = () => {
  const [state, setState] = useState({
    shops: []
  });

  const loadShops = () => {
    list().then(data => {
      if (data.error) return console.error(data.error);
      setState({ ...state, shops: data });
    });
  };

  useEffect(() => {
    loadShops();
  }, []);

  return (
    <List>
      {state.shops.map((shop, index) => (
        <Link to={"/shops/" + shop._id} key={index}>
          <Divider />
          <ListItem button>
            <ListItemAvatar>
              <Avatar
                src={
                  "/api/shops/image/" + shop._id + "?" + new Date().getTime()
                }
              />
            </ListItemAvatar>
            <div>
              <Typography type="headline" component="h2" color="primary">
                {shop.name}
              </Typography>
              <Typography type="subheading" component="h4">
                {shop.description}
              </Typography>
            </div>
          </ListItem>{" "}
          <Divider />
        </Link>
      ))}
    </List>
  );
};

export default Shops;
