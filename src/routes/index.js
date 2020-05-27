import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import history from '../utils/history';
import Registration from './registration';
import Signin from './Signin';
import Dashboard from './Dashboard';
import firebase from '../config/firebase';

import PrivateRoute from '../components/PrivateRoute';

class Routes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    firebase.auth().onAuthStateChanged(user => {
      if (user !== undefined) {
        this.setState({
          user: {
            uid: user.uid,
            phoneNumber: user.phoneNumber,
            displayName: user.displayName,
            email: user.email,
          },
        });
      } else {
        this.setState({ user: null });
      }
    });
  }

  render() {
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Redirect exact from="/" to="/user-registration" />
            <Route path="/user-registration" component={Registration} />
            <Route
              path="/signin"
              render={props =>
                this.state.user !== null ? (
                  <Redirect to="/dashboard" />
                ) : (
                  <Signin />
                )
              }
            />
            <PrivateRoute
              path="/dashboard"
              component={Dashboard}
              user={this.state.user}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Routes;
