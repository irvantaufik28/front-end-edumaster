import { useNavigate } from "react-router-dom";
import "./styles/sidebarlist.css";
import { SiGoogletagmanager } from "react-icons/si";
import { BsPersonWorkspace } from "react-icons/bs";
import { TbReportSearch } from "react-icons/tb";
import { MdPayment } from "react-icons/md";

import { MdHome } from "react-icons/md";
const SideBarStudent = () => {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

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

        {/* Nav Item - Pages Collapse Menu */}
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#home"
            aria-expanded="true"
            aria-controls="product"
            onClick={() => handleNavigation("/student-page/home")}
          >
            <i className="sidebar-icon">
              <MdHome />
            </i>
            <span>Home</span>
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#myclassroom"
            aria-expanded="true"
            aria-controls="order"
            
          >
            <i className="sidebar-icon">
              <BsPersonWorkspace />
            </i>
            <span>My Classroom</span>
          </a>
          <div
            id="myclassroom"
            className="collapse sidebar-wraper"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="inner-list py-2 collapse-inner rounded">
              <a
                className="collapse-item"
                onClick={() => handleNavigation("/student-page/classrom")}
              >
                Classroom
              </a>
              <a
                className="collapse-item"
                onClick={() => handleNavigation("/student-page/homework")}
              >
                Homework
              </a>
            </div>
          </div>
        </li>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#report"
            aria-expanded="true"
            aria-controls="order"
          >
            <i className="sidebar-icon">
              <TbReportSearch />
            </i>
            <span>Report</span>
          </a>
          <div
            id="report"
            className="collapse sidebar-wraper"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="inner-list py-2 collapse-inner rounded">
              <a
                className="collapse-item"
                onClick={() => handleNavigation("/student-page/grades")}
              >
                Grades
              </a>
              <a
                className="collapse-item"
                onClick={() => handleNavigation("/student-page/test-score")}
              >
                Test Score
              </a>
            </div>
          </div>
        </li>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#schoolfees"
            aria-expanded="true"
            aria-controls="order"
          >
            <i className="sidebar-icon">
              <MdPayment />
            </i>
            <span>School Fees</span>
          </a>
          <div
            id="schoolfees"
            className="collapse sidebar-wraper"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="inner-list py-2 collapse-inner rounded">
              <a
                className="collapse-item"
                onClick={() => handleNavigation("/student-page/school-fees/payment")}
              >
                Mandatory Payment
              </a>
              <a
                className="collapse-item"
                onClick={() => handleNavigation("/student-page/school-fees/donation")}
              >
                 Donation
              </a>
            </div>
          </div>
        </li>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#schoolshop"
            aria-expanded="true"
            aria-controls="order"
          >
            <i className="sidebar-icon">
              <MdPayment />
            </i>
            <span>School Shop</span>
          </a>
          <div
            id="schoolshop"
            className="collapse sidebar-wraper"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="inner-list py-2 collapse-inner rounded">
              <a
                className="collapse-item"
                onClick={() => handleNavigation("/student-page/shop")}
              >
                Product
              </a>
              <a
                className="collapse-item"
                onClick={() => handleNavigation("/student-page/shop/cart")}
              >
                 Cart
              </a>
              <a
                className="collapse-item"
                onClick={() => handleNavigation("/student-page/shop/payment")}
              >
                 Payment
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

export default SideBarStudent;
