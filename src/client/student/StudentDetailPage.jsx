import { TiArrowBack } from "react-icons/ti";
import StudentDetail from "./components/StudentDetail";
import { useNavigate } from "react-router-dom";
import CmsLayout from "../../components/layouts/CmsLayout";

function StudentDetailPage() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      <CmsLayout>
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
      </CmsLayout>
    </>
  );
}

export default StudentDetailPage;
