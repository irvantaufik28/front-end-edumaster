import StudentDetail from "./components/StudentDetail";

function StudentDetailPage() {
 
  return (
    <>

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
    </>
  );
}

export default StudentDetailPage;
