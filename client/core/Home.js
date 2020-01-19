import React, { useState, useEffect } from "react";
import PropsTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import Suggestions from "../product/Suggestions";
import Search from "../product/Search";
import auth from "../auth/auth-helper";
import { listLatest, listCategories } from "../product/product-api";
import Categories from "../product/Categories";

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(5)
  },
  title: {
    padding: theme.spacing(5),
    color: theme.palette.text.secondary
  },
  media: {
    minHeight: 330
  }
});

const Home = props => {
  const [latestProducts, setLatestProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const jwt = auth.isAuthenticated;

  useEffect(() => {
    listLatest().then(data => {
      if (data.error) return console.log(data);
      setLatestProducts(data);
    });

    listCategories().then(data => {
      if (data.error) return console.log(data.error);
      setCategories(data);
    });
  }, []);
  const { classes } = props;
  return (
    <div>
      <Grid>
        <Grid item xs={12}>
          <Search categories={categories} />
        </Grid>
        <Grid item xs={12}>
          <Categories categories={categories} />
        </Grid>
        <Grid item xs={12}>
          <Suggestions products={latestProducts} title={"Latest Products"} />
        </Grid>
      </Grid>
    </div>
  );
};

Home.propTypes = {
  classes: PropsTypes.object.isRequired
};

export default withStyles(styles)(Home);
