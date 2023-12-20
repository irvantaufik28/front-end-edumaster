import FormStudent from "./components/FromStudent";
import { useSelector } from "react-redux";

function StudentFormPage() {
  let title = "Create";
  const dataInitialValues = useSelector((state) => state.student.data);
  if (dataInitialValues.type === "edit") title = "Update";
 
  return (
    <>
   
      <div className="main-content">
        <div className="header-content">
          <h5>
            {" "}
            <span
              style={{ opacity: "0.5", fontSize: "30px", color: "#17a4e0" }}
            >
              Students
            </span>
          </h5>
          <div className="title-student">
            <p>
              {" "}
              <span style={{ opacity: "0.5" }}> Home / Student / {title}</span>
            </p>
          </div>
        </div>
        <div className="main-content-alpha">
          <FormStudent />
        </div>
      </div>

    </>
  );
}

export default StudentFormPage;
