import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const UserDropdown = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const token = cookies.token ?? null;
  const [user, setUser] = useState("");

  useEffect(() => {
    if (token) {
      const tokenDecode = jwtDecode(token);
      setUser(tokenDecode);
    }
  }, [token]);

  const handleLogout = () => {
    Cookies.remove("token", { path: "/" });
    setUser(null);
    navigate("/");
    window.location.reload();
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      <li className="nav-item dropdown no-arrow">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          id="userDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span className="mr-2 d-none d-lg-inline text-gray-600 small">
            {`${user?.user_detail?.first_name} ${user?.user_detail?.last_name}`}
          </span>
          <img
            className="img-profile rounded-circle"
            src={user?.user_detail?.foto_url}
          />
        </a>
        {/* Dropdown - User Information */}
        <div
          className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
          aria-labelledby="userDropdown"
        >
          <a
            className="dropdown-item"
            onClick={() => handleNavigation("/student-page/profile")}
            style={{ cursor: "pointer" }}
          >
            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
            Profile
          </a>
          <a
            className="dropdown-item"
            onClick={() => handleNavigation("/student-page/profile/setting")}
            style={{ cursor: "pointer" }}
          >
            <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
            Settings
          </a>
          <a className="dropdown-item" href="#">
            <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400" />
            Activity Log
          </a>
          <div className="dropdown-divider" />
          <a
            className="dropdown-item"
            href="#"
            data-toggle="modal"
            data-target="#logoutModal"
            onClick={() => handleLogout()}
          >
            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
            Logout
          </a>
        </div>
      </li>
    </>
  );
};

export default UserDropdown;
