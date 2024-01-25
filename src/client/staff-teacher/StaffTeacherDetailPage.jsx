import Footer from "../../components/layouts/Footer";
import SideBarList from "../../components/layouts/SideBarList";
import TopBarList from "../../components/layouts/TopBarList";
import HeaderContentGlobal from "../../components/ui/header/HeaderContentGlobal";
import StaffTeacherDetail from "./components/StaffTeacherDetail";

const StaffTeacherDetailPage = () => {
  return (
    <>
      <div id="wrapper">
        <SideBarList />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <TopBarList />
            <div className="main-content">
              <HeaderContentGlobal
                page={"Teacher"}
                type={"Detail"}
                title={"Teacher"}
              />
              <div className="main-content-alpha">
                <StaffTeacherDetail />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up" />
      </a>
    </>
  );
};

export default StaffTeacherDetailPage;
