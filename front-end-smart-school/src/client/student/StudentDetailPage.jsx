import SideBar from "../../components/layouts/SideBar";
import Topbar from "../../components/layouts/TopBar";
import StudentDetail from "./components/StudentDetail";

function StudentDetailPage() {
  return (
    <>
      <Topbar />
      <div className="content">
        <SideBar />
        <div className="main-content">
          <div className="header-content">
            <h5>
              {" "}
              <span
                style={{ opacity: "0.5", fontSize: "30px", color: "#17a4e0" }}
              >
                Student
              </span>
            </h5>
            <div className="title-student">
              <p>
                {" "}
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
