import React, { useState, useEffect } from "react";
import { list } from "./product-api";
import {
  withStyles,
  Card,
  Typography,
  GridList,
  GridListTile,
  Icon,
  Divider
} from "@material-ui/core";
import Products from "./Products";

const Categories = props => {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (props.categories.length > 0) {
      list({
        category: props.categories[0]
      }).then(data => {
        if (data.error) return console.log(data.error);
        setProducts(data);
      });
    }
  }, [props.categories]);

  const listByCategory = category => event => {
    setSelected(category);
    list({
      category
    }).then(data => {
      if (data.error) return console.log(data.error);
      setProducts(data);
    });
  };

  const { classes } = props;

  return (
    <div>
      <Card className={classes.card}>
        <Typography type="title" className={classes.title}>
          Explore By category
        </Typography>
        <div className={classes.root}>
          <GridList className={classes.gridList} cols={4}>
            {props.categories.map((category, i) => (
              <GridListTile
                key={i}
                className={classes.tileTitle}
                style={{
                  height: 64,
                  backgroundColor:
                    selected == category
                      ? "rgba(59,139, 137, 0.5)"
                      : "rgba(95, 124, 139, 0.3)"
                }}
              >
                <span
                  className={classes.link}
                  onClick={listByCategory(category)}
                >
                  {category}{" "}
                  <Icon className={classes.icon}>
                    {selected == category && "arrow_drop_down"}
                  </Icon>
                </span>
              </GridListTile>
            ))}
          </GridList>
        </div>
        <Divider />
        <Products products={products} searched={false} />
      </Card>
    </div>
  );
};

const styles = theme => ({});

export default withStyles(styles)(Categories);
