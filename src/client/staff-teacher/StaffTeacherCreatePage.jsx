import Footer from "../../components/layouts/Footer";
import SideBarList from "../../components/layouts/SideBarList";
import TopBarList from "../../components/layouts/TopBarList";
import HeaderContentGlobal from "../../components/ui/header/HeaderContentGlobal";
import FormCreateTeacher from "./components/FormCreateTeacher";

const StaffTeacherCreatePage = () => {
  return (
    <>
      <div id="wrapper">
        <SideBarList />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <TopBarList />
            <div className="main-content">
              <HeaderContentGlobal
                title={"Teacher"}
                page={"teacher"}
                type={"Add"}
              />
              <div className="main-content-alpha">
                <FormCreateTeacher />
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

export default StaffTeacherCreatePage;
