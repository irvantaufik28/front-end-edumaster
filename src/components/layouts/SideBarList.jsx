import { useNavigate } from "react-router-dom";
import "./styles/sidebarlist.css";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { RxDashboard } from "react-icons/rx";
import { PiStudentBold } from "react-icons/pi";
import { ImDatabase, ImUsers } from "react-icons/im";
import { SiGoogleclassroom } from "react-icons/si";
import { SiGoogletagmanager } from "react-icons/si";
const SideBarList = () => {
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
            <i className="logo-icon"> <SiGoogletagmanager /></i> 
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

        <div className="sidebar-heading">Master</div>
        {/* Nav Item - Pages Collapse Menu */}
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#master"
            aria-expanded="true"
            aria-controls="master"
          >
            <i className="sidebar-icon"> <ImDatabase /></i>
            <span>Master Data</span>
          </a>
          <div
            id="master"
            className="collapse sidebar-wraper"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="inner-list py-2 collapse-inner rounded">
              <h6 className="collapse-header">Master Data :</h6>
              <a
                className="collapse-item"
                onClick={() => handleNavigation("/admin/classmajor")}
              >
                Classmajor
              </a>
              <a
                className="collapse-item"
                onClick={() => handleNavigation("/admin/curriculum")}
              >
                Curriculum
              </a>
              <a
                className="collapse-item"
                onClick={() => handleNavigation("/admin/course")}
              >
                Course
              </a>
              <a
                className="collapse-item"
                onClick={() => handleNavigation("/admin/role")}
              >
                Role
              </a>
            </div>
          </div>
        </li>

        <div className="sidebar-heading">Student</div>
        {/* Nav Item - Pages Collapse Menu */}
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#student"
            aria-expanded="true"
            aria-controls="student"
          >
            <i className="sidebar-icon"> <PiStudentBold /> </i>
            <span>Student Manage</span>
          </a>
          <div
            id="student"
            className="collapse sidebar-wraper"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="inner-list py-2 collapse-inner rounded">
              <h6 className="collapse-header">Student</h6>
              <a
                className="collapse-item"
                onClick={() => handleNavigation("/student")}
              >
                List Student
              </a>
            </div>
          </div>
        </li>

        <div className="sidebar-heading">Staff</div>
        {/* Nav Item - Pages Collapse Menu */}
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#staff"
            aria-expanded="true"
            aria-controls="staff"
          >
            <i className="sidebar-icon"><ImUsers/></i> 
            <span>Staff Manage</span>
          </a>
          <div
            id="staff"
            className="collapse sidebar-wraper"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="inner-list py-2 collapse-inner rounded">
              <h6 className="collapse-header">Staff</h6>
              <a
                className="collapse-item"
                onClick={() => handleNavigation("/staff/office")}
              >
                Staff Office
              </a>
              <a
                className="collapse-item"
                onClick={() => handleNavigation("/staff/teacher")}
              >
                Staff Teacher
              </a>
            </div>
          </div>
        </li>

        <div className="sidebar-heading">Classroom</div>
        {/* Nav Item - Pages Collapse Menu */}
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#classroom"
            aria-expanded="true"
            aria-controls="classroom"
          >
            <i className="sidebar-icon"><SiGoogleclassroom/></i>
            <span>Classroom Manage</span>
          </a>
          <div
            id="classroom"
            className="collapse sidebar-wraper"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="inner-list py-2 collapse-inner rounded">
              <h6 className="collapse-header">Manage</h6>
              <a
                className="collapse-item"
                onClick={() => handleNavigation("/classroom")}
              >
                Classroom List
              </a>
            </div>
          </div>
        </li>

        <div className="sidebar-heading">Interface</div>
        {/* Nav Item - Pages Collapse Menu */}
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <i className="fas fa-fw fa-cog" />
            <span>Components</span>
          </a>
          <div
            id="collapseTwo"
            className="collapse sidebar-wraper"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="inner-list py-2 collapse-inner rounded">
              <h6 className="collapse-header">Custom Components:</h6>
              <a className="collapse-item" href="buttons.html">
                Buttons
              </a>
              <a className="collapse-item" href="cards.html">
                Cards
              </a>
            </div>
          </div>
        </li>
        {/* Nav Item - Utilities Collapse Menu */}
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseUtilities"
            aria-expanded="true"
            aria-controls="collapseUtilities"
          >
            <i className="fas fa-fw fa-wrench" />
            <span>Utilities</span>
          </a>
          <div
            id="collapseUtilities"
            className="collapse sidebar-wraper"
            aria-labelledby="headingUtilities"
            data-parent="#accordionSidebar"
          >
            <div className="inner-list py-2 collapse-inner rounded">
              <h6 className="collapse-header">Custom Utilities:</h6>
              <a className="collapse-item" href="utilities-color.html">
                Colors
              </a>
              <a className="collapse-item" href="utilities-border.html">
                Borders
              </a>
              <a className="collapse-item" href="utilities-animation.html">
                Animations
              </a>
              <a className="collapse-item" href="utilities-other.html">
                Other
              </a>
            </div>
          </div>
        </li>
        {/* Divider */}
        <hr className="sidebar-divider" />
        {/* Heading */}
        <div className="sidebar-heading">Addons</div>
        {/* Nav Item - Pages Collapse Menu */}
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapsePages"
            aria-expanded="true"
            aria-controls="collapsePages"
          >
            <i className="fas fa-fw fa-folder" />
            <span>Pages</span>
          </a>
          <div
            id="collapsePages"
            className="collapse sidebar-wraper"
            aria-labelledby="headingPages"
            data-parent="#accordionSidebar"
          >
            <div className="inner-list py-2 collapse-inner rounded">
              <h6 className="collapse-header">Login Screens:</h6>
              <a className="collapse-item" href="login.html">
                Login
              </a>
              <a className="collapse-item" href="register.html">
                Register
              </a>
              <a className="collapse-item" href="forgot-password.html">
                Forgot Password
              </a>
              <div className="collapse-divider" />
              <h6 className="collapse-header">Other Pages:</h6>
              <a className="collapse-item" href="404.html">
                404 Page
              </a>
              <a className="collapse-item" href="blank.html">
                Blank Page
              </a>
            </div>
          </div>
        </li>
        {/* Nav Item - Charts */}
        <li className="nav-item">
          <a className="nav-link" href="charts.html">
            <i className="fas fa-fw fa-chart-area" />
            <span>Charts</span>
          </a>
        </li>
        {/* Nav Item - Tables */}
        <li className="nav-item">
          <a className="nav-link" href="tables.html">
            <i className="fas fa-fw fa-table" />
            <span>Tables</span>
          </a>
        </li>
        {/* Divider */}
        <hr className="sidebar-divider d-none d-md-block" />
      </ul>
      {/* End of Sidebar */}
    </>
  );
};

export default SideBarList;
