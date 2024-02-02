import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import classroomSlice from "./features/classroomSlice";
import classMajorSlice from "./features/classMajorSlice";
import studentSlice from "./features/studentSlice";
import studentParentSlice from "./features/studentParentSlice";
import courseSlice from "./features/courseSlice";
import staffSlice from "./features/staffSlice";
import teacherCourseSlice from "./features/teacherCourse";
import classroomScheduleSlice from "./features/classroomScheduleSlice";
import curriculumSlice from "./features/curriculumSlice";
import roleSlice from "./features/roleSlice";
import categoryProductSlice from "./features/ecommerce/categoryProduct"
import productSlice from "./features/ecommerce/productSlice";
import orderSlice from "./features/ecommerce/orderSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    classroom: classroomSlice,
    classmajor: classMajorSlice,
    student: studentSlice,
    studentParent: studentParentSlice,
    course: courseSlice,
    staff: staffSlice,
    teacherCourse: teacherCourseSlice,
    classroomSchedule: classroomScheduleSlice,
    curriculum : curriculumSlice,
    role : roleSlice,
    categoryProduct: categoryProductSlice,
    product: productSlice,
    order: orderSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
