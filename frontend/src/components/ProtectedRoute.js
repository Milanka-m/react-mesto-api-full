import React from 'react';
import { Route, Redirect } from "react-router-dom";

// если пользователь залогинен в компонент попадут все пропсы переданные в ProtectedRoute 
const ProtectedRoute = ({ component: Component, ...props  }) => {
  return (
    <Route>
      {
        () => props.loggedIn === true ? <Component {...props} /> : <Redirect to="./sign-in" />
      }
    </Route>
)}

export default ProtectedRoute;