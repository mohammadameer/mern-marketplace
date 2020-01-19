import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";

import Home from "./core/Home";
import Menu from "./core/Menu";

// sign-in and sign-up
import Signup from "./auth/Signup";
import SignIn from "./auth/Signin";

// user
import Users from "./user/Users";
import Profile from "./user/Profile";
import EditProfile from "./user/EditProfile";

// shop
import NewShop from "./shop/NewShop";
import MyShops from "./shop/MyShops";
import Shops from "./shop/Shops";
import Shop from "./shop/Shop";
import EditShop from "./shop/EditShop";

// product
import NewProduct from "./product/NewProduct";
import Product from "./product/Product";
import EditProduct from "./product/EditProduct";

class MainRouter extends Component {
  render() {
    return (
      <Fragment>
        <Menu />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          {/* sign in and sign up */}
          <Route exact path="/users">
            <Users />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/signin">
            <SignIn />
          </Route>
          {/* user */}
          <Route exact path="/user/:userId">
            <Profile />
          </Route>
          <PrivateRoute exact path="/user/edit/:userId">
            <EditProfile />
          </PrivateRoute>
          {/* shop */}
          <Route exact path="/shops/all">
            <Shops />
          </Route>
          <Route exact path="/shops/:shopId">
            <Shop />
          </Route>
          <PrivateRoute exact path="/seller/shops/edit/:shopId">
            <EditShop />
          </PrivateRoute>
          <PrivateRoute exact path="/seller/shops/:shopId/products/new">
            <NewProduct />
          </PrivateRoute>
          <PrivateRoute exact path="/seller/shops/new">
            <NewShop />
          </PrivateRoute>
          <PrivateRoute exact path="/seller/shops">
            <MyShops />
          </PrivateRoute>
          {/* products */}
          <Route exact path="/products/:productId">
            <Product />
          </Route>
          <Route exact path="/seller/:shopId/:productId/edit">
            <EditProduct />
          </Route>
        </Switch>
      </Fragment>
    );
  }
}

export default MainRouter;
