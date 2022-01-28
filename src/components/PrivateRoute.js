import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute(props) {
  const { component: Component, redirectTo = '/', ...rest } = props;
  return (
    <Route
      {...rest}
      render={(routerProps) => {
        if (localStorage.getItem('token')) {
          return <Component {...routerProps} />;
        } else {
          return <Redirect to={redirectTo} />;
        }
      }}
    />
  );
}

export default PrivateRoute;

//Task List:
//1. Complete PrivateRoute
