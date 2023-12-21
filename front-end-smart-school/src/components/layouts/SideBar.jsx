import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import { FaDatabase, FaCircle } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import "./styles/sidebar.css";
import { ImUsers } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
export default function SideBar() {
  const [isMasterClicked, setIsMasterClicked] = useState(false);
  const [isStudentClicked, setIsStudentClicked] = useState(false);
  const [isStaffClicked, setIsStaffClicked] = useState(false);
  const navigate = useNavigate();

  const handleStaffClick = () => {
    setIsStaffClicked(!isStaffClicked);
  };

  const handleMasterClick = () => {
    setIsMasterClicked(!isMasterClicked);
  };

  const handleStudentClick = () => {
    setIsStudentClicked(!isStudentClicked);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/admin/dashboard" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
            <li
              className={`sidebarListItem ${isMasterClicked ? "active" : ""}`}
              onClick={() => handleMasterClick()}
            >
              <FaDatabase className="sidebarIcon" />
              Master
            </li>
            {isMasterClicked && (
              <ul className="sublink">
                <li
                  className="sidebarListItem"
                  onClick={() => handleNavigation("/classmajor")}
                >
                  <FaCircle className="subSideBarIcon" />
                  class major
                </li>
                <li
                  className="sidebarListItem"
                  onClick={() => handleNavigation("/classroom")}
                >
                  <FaCircle className="subSideBarIcon" />
                  classroom
                </li>
                <li
                  className="sidebarListItem"
                  onClick={() => handleNavigation("/relationship")}
                >
                  <FaCircle className="subSideBarIcon" />
                  relationship
                </li>
                <li
                  className="sidebarListItem"
                  onClick={() => handleNavigation("/role")}
                >
                  <FaCircle className="subSideBarIcon" />
                  role
                </li>
                <li
                  className="sidebarListItem"
                  onClick={() => handleNavigation("/role")}
                >
                  <FaCircle className="subSideBarIcon" />
                  permission
                </li>
              </ul>
            )}
            <li
              className={`sidebarListItem ${isStudentClicked ? "active" : ""}`}
              onClick={() => handleStudentClick()}
            >
              <PiStudentFill className="sidebarIcon" />
              Student
            </li>
            {isStudentClicked && (
              <ul>
                <li
                  className="sidebarListItem"
                  onClick={() => handleNavigation("/student")}
                >
                  <FaCircle className="subSideBarIcon" />
                  Student List
                </li>
              </ul>
            )}
            <li
              className={`sidebarListItem ${isStaffClicked ? "active" : ""}`}
              onClick={() => handleStaffClick()}
            >
              <ImUsers className="sidebarIcon" />
              Staff
            </li>
            {isStaffClicked && (
              <ul>
                <li
                  className="sidebarListItem"
                  onClick={() => handleNavigation("/staff/office")}
                >
                  <FaCircle className="subSideBarIcon" />
                  Staff Office
                </li>
                <li
                  className="sidebarListItem"
                  onClick={() => handleNavigation("/staff/office")}
                >
                  <FaCircle className="subSideBarIcon" />
                  Staff Teacher
                </li>
              </ul>
            )}
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <PermIdentity className="sidebarIcon" />
              Users
            </li>
            <li className="sidebarListItem">
              <Storefront className="sidebarIcon" />
              Products
            </li>
            <li className="sidebarListItem">
              <AttachMoney className="sidebarIcon" />
              Transactions
            </li>
            <li className="sidebarListItem">
              <BarChart className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Manage
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
