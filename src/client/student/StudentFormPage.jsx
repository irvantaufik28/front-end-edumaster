import FormStudent from "./components/FromStudent";
import { useSelector } from "react-redux";
import HeaderContent from "./components/HeaderContent";
import SideBarList from "../../components/layouts/SideBarList";
import TopBarList from "../../components/layouts/TopBarList";
import Footer from "../../components/layouts/Footer";

const StudentFormPage = () => {
  let title = "Create";
  const dataInitialValues = useSelector((state) => state.student.data);
  if (dataInitialValues.type === "edit") title = "Update";
  return (
    <>
      <div id="wrapper">
        <SideBarList />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <TopBarList />
            <div className="main-content">
              <HeaderContent title={"Student"} type={title} />
              <div className="main-content-alpha">
                <FormStudent />
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

export default StudentFormPage;
