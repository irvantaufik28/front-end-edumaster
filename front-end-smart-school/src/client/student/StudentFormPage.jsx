import { SideNav } from "../../components/layouts/SideNav";
import Footer from "../../components/layouts/Footer";
import FormStudent from "./components/FromStudent";
import { Header } from "../../components/layouts/Header";

function StudentFormPage() {
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
              <span style={{ opacity: "0.5" }}> Home/ Student / List</span>
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
