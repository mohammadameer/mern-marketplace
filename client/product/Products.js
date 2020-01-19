import React from "react";
import {
  withStyles,
  GridList,
  GridListTile,
  GridListTileBar,
  Typography
} from "@material-ui/core";
import { Link } from "react-router-dom";

const Products = props => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      {props.products.length > 0 ? (
        <div className={classes.container}>
          <GridList cellHeight={200} className={classes.grildList} cols={3}>
            {props.products.map((product, i) => (
              <GridListTile key={i} className={classes.tile}>
                <Link to={`/products/${product._id}`}>
                  <img
                    className={classes.image}
                    src={`/api/product/image/${product._id}`}
                    alt={product.name}
                  />
                </Link>
                <GridListTileBar
                  className={classes.tileBar}
                  title={
                    <Link
                      to={`/products/${product._id}`}
                      className={classes.tileTitle}
                    >
                      {product.name}
                    </Link>
                  }
                  subtitle={<span>$ {product.price}</span>}
                  // actionIcon={<AddToCart item={product} />}
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
      ) : (
        props.searched && (
          <Typography
            type="subheading"
            component="h4"
            className={classes.title}
          >
            No Products found :({" "}
          </Typography>
        )
      )}
    </div>
  );
};

const styles = theme => ({});

export default withStyles(styles)(Products);
