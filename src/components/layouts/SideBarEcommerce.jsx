import { useNavigate } from "react-router-dom";
import "./styles/sidebarlist.css";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { RxDashboard } from "react-icons/rx";
import { LuShoppingBag } from "react-icons/lu";
import { SiGoogletagmanager } from "react-icons/si";
import { RiShoppingCart2Line } from "react-icons/ri";
const SideBarEcommerce = () => {
  const [cookies] = useCookies(["token"]);
  const token = cookies.token ?? null;
  const [user, setUser] = useState("");

  useEffect(() => {
    if (token) {
      const tokenDecode = jwtDecode(token);
      setUser(tokenDecode);
    }
  }, [token]);

  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  const ecommerceAccsess =
    user.roles &&
    (user.roles.includes("staff_tu") || user.roles.includes("administrator"));
  const cmsAccsess =
    user.roles &&
    (user.roles.includes("staff_admin") ||
      user.roles.includes("administrator"));

  return (
    <>
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="index.html"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="logo-icon">
              {" "}
              <SiGoogletagmanager />
            </i>
          </div>
          <div className="sidebar-brand-text mx-3">Edumaster</div>
        </a>
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#dashboard"
            aria-expanded="true"
            aria-controls="dashboard"
          >
            <i className="sidebar-icon">
              <RxDashboard />
            </i>
            <span>DASHBOARDS</span>
          </a>
          <div
            id="dashboard"
            className="collapse sidebar-wraper"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            {cmsAccsess && (
              <div className="bg-white py-2 collapse-inner rounded">
                <a
                  className="collapse-item"
                  onClick={() => handleNavigation("/admin/dashboard")}
                >
                  CMS DASHBOARD
                </a>
              </div>
            )}
            {ecommerceAccsess && (
              <div className="bg-white py-2 collapse-inner rounded">
                <a
                  className="collapse-item"
                  onClick={() => handleNavigation("/ecommerce/dashboard")}
                >
                  E-COM DASHBOARD
                </a>
              </div>
            )}
          </div>
        </li>

        {/* Nav Item - Pages Collapse Menu */}
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#product"
            aria-expanded="true"
            aria-controls="product"
          >
            <i className="sidebar-icon">
              <LuShoppingBag />
            </i>
            <span>Product</span>
          </a>
          <div
            id="product"
            className="collapse sidebar-wraper"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="inner-list py-2 collapse-inner rounded">
              <a
                className="collapse-item"
                onClick={() => handleNavigation("/ecommerce/list-product")}
              >
                List Product
              </a>
              <a
                className="collapse-item"
                onClick={() => handleNavigation("/ecommerce/add-product")}
              >
                Add Product
              </a>
            </div>
          </div>
        </li>
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#order"
            aria-expanded="true"
            aria-controls="order"
          >
            <i className="sidebar-icon">
              <RiShoppingCart2Line />
            </i>
            <span>Order</span>
          </a>
          <div
            id="order"
            className="collapse sidebar-wraper"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="inner-list py-2 collapse-inner rounded">
              <a
                className="collapse-item"
                onClick={() => handleNavigation("/ecommerce/list-order")}
              >
                List Order
              </a>
              <a
                className="collapse-item"
                onClick={() => handleNavigation("/ecommerce/cancel-order")}
              >
                Canceled
              </a>
              <a
                className="collapse-item"
                onClick={() => handleNavigation("/ecommerce/return-order")}
              >
                Return
              </a>
            </div>
          </div>
        </li>

        <hr className="sidebar-divider d-none d-md-block" />
      </ul>
      {/* End of Sidebar */}
    </>
  );
};

export default SideBarEcommerce;
