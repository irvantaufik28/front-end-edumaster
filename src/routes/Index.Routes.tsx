import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SigninPage from "../client/auth/SignPage";
import { StudentPage } from "../client/student/StudentPage";
import DashboardPage from "../client/admin/dashboard/DashboardPage";
import { ClassroomPage } from "../client/classroom/ClassroomPage";
import StudentFormPage from "../client/student/StudentFormPage";
import StudentDetailPage from "../client/student/StudentDetailPage";
import PrivateRoute from "../utils/PrivateRoute";
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
import StaffOfficePage from "../client/staff-office/StaffOfficePage";
import StaffOfficeCreatePage from "../client/staff-office/StaffOfficeCreatePage";
import StaffOfficeDetailPage from "../client/staff-office/StaffOfficeDetailPage";
import EcommeceDashboard from "../pages/ecommerce/dashboard/EcommeceDashboard";
import ProductPage from "../pages/ecommerce/product/ProductPage";
import ProductCreatePage from "../pages/ecommerce/product/ProductCreatePage";
import ProductEditPage from "../pages/ecommerce/product/ProductEditPage";
import OrderPage from "../pages/ecommerce/order/OrderPage";
import HomePage from "../pages/student/home/HomePage";
import ShopProduct from "../pages/student/shop/shop-product/ShopProduct";
import CartPage from "../pages/student/shop/cart/CartPage";
import ShopDetailProduct from "../pages/student/shop/shop-product/ShopDetailProduct";
import PaymentOrder from "../pages/student/shop/payment/PaymentOrder";

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
          <Route path="/staff/office" element={<StaffOfficePage />} />
          <Route path="/staff/office/create" element={<StaffOfficeCreatePage />} />
          <Route
            path="/staff/office/detail/:id"
            element={<StaffOfficeDetailPage />}
          /> <Route
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
        <Route element={<PrivateRoute allowedRoles={["administrator", "staff_tu"]} />}>
        <Route path="/ecommerce/dashboard" element={<EcommeceDashboard />} />
        <Route path="/ecommerce/list-product" element={<ProductPage />} />
        <Route path="/ecommerce/add-product" element={<ProductCreatePage />} />
        <Route path="/ecommerce/edit-product/:id" element={<ProductEditPage />} />
       
        <Route path="/ecommerce/list-order" element={<OrderPage />} />
        </Route>
        
        <Route element={<PrivateRoute allowedRoles={["administrator", "student"]} />}>
        <Route path="/student-page/home" element={<HomePage />} />
        <Route path="/student-page/shop" element={<ShopProduct />} />
        <Route path="/student-page/shop/product/:_id" element={<ShopDetailProduct />} />
        <Route path="/student-page/shop/cart" element={<CartPage />} />
        <Route path="/student-page/shop/order/:_id" element={<PaymentOrder />} />
        </Route>

        
      </Routes>
    </Router>
  );
};

export default IndexRoutes;
