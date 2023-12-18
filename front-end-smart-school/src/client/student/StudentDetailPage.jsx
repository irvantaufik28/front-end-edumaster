import { SideNav } from "../../components/layouts/SideNav";
import Footer from "../../components/layouts/Footer";
import { Header } from "../../components/layouts/Header";
import StudentDetail from "./components/StudentDetail";

function StudentDetailPage() {
 
  return (
    <>
      <Header />
      <SideNav />
      <div className="content-wrapper">
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

      <Footer />
    </>
  );
}

export default StudentDetailPage;
