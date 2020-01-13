import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Users from "./user/Users";
import Signup from "./auth/Signup";
import SignIn from "./auth/Signin";
import Profile from "./user/Profile";
import EditProfile from "./user/EditProfile";
import PrivateRoute from "./auth/PrivateRoute";
import Menu from "./core/Menu";
import NewShop from "./shop/NewShop";
import MyShops from "./shop/MyShops";
import Shops from "./shop/Shops";
import Shop from "./shop/Shop";
import EditShop from "./shop/EditShop";

class MainRouter extends Component {
  render() {
    return (
      <Fragment>
        <Menu />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/users">
            <Users />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/signin">
            <SignIn />
          </Route>
          <Route exact path="/user/:userId">
            <Profile />
          </Route>
          <PrivateRoute exact path="/user/edit/:userId">
            <EditProfile />
          </PrivateRoute>
          <Route exact path="/shops/all">
            <Shops />
          </Route>
          <Route exact path="/shops/:shopId">
            <Shop />
          </Route>
          <PrivateRoute exact path="/shops/edit/:shopId">
            <EditShop />
          </PrivateRoute>
          <PrivateRoute exact path="/seller/shop/new">
            <NewShop />
          </PrivateRoute>
          <PrivateRoute exact path="/seller/shops">
            <MyShops />
          </PrivateRoute>
        </Switch>
      </Fragment>
    );
  }
}

export default MainRouter;
