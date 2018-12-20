import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./components/common/PrivateRoute";

import Navbar from "./components/layouts/Navbar";
import HomePage from "./components/layouts/HomePage";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Profile from "./components/profile/Profile";
import Dogs from "./components/dogs/Dogs";
import NewDog from "./components/dogs/NewDog";
import DogDetail from "./components/dogs/DogDetail";
import AddVaccin from "./components/dogs/AddVaccin";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="app">
            <Navbar />
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={Login} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Switch>
                <PrivateRoute exact path="/profile/:id" component={Profile} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/dogs" component={Dogs} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/newdog" component={NewDog} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/dog/:id/addvaccin"
                  component={AddVaccin}
                />
              </Switch>
            </div>
            <Switch>
              <PrivateRoute exact path="/dog/:id" component={DogDetail} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
