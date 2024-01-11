import SideBar from "../../components/layouts/SideBar";
import Topbar from "../../components/layouts/TopBar";
import HeaderContentGlobal from "../../components/ui/header/HeaderContentGlobal";
import FormCreateStaff from "./components/FormCreateStaff";

const StaffOfficeCreatePage = () => {
  return (
    <>
      <Topbar />
      <div className="content">
        <SideBar />
        <div className="main-content">
          <HeaderContentGlobal title={"Staff"} page={"Staff"} type={"Add"} />
          <div className="main-content-alpha">
            <FormCreateStaff />
            </div>
        </div>
      </div>
    </>
  );
};

export default StaffOfficeCreatePage;
