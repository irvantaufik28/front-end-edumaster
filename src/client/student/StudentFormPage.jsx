import SideBar from "../../components/layouts/SideBar";
import Topbar from "../../components/layouts/TopBar";
import FormStudent from "./components/FromStudent";
import { useSelector } from "react-redux";
import HeaderContent from "./components/HeaderContent";

const StudentFormPage = () => {
  let title = "Create";
  const dataInitialValues = useSelector((state) => state.student.data);
  if (dataInitialValues.type === "edit") title = "Update";
  return (
    <>
      <Topbar />
      <div className="content">
        <SideBar />
        <div className="main-content">
          <HeaderContent title={"Student"} type={title} />
          <div className="main-content-alpha">
            <FormStudent />
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentFormPage;
