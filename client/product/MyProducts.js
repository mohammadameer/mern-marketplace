import React, { useEffect, useState } from "react";
import { listByShop } from "./product-api";
import {
  withStyles,
  Card,
  Typography,
  Button,
  Icon,
  List,
  ListItem,
  CardMedia,
  ListItemSecondaryAction,
  IconButton,
  Divider
} from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import { Edit } from "@material-ui/icons";

import DeleteProduct from "./DeleteProduct";

const MyProducts = props => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  const { shopId } = useParams();

  useEffect(() => {
    listByShop({ shopId: props.shopId }).then(data => {
      if (data.error) return setError(data.error);
      setProducts(data);
    });
  }, []);

  const removeProduct = product => {
    const updatedProducts = products.filter(i => i._id !== product._id);
    setProducts(updatedProducts);
  };

  const { classes } = props;
  return (
    <Card className={classes.products}>
      <Typography type="title" className={classes.title}>
        Products
        <span className={classes.addButton}>
          <Link to={`/seller/shops/${shopId}/products/new`}>
            <Button color="primary" variant="raised">
              <Icon className={classes.leftIcon}>add_box</Icon> New Product
            </Button>
          </Link>
        </span>
      </Typography>
      <List dense>
        {products.map((product, i) => (
          <span key={i}>
            <ListItem>
              <CardMedia
                className={classes.cover}
                image={`/api/product/image/${
                  product._id
                }?${new Date().getTime()}`}
                title={product.name}
              />
              <div className={classes.details}>
                <Typography
                  type="headline"
                  component="h2"
                  color="primary"
                  className={classes.productTitle}
                >
                  {product.name}
                </Typography>
                <Typography
                  type="subheading"
                  component="h4"
                  className={classes.subheading}
                >
                  Quantity: {product.quantity} | Price: ${product.price}
                </Typography>
              </div>
              <ListItemSecondaryAction>
                <Link to={`/seller/${product.shop._id}/${product._id}/edit`}>
                  <IconButton aria-label="Edit" color="primary">
                    <Edit />
                  </IconButton>
                </Link>
                <DeleteProduct
                  product={product}
                  shopId={props.shopId}
                  onRemove={removeProduct}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </span>
        ))}
      </List>
    </Card>
  );
};

const styles = theme => ({
  cover: {
    width: 110,
    height: 100,
    margin: 0
  }
});

export default withStyles(styles)(MyProducts);
