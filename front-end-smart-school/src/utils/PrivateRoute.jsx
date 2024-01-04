/* eslint-disable react/prop-types */
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Outlet, useNavigate } from "react-router-dom";
import PageNotFound from "../components/page-not-found/PageNotFound";

const PrivateRoute = (props) => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const token = cookies.token || null;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleTokenValidation = () => {
      if (token) {
        const tokenDecode = jwtDecode(token);
        const currentDate = new Date().getTime();
        const isTokenValid = tokenDecode.exp * 1000 > currentDate;

        if (!isTokenValid) {
          navigate('/');
        } else {
          setUser(tokenDecode);
        }
      }
    };

    handleTokenValidation();
  }, [navigate, token]);

  const userRoles = user?.roles || [];
  const allowedRoles = props.allowedRoles || [];

  const isAuthorized = allowedRoles.some((role) => userRoles.includes(role));

  if (isAuthorized) {
    return <Outlet />;
  } else {
    return <PageNotFound />;
  }
};

PrivateRoute.defaultProps = {
  allowedRoles: [],
};

export default PrivateRoute;