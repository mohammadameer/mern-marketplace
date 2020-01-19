import React from "react";
import {
  withStyles,
  Paper,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Icon,
  IconButton,
  Divider
} from "@material-ui/core";
import { Visibility } from "@material-ui/icons";
import { Link } from "react-router-dom";

const Suggestions = props => {
  const { classes, products, title } = props;
  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          {title}
        </Typography>
        {products &&
          products.map((product, i) => (
            <span key={i}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cover}
                  image={`/api/product/image/${product._id}`}
                  title={product.name}
                />
                <div className={classes.details}>
                  <CardContent className={classes.content}>
                    <Link to={`/product/${product._id}`}>
                      <Typography
                        type="title"
                        component="h3"
                        className={classes.productTitle}
                        color="primary"
                      >
                        {product.name}
                      </Typography>
                    </Link>
                    <Link to={`/shops/${product.shop._id}`}>
                      <Typography
                        type="subheading"
                        className={classes.subheading}
                      >
                        <Icon className={classes.icon}>shopping_basket</Icon>{" "}
                        {product.shop.name}
                      </Typography>
                    </Link>
                    <Typography component="p" className={classes.date}>
                      Added on {new Date(product.created).toDateString()}
                    </Typography>
                  </CardContent>
                  <div className={classes.controls}>
                    <Typography
                      type="subheading"
                      component="h3"
                      className={classes.price}
                      color="primary"
                    >
                      {product.price}
                    </Typography>
                    <span className={classes.actions}>
                      <Link to={`/products/${product._id}`}>
                        <IconButton color="secondary" dense="dense">
                          <Visibility />
                        </IconButton>
                      </Link>
                      {/* <AddToCart product={product} /> */}
                    </span>
                  </div>
                </div>
                <Divider />
              </Card>
            </span>
          ))}
      </Paper>
    </div>
  );
};

const styles = theme => ({});

export default withStyles(styles)(Suggestions);
