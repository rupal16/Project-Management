import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Registration from "./registration";
import Dashboard from "./Dashboard";
import firebase from "../config/firebase";

class Routes extends Component {
    constructor(props) {
        super(props);
        this.state = {
        user: {}
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
            <Router>
            <Switch>
                <Route path="/user-registration" component={Registration} />
                <Route path="/dashboard" component={Dashboard} />
            </Switch>
            </Router>
        </div>
        );
    }
    }

export default Routes;
