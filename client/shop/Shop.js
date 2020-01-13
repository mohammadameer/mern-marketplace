import React, { useEffect, useState } from "react";
import { read } from "./shop-api";
import { useLocation, useParams } from "react-router";
import {
  withStyles,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar
} from "@material-ui/core";

const Shop = props => {
  const [state, setState] = useState({
    shop: {},
    error: ""
  });

  const { shopId } = useParams();

  useEffect(() => {
    read({
      shopId
    }).then(data => {
      if (data.error) return setState({ ...state, error: data.error });
      setState({ ...state, shop: data });
    });
  }, []);

  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={10}>
        <Grid item xs={4} sm={4}>
          <Card className={classes.card}>
            <CardContent>
              <Typography
                type="headline"
                component="h2"
                className={classes.title}
              ></Typography>{" "}
              <br />
              <Avatar src={`/api/shops/image/${state.shop._id}`} />
              <br />
              <Typography
                type="subheading"
                component="h2"
                className={classes.subheading}
              >
                {state.shop.description}
              </Typography>
              <br />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8} sm={8}>
          <Card>
            <Typography
              type="title"
              component="h2"
              className={classes.productTitle}
            >
              Products
            </Typography>
            {/* <Products products={state.products} searched={false} /> */}
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

const styles = theme => ({});

export default withStyles(styles)(Shop);
