import { FaSearch } from "react-icons/fa";
import { SiAddthis } from "react-icons/si";
import { CgImport } from "react-icons/cg";
import { BiExport } from "react-icons/bi";
import { RxReset } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
// import "./styles/StaffTeacherPage.css";
import ButtonPrimary from "../../components/ui/button/ButtonPrimary";
import ButtonSuccess from "../../components/ui/button/ButtonSuccess";
import ButtonDanger from "../../components/ui/button/ButtonDanger";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import config from "../../config";

import { useDispatch, useSelector } from "react-redux";
import { setDataStudent } from "../../features/studentSlice";
import Topbar from "../../components/layouts/TopBar";
import SideBar from "../../components/layouts/SideBar";
// import HeaderContent from "./components/HeaderContent";
import Swal from "sweetalert2";
import HeaderContentGlobal from "../../components/ui/header/HeaderContentGlobal";
import StaffTeacherList from "./components/StaffTeacherList";
import { courseSelector, list } from "../../features/courseSlice";

const StaffTeacherPage = () => {
  const courseList = useSelector(courseSelector.selectAll);
  const navigate = useNavigate();
  const dispacth = useDispatch();
  const defaultForm = {
    initialValues: null,
    type: "add",
    editId: null,
  };

  useEffect(() => {
    dispacth(list());
  }, []);

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
    navigate("/staff/teacher/detail/" + data.id);
  };

  const handleDelete = async (data) => {
    const id = data.id;

    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        try {
          const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];

          await axios.delete(config.apiUrl + `/student/` + id, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          });
          tableRef.current.refreshData();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } catch (error) {
          console.error(error);
          Swal.fire({
            title: "Error",
            text: "Failed to delete. Please try again.",
            icon: "error",
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [search, setSearch] = useState({
    nik: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    course_id: "",
    status: "",
  });

  const handleSearch = (e) => {
    e.preventDefault();
    tableRef.current.doFilter({
      nik: search.nik,
      first_name: search.first_name,
      middle_name: search.middle_name,
      last_name: search.last_name,
      course_id: search.course_id,
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
      course_id: "",
    });
    tableRef.current.doFilter({
      nik: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      status: "",
      course_id: "",
    });
    document.getElementById("nik").value = "";
    document.getElementById("first_name").value = "";
    document.getElementById("last_name").value = "";
    document.getElementById("middle_name").value = "";
    document.getElementById("status").value = "";
    document.getElementById("course_id").value = "";
  };
  return (
    <>
      <Topbar />
      <div className="content">
        <SideBar />
        <div className="main-content">
          <HeaderContentGlobal
            title={"Teacher"}
            page={"Teacher"}
            type={"List"}
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
                      NIK
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nik"
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
                    <label htmlFor="course_id" className="form-label">
                      Course
                    </label>
                    <div>
                      <select
                        className="form-control"
                        aria-label="Default select example"
                        id="course_id"
                        onChange={(e) =>
                          setSearch({
                            ...search,
                            ...{ course_id: e.target.value },
                          })
                        }
                      >
                        <option selected value={""}>
                          select Course
                        </option>
                        {courseList?.map((option) => (
                          <option key={option?.id} value={option?.id}>
                            {option?.name} kelas {option?.level}
                          </option>
                        ))}
                      </select>
                    </div>
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

            <StaffTeacherList
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

export default StaffTeacherPage;
