import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectectedRoute({ isAuth: isAuth, component: component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth) {
          return <component />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
}
export default ProtectectedRoute;
