import { Header } from "../../components/layouts/Header";
import { SideNav } from "../../components/layouts/SideNav";
import Footer from "../../components/layouts/Footer";

import { SiAddthis } from "react-icons/si";
import { CgImport } from "react-icons/cg";
import { BiExport } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import StudentList from "./components/StudentList";
import "./styles/studentPage.css";
import ButtonPrimary from "../../components/ui/button/ButtonPrimary";
import ButtonSecondary from "../../components/ui/button/ButtonSecondary";
import ButtonSuccess from "../../components/ui/button/ButtonSuccess";
import ButtonDanger from "../../components/ui/button/ButtonDanger";
import { useRef, useState } from "react";
import axios from "axios";
import config from "../../config";
import ConfirmationDelete from "../../components/modals/ConfirmationDelete";
import FormModal from "../classroom/components/FormModal";
import { useDispatch } from "react-redux";
import { setData } from "../../features/studentSlice";

export const StudentPage = () => {
  const navigate = useNavigate()
  const dispacth = useDispatch()
  const defaultForm = {
    initialValues: null,
    type: "add",
    editId: null,
  };

  const tableRef = useRef(null);
  const [form, setForm] = useState(defaultForm);

  const handleAdd = () => {
    // setFormModal({
    //   ...defaultFormModal,
    //   show: true,
    //   initialValues: null,
    // });
    dispacth(setData({...defaultForm}))
    
    navigate('/student/add')
    
  };

  const handleEdit = async (data) => {
    try {
      const id = data.id;

      const { data: resData } = await axios.get(
        config.apiUrl + `/student/` + id
      );
      // setFormModal({
      //   ...defaultFormModal,
      //   show: true,
      //   initialValues: resData.data,
      //   type: "edit",
      //   editId: id,
      // });
      console.log(data)
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const handleDelete = async (data) => {
    const id = data.id;
    const url = config.apiUrl + `/student/` + id;
    await ConfirmationDelete(url);
    tableRef.current.refreshData();
  };

  const handleCloseForm = () => {
    // setFormModal({
    //   ...formModal,
    //   show: false,
    // });
  };

  const onSubmitSuccess = (type) => {
    handleCloseForm();
    tableRef.current.refreshData();
    // if (["edit", "delete"].includes(type)) {
    //   tableRef.current.reloadData();
    // } else {
    //   tableRef.current.refreshData();
    // }
  };


  const [search, setSearch] = useState({
    nis: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    register_year: "",
    status: "",
  });

  const handleSearch = (e) => {
    e.preventDefault();
    tableRef.current.doFilter({
      nis: search.nis,
      first_name: search.first_name,
      middle_name: search.middle_name,
      last_name: search.last_name,
      register_year: search.register_year,
      status: search.status,
    });
  };
  const handleReset = (e) => {
    e.preventDefault();
    setSearch({
      nis: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      status: "",
      register_year: "",
    });
    tableRef.current.doFilter({
      nis: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      status: "",
    });
    document.getElementById("nis").value = "";
    document.getElementById("first_name").value = "";
    document.getElementById("last_name").value = "";
    document.getElementById("middle_name").value = "";
    document.getElementById("status").value = "";
    document.getElementById("register_year").value = "";
  };
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
          <div className="karyawan-head">
            <div className="row sub-header-content">
              <div className="col-md-6 add-karyawan">
                <ButtonPrimary
                  title="add"
                  onClick={handleAdd}
                  icon={<SiAddthis />}
                />
              </div>
              <div className="col-md-6 right-button-student-list">
                <div>
                  <ButtonSecondary title="Import" icon={<CgImport />} />
                </div>
                <div>
                  <ButtonSecondary title="Export" icon={<BiExport />} />
                </div>
              </div>
            </div>
            <div className="search-box-global">
              <div className="row">
                <div className="col-md-4">
                  <label htmlFor="nama-classroom" className="form-label">
                    NIS
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nis"
                    onChange={(e) =>
                      setSearch({ ...search, ...{ nis: e.target.value } })
                    }
                  />
                </div>
                
                <div className="col-md-4">
                  <label htmlFor="status" className="form-label">
                    Status
                  </label>
                  <div>
                    <select
                      className="form-control"
                      aria-label="Default select example"
                      id="status"
                      onChange={(e) =>
                        setSearch({
                          ...search,
                          ...{ status: e.target.value },
                        })
                      }
                    >
                      <option selected value={""}>
                        select status
                      </option>
                      <option value="active">Active</option>
                      <option value="preparation">Preparation</option>
                      <option value="drop_out">Drop Out</option>
                      <option value="graduate">Graduate</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <label htmlFor="class" className="form-label">
                    Register Year
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="register_year"
                    onChange={(e) =>
                      setSearch({
                        ...search,
                        ...{ register_year: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
              <div className="row">
              <div className="col-md-4">
                  <label htmlFor="class" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="first_name"
                    onChange={(e) =>
                      setSearch({
                        ...search,
                        ...{ first_name: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="year" className="form-label">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="middle_name"
                    onChange={(e) =>
                      setSearch({
                        ...search,
                        ...{ middle_name: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="year" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="last_name"
                    onChange={(e) =>
                      setSearch({
                        ...search,
                        ...{ last_name: e.target.value },
                      })
                    }
                  />
                </div>
               
              </div>

              <div className="col-md-6 button-search-student">
                <ButtonSuccess title="search" onClick={handleSearch} />
                <ButtonDanger title="reset" onClick={handleReset} />
              </div>
            </div>
          </div>

          <StudentList
            ref={tableRef}
            onEdit={(data) => handleEdit(data)}
            onDelete={(data) => handleDelete(data)}
          />
        </div>
      </div>
      <Footer />
      <FormModal
        // {...formModal}
        // onHide={handleCloseForm}
        // onSuccess={onSubmitSuccess}
      />
    </>
  );
};
