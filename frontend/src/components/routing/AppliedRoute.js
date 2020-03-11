import React from "react";
import { Route } from "react-router-dom";

// render the component C, but passing along the props
export default ({ component: C, props: cProps, ...rest }) =>
  <Route {...rest} render={props => <C {...props} {...cProps} />} />;
