import { TiArrowBack } from "react-icons/ti";
import SideBar from "../../components/layouts/SideBar";
import Topbar from "../../components/layouts/TopBar";
import StudentDetail from "./components/StudentDetail";
import { useNavigate } from "react-router-dom";

function StudentDetailPage() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      <Topbar />
      <div className="content">
        <SideBar />
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
                <span style={{ opacity: "0.5" }}> Home / Student / Detail</span>
              </p>
            </div>
          </div>
          <div className="main-content-alpha">
            <StudentDetail />
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentDetailPage;
