import Footer from "../../components/layouts/Footer";
import SideBarList from "../../components/layouts/SideBarList";
import TopBarList from "../../components/layouts/TopBarList";
import HeaderContentGlobal from "../../components/ui/header/HeaderContentGlobal";
import StaffOfficeDetail from "./components/StaffOfficeDetail";

const StaffOfficeDetailPage = () => {
  return (
    <>
      <div id="wrapper">
        <SideBarList />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <TopBarList />
            <div className="main-content">
              <HeaderContentGlobal
                page={"Staff"}
                type={"Detail"}
                title={"Staff"}
              />
              <div className="main-content-alpha">
                <StaffOfficeDetail />
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

export default StaffOfficeDetailPage;
