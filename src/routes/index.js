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
import Profile from './Profile';
import Projects from './Projects';
import OpenProject from './openProject';

import firebase from '../config/firebase';

import PrivateRoute from '../components/PrivateRoute';

class Routes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };
  }

  componentWillMount() {
    this.authListener();
  }
  //check local storage
  authListener = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
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
  };

  render() {
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Redirect exact from="/" to="/signin" />
            <Route exact path="/user-registration" component={Registration} />

            <Route exact path="/user-profile/projects" component={Projects} />
            <Route exact path="/open-project" component={OpenProject} />

            <Route
              exact
              path="/dashboard/projects/:id"
              component={OpenProject}
            />

            <Route
              exact
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
              exact
              path="/user-profile"
              component={Profile}
              user={this.state.user}
            />
            <PrivateRoute
              exact
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
