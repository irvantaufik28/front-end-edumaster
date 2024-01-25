import { TiArrowBack } from "react-icons/ti";
import StudentDetail from "./components/StudentDetail";
import { useNavigate } from "react-router-dom";
import SideBarList from "../../components/layouts/SideBarList";
import TopBarList from "../../components/layouts/TopBarList";
import Footer from "../../components/layouts/Footer";

function StudentDetailPage() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div id="wrapper">
        <SideBarList />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <TopBarList />
            <div className="main-content">
              <div className="header-content">
                <div className="title-content">
                  <TiArrowBack className="back-arrow" onClick={handleBack} />
                  <h5>
                    <span style={{ fontSize: "30px", color: "darkblue" }}>
                      Students
                    </span>
                  </h5>
                </div>
                <div className="title-student">
                  <p>
                    <span style={{ opacity: "0.5" }}>
                      {" "}
                      Home / Student / Detail
                    </span>
                  </p>
                </div>
              </div>
              <div className="main-content-alpha">
                <StudentDetail />
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
}

export default StudentDetailPage;
