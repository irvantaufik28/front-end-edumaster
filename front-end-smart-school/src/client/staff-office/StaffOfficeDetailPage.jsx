import SideBar from "../../components/layouts/SideBar";
import Topbar from "../../components/layouts/TopBar";
import HeaderContentGlobal from "../../components/ui/header/HeaderContentGlobal";
import StaffOfficeDetail from "./components/StaffOfficeDetail";

const  StaffOfficeDetailPage = () => {
  return (
    <>
      <Topbar />
      <div className="content">
        <SideBar />
        <div className="main-content">
         <HeaderContentGlobal page={"Staff"} type={"Detail"} title={"Staff"}/>
          <div className="main-content-alpha">
            <StaffOfficeDetail/>
          </div>
        </div>
      </div>
    </>
  );
}

export default StaffOfficeDetailPage;
