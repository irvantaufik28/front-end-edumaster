import SideBar from "../../components/layouts/SideBar";
import Topbar from "../../components/layouts/TopBar";
import HeaderContentGlobal from "../../components/ui/header/HeaderContentGlobal";
import FormCreateTeacher from "./components/FormCreateTeacher";

const StaffTeacherCreatePage = () => {
  return (
    <>
      <Topbar />
      <div className="content">
        <SideBar />
        <div className="main-content">
          <HeaderContentGlobal title={"Teacher"} page={"teacher"} type={"Add"} />
          <div className="main-content-alpha">
            <FormCreateTeacher />
            </div>
        </div>
      </div>
    </>
  );
};

export default StaffTeacherCreatePage;
