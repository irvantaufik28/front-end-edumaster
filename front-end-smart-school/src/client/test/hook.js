import { useSelector } from "react-redux";

export const useClassroomCode = () => {
    return useSelector((state) => state.classroom.code);
  };