import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SigninPage from "../client/auth/SignPage";
import { StudentPage } from "../client/student/StudentPage";
import DashboardPage from "../client/admin/dashboard/DashboardPage";
import { ClassroomPage } from "../client/classroom/ClassroomPage";
import StudentFormPage from "../client/student/StudentFormPage";
import StudentDetailPage from "../client/student/StudentDetailPage";
import PrivateRoute from "../utils/PrivateRoute";
import Topbar from "../components/layouts/TopBar";
import SideBar from "../components/layouts/SideBar";
import ManageClassroomPage from "../client/classroom/ManageClassroomPage";
import ClassMajorPage from "../client/admin/classmajor/ClassmajorPage";
import RolePage from "../client/admin/role/RolePage";

const IndexRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SigninPage />} />

        <Route element={<PrivateRoute allowedRoles={["administrator"]} />}>
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/admin/role" element={<RolePage />} />
          <Route path="/admin/classmajor" element={<ClassMajorPage />} />

          <Route path="/student" element={<StudentPage />} />
          <Route path="/student/form" element={<StudentFormPage />} />
          <Route path="/student/detail/:id" element={<StudentDetailPage />} />

          <Route path="/classroom" element={<ClassroomPage />} />
          <Route path="/classmajor" element={<ClassMajorPage />} />
          <Route
            path="/classroom/manage/:id"
            element={<ManageClassroomPage />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default IndexRoutes;
