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

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
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
            <Route path="/signin" component={Signin} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Routes;
