import Footer from "../Footer";
import SideBarStudent from "./SideBarStudent";
import StudentTopBar from "./StudentTopBar";

// eslint-disable-next-line react/prop-types
const StudentLayout = ({ children }) => {
    return (
      <>
        <div id="wrapper">
          <SideBarStudent />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <StudentTopBar />
              {children}
            </div>
            <Footer />
          </div>
        </div>
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up"></i>
        </a>
      </>
    );
  };
  
  export default StudentLayout;