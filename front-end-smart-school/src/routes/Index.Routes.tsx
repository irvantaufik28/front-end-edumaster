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
import StaffTeacherPage from "../client/staff-teacher/StaffTeacherPage";
import StaffTeacherDetailPage from "../client/staff-teacher/StaffTeacherDetailPage";
import CoursePage from "../client/admin/course/CoursePage";
import CurriculumPage from "../client/admin/curriculum/CurriculumPage";
import ManageCurriculumPage from "../client/admin/curriculum/ManageCurriculumPage";
import RoleManagePage from "../client/admin/role/components/RoleManagePage";
import StaffTeacherCreatePage from "../client/staff-teacher/StaffTeacherCreatePage";

const IndexRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SigninPage />} />

        <Route element={<PrivateRoute allowedRoles={["administrator"]} />}>
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/admin/role" element={<RolePage />} />
          <Route path="/admin/role/manage/:id" element={<RoleManagePage />} />
          <Route path="/admin/classmajor" element={<ClassMajorPage />} />
          <Route path="/admin/course" element={<CoursePage />} />
          <Route path="/admin/curriculum" element={<CurriculumPage />} />
          <Route path="/admin/curriculum/manage/:id" element={<ManageCurriculumPage />} />

 

          <Route path="/staff/teacher" element={<StaffTeacherPage />} />
          <Route path="/staff/teacher/create" element={<StaffTeacherCreatePage />} />
          <Route
            path="/staff/teacher/detail/:id"
            element={<StaffTeacherDetailPage />}
          />

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
