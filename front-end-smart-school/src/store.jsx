import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import classroomSlice from "./features/classroomSlice";
import classMajorSlice from "./features/classMajorSlice";
import studentSlice from "./features/studentSlice";
import studentParentSlice from "./features/studentParentSlice";
import courseSlice from "./features/courseSlice";
import staffSlice from "./features/staffSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    classroom: classroomSlice,
    classmajor: classMajorSlice,
    student: studentSlice,
    studentParent: studentParentSlice,
    course: courseSlice,
    staff : staffSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
