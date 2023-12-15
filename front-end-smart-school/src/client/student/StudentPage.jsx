import { Header } from '../../components/layouts/Header'
import { SideNav } from '../../components/layouts/SideNav'
import Footer from '../../components/layouts/Footer'

import { SiAddthis } from "react-icons/si";
import { CgImport } from "react-icons/cg";
import { BiExport } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import StudentList from "./components/StudentList";
import "./styles/studentPage.css";
import ButtonPrimary from "../../components/ui/button/ButtonPrimary";
// import ButtonSecondary from "../../components/ui/button/ButtonSecondary";
// import ButtonSuccess from "../../components/ui/button/ButtonSuccess";
// import ButtonDanger from "../../components/ui/button/ButtonDanger";


export const StudentPage = () => {
  return (
    <>
    <Header />
    <SideNav />
    <div className="content-wrapper">
    <div className="header-content">
        <h5>
          {" "}
          <span style={{ opacity: "0.5", fontSize: "30px", color: "#17a4e0" }}>
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
        <div className="karyawan-head">
          <div className="row sub-header-content">
            <div className="col-md-6 add-karyawan">
              <ButtonPrimary
                title="add"
                onClick={""}
                icon={<SiAddthis />}
              />
            </div>
            {/* <div className="col-md-6 right-button-karyawan-list">
              <div>
                <ButtonSecondary title="Import" icon={<CgImport />} />
              </div>
              <div>
                <ButtonSecondary title="Export" icon={<BiExport />} />
              </div>
            </div> */}
          </div>
          {/* <div className="search-box-global">
            <div className="row">
              <div className="col-md-4">
                <label htmlFor="nama-karyawan" className="form-label">
                  Nama Karyawan
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nama-karyawan"
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="karyawan-ID" className="form-label">
                  Karyawan ID
                </label>
                <input type="text" className="form-control" id="karyawan-ID" />
              </div>
              <div className="col-md-4">
                <label htmlFor="karyawan-ID" className="form-label">
                  Karyawan Status
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="karyawan-status"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <label htmlFor="departemen" className="form-label">
                  Departemen
                </label>
                <input type="text" className="form-control" id="karyawan-ID" />
              </div>
              <div className="col-md-4">
                <label htmlFor="karyawan-ID" className="form-label">
                  Kantor Cabang
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="kantor-cabang"
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="karyawan-ID" className="form-label">
                  Jabatan
                </label>
                <input type="text" className="form-control" id="jabatan" />
              </div>
            </div>

            <div className="col-md-6 button-search-karyawan">
              <ButtonSuccess title="search" />
              <ButtonDanger title="reset" />
            </div>
          </div> */}
        </div>

        <StudentList />
      </div>
      
    </div>
    <Footer/>
    </>
  )
}
