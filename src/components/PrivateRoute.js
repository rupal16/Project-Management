import React from 'react';
import { Route, Redirect } from 'react-router-dom';

//import Dashboard from '../routes/Dashboard';

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  console.log(rest);
  console.log(user);
  return (
    <Route
      {...rest}
      render={props =>
        user !== null ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};

export default PrivateRoute;
