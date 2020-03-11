import React from "react";
import { Route, Redirect } from "react-router-dom";

// renders C if we have an authenticated user, if not,
// redirects to login
export default ({ component: C, props: cProps, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      cProps.isAuthenticated
        ? <C {...props} {...cProps} />
        : <Redirect
            to={'/login'}
          />}
  />;
