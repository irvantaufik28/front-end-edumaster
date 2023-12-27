import SideBar from "../../components/layouts/SideBar";
import Topbar from "../../components/layouts/TopBar";
import HeaderContentGlobal from "../../components/ui/header/HeaderContentGlobal";
import StaffTeacherDetail from "./components/StaffTeacherDetail";

const  StaffTeacherDetailPage = () => {
  return (
    <>
      <Topbar />
      <div className="content">
        <SideBar />
        <div className="main-content">
         <HeaderContentGlobal page={"Teacher"} type={"Detail"} title={"Teacher"}/>
          <div className="main-content-alpha">
            <StaffTeacherDetail/>
          </div>
        </div>
      </div>
    </>
  );
}

export default StaffTeacherDetailPage;
