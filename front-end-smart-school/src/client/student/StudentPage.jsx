import { FaSearch } from "react-icons/fa";
import { SiAddthis } from "react-icons/si";
import { CgImport } from "react-icons/cg";
import { BiExport } from "react-icons/bi";
import { RxReset } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import StudentList from "./components/StudentList";
import "./styles/studentPage.css";
import ButtonPrimary from "../../components/ui/button/ButtonPrimary";
import ButtonSuccess from "../../components/ui/button/ButtonSuccess";
import ButtonDanger from "../../components/ui/button/ButtonDanger";
import { useRef, useState } from "react";
import axios from "axios";
import config from "../../config";
import ConfirmationDelete from "../../components/modals/ConfirmationDelete";

import { useDispatch } from "react-redux";
import { setDataStudent } from "../../features/studentSlice";
import Topbar from "../../components/layouts/TopBar";
import SideBar from "../../components/layouts/SideBar";
import HeaderContent from "./components/HeaderContent";
export const StudentPage = () => {
  const navigate = useNavigate();
  const dispacth = useDispatch();
  const defaultForm = {
    initialValues: null,
    type: "add",
    editId: null,
  };

  const tableRef = useRef(null);

  const handleAdd = () => {
    dispacth(setDataStudent({ ...defaultForm }));
    navigate("/student/form");
  };

  const handleEdit = async (data) => {
    try {
      const id = data.id;

      const { data: resData } = await axios.get(
        config.apiUrl + `/student/` + id
      );

      dispacth(
        setDataStudent({
          ...defaultForm,
          initialValues: resData,
          type: "edit",
          editId: id,
        })
      );
      navigate("/student/form");
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const handleDetail = async (data) => {
    navigate("/student/detail/" + data.id);
  };

  const handleDelete = async (data) => {
    const id = data.id;
    const url = config.apiUrl + `/student/` + id;
    await ConfirmationDelete(url);
    tableRef.current.refreshData();
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
      <Topbar />
      <div className="content">
        <SideBar />
        <div className="main-content">
          <HeaderContent 
          title={'Student'}
          type={'List'}
          />
          <div className="main-content-alpha">
            <div className="student-head">
              <div className="row sub-header-content">
                <div className="col-md-6 add-student">
                  <ButtonPrimary
                    title="add"
                    onClick={handleAdd}
                    icon={<SiAddthis />}
                  />
                </div>
                <div className="col-md-6 right-button-student-list">
                  <div>
                    <ButtonPrimary title="Import" icon={<CgImport />} />
                  </div>
                  <div>
                    <ButtonPrimary title="Export" icon={<BiExport />} />
                  </div>
                </div>
              </div>
              <div className="search-box-global">
                <div className="row">
                  <div className="col-md-4 mb-4">
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
                  <ButtonSuccess
                    title="search"
                    icon={<FaSearch />}
                    onClick={handleSearch}
                  />
                  <ButtonDanger
                    title="reset"
                    icon={<RxReset />}
                    onClick={handleReset}
                  />
                </div>
              </div>
            </div>

            <StudentList
              ref={tableRef}
              onEdit={(data) => handleEdit(data)}
              onDelete={(data) => handleDelete(data)}
              onDetail={(data) => handleDetail(data)}
            />
          </div>
        </div>
      </div>
    </>
  );
};
