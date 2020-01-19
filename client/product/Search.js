import React, { useState } from "react";
import { list } from "./product-api";
import {
  withStyles,
  Card,
  TextField,
  MenuItem,
  Divider,
  Button
} from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import Products from "./Products";

const Search = props => {
  const [state, setState] = useState({
    category: "",
    search: "",
    products: [],
    searched: false
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.value });
  };

  const search = () => {
    if (state.search || state.category) {
      list({
        search: state.search || undefined,
        category: state.category || undefined
      }).then(data => {
        if (data.error) return console.log(data.error);
        setState({ ...state, products: data, searched: true });
      });
    }
  };

  const enterKey = event => {
    if (event.keyCode == 13) {
      event.preventDefault();
      search();
    }
  };

  const { classes } = props;

  return (
    <div>
      <Card className={classes.card}>
        <TextField
          id="select-category"
          select
          label="Select category"
          className={classes.textField}
          value={state.category}
          onChange={handleChange("category")}
          SelectProps={{ MenuProps: { className: classes.menu } }}
          margin="normal"
        >
          <MenuItem value="All">All</MenuItem>
          {props.categories.map(category => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="search"
          label="search"
          type="search"
          onKeyDown={enterKey}
          onChange={handleChange("search")}
          margin="normal"
        />
        <Button
          variant="raised"
          color="primary"
          className={classes.searchButton}
          onClick={search}
        >
          <SearchIcon />
        </Button>
        <Divider />
        <Products products={state.products} searched={state.searched} />
      </Card>
    </div>
  );
};

const styles = theme => ({});

export default withStyles(styles)(Search);
