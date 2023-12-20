/* eslint-disable react/prop-types */
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Outlet } from "react-router-dom";
import PageNotFoud from "../components/page-not-found/PageNotFoud";

const PrivateRoute = (props) => {
  const [cookies] = useCookies(["token"]);
  const token = cookies.token || null;
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      const tokenDecode = jwtDecode(token);
      setUser(tokenDecode);
    }
  }, [token]);

  const userRoles = user?.roles || [];
  const allowedRoles = props.allowedRoles || [];

  const isAuthorized = allowedRoles.some((role) => userRoles.includes(role));

  if (isAuthorized) {
    return <Outlet />;
  } else {
    return <PageNotFoud />;
  }
};

PrivateRoute.defaultProps = {
  allowedRoles: [],
};

export default PrivateRoute;
