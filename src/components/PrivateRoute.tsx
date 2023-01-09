import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


function PrivateRoute({ children, ...rest }: any) {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        currentUser ? (
          children
        ) :  false/* (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        ) */
      }
    />
  );
}

export default PrivateRoute;