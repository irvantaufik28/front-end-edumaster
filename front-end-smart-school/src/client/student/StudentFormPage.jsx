import { SideNav } from "../../components/layouts/SideNav";
import Footer from "../../components/layouts/Footer";
import FormStudent from "./components/FromStudent";
import { Header } from "../../components/layouts/Header";
import { useSelector } from "react-redux";

function StudentFormPage() {
  let title = "Create";
  const dataInitialValues = useSelector((state) => state.student.data);
  if (dataInitialValues.type === "edit") title = "Update";
 
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

      <Footer />
    </>
  );
}

export default StudentFormPage;