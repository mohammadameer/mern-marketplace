import React, { useState, useEffect } from "react";
import { read, listRelated } from "./product-api";
import { useParams } from "react-router";
import { CallMissedSharp } from "@material-ui/icons";
import {
  Grid,
  Card,
  withStyles,
  CardHeader,
  Typography,
  Icon,
  CardMedia
} from "@material-ui/core";
import { Link } from "react-router-dom";

import Suggestions from "./Suggestions";

const Product = props => {
  const [product, setProduct] = useState({ shop: {} });
  const [suggestions, setSugesstions] = useState([]);
  const [state, setState] = useState({
    suggestoinsTitle: "Related Products",
    error: ""
  });

  const { productId } = useParams();

  useEffect(() => {
    read({ productId }).then(data => {
      if (data.error) return setState({ ...state, error: data.error });
      setProduct(data);
      listRelated({ productId }).then(data => {
        if (data.error) return console.error(data.error);
        setSugesstions(data);
      });
    });
  }, [productId]);

  const { classes } = props;
  return (
    <div className={CallMissedSharp.root}>
      <Grid container spacing={5}>
        <Grid item xs={7} sm={7}>
          <Card className={classes.card}>
            <CardHeader
              title={product.name}
              subheader={product.quantity > 0 ? "In Stok" : "Out of Stock"}
              action={
                <span className={classes.action}>
                  {/* <AddToCart cartStyle={classes.addCart} item={state.product} /> */}
                </span>
              }
            />
            <div className={classes.flex}>
              <CardMedia
                className={classes.media}
                image={`/api/product/image/${productId}?${new Date().getTime()}`}
                title={product.name}
              />
              <Typography
                component="p"
                type="subheading"
                className={classes.subheading}
              >
                {product.description} <br />
                <span className={classes.price}>$ {product.price}</span>
                <Link
                  to={`/shops/${product.shop._id}`}
                  className={classes.link}
                >
                  <span>
                    <Icon className={classes.icon}>shopping_basket</Icon>{" "}
                    {product.shop.name}
                  </span>
                </Link>
              </Typography>
            </div>
          </Card>
        </Grid>
        {suggestions.length > 0 && (
          <Grid item xs={5} sm={5}>
            <Suggestions products={suggestions} title="Related Products" />
          </Grid>
        )}
      </Grid>
    </div>
  );
};

const styles = theme => ({});

export default withStyles(styles)(Product);
