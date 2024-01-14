import { SiAddthis } from "react-icons/si";
import SideBar from "../../../components/layouts/SideBar";
import Topbar from "../../../components/layouts/TopBar";
import ButtonPrimary from "../../../components/ui/button/ButtonPrimary";
import { useRef, useState } from "react";
import ButtonSuccess from "../../../components/ui/button/ButtonSuccess";
import ButtonDanger from "../../../components/ui/button/ButtonDanger";
import axios from "axios";
import Swal from "sweetalert2";
import config from "../../../config";
import HeaderContentGlobal from "../../../components/ui/header/HeaderContentGlobal";

import CourseList from "./components/CourseList";
import { FaSearch } from "react-icons/fa";
import { RxReset } from "react-icons/rx";
import FormModalCourse from "./components/modals/FormModalCourse";

const CoursePage = () => {
  const defaultFormModal = {
    show: false,
    initialValues: null,
    type: "add",
    editId: null,
  };

  const tableRef = useRef(null);
  const [formModal, setFormModal] = useState(defaultFormModal);

  const handleAdd = () => {
    setFormModal({
      ...defaultFormModal,
      show: true,
      initialValues: null,
    });
  };

  const handleEdit = async (data) => {
    const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

    try {
      const id = data.id;

      const { data: resData } = await axios.get(
        config.apiUrl + `/course/` + id, {
            headers: {
                authorization: token
            }
        }
      );
      setFormModal({
        ...defaultFormModal,
        show: true,
        initialValues: resData.data,
        type: "edit",
        editId: id,
      });
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
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

          await axios.delete(config.apiUrl + `/course/` + id, {
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

  const handleCloseForm = () => {
    setFormModal({
      ...formModal,
      show: false,
    });
  };

  const onSubmitSuccess = () => {
    handleCloseForm();
    tableRef.current.refreshData();
  };

  const [search, setSearch] = useState({
    name: "",
    level: "",
    type: "",
    semester: "",
  });

  const handleSearch = (e) => {
    e.preventDefault();
    tableRef.current.doFilter({
      name: search.name,
      level: search.level,
      type: search.type,
      semester: search.semester
    });
  };
  const handleReset = (e) => {
    e.preventDefault();
    setSearch({
      name: "",
      level: "",
      type: "",
      semester: "",
    });
    tableRef.current.doFilter({
      name: "",
      level: "",
      type: "",
      semester: "",
    });
    document.getElementById("name").value = "";
    document.getElementById("level").value = "";
    document.getElementById("type").value = "";
    document.getElementById("semester").value = "";
  };

  return (
    <>
      <Topbar />
      <div className="content">
        <SideBar />
        <div className="main-content">
          <HeaderContentGlobal page={"Course"} title={"Course"} type={"List"} />
          <div className="main-content-alpha">
            <div className="role-head">
              <div className="row sub-header-content">
                <div className="col-md-6 add-role">
                  <ButtonPrimary
                    title="add"
                    onClick={handleAdd}
                    icon={<SiAddthis />}
                  />
                </div>
              </div>
              <div className="search-box-global">
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label htmlFor="nama-classroom" className="form-label">
                      Course Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      onChange={(e) =>
                        setSearch({ ...search, ...{ name: e.target.value } })
                      }
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="type" className="form-label">
                      Type
                    </label>
                    <div>
                      <select
                        className="form-control"
                        aria-label="Default select example"
                        id="type"
                        onChange={(e) =>
                          setSearch({
                            ...search,
                            ...{ type: e.target.value },
                          })
                        }
                      >
                        <option selected value={""}>
                          select type
                        </option>
                        <option value="MUATAN NASIONAL">Muatan Nasional</option>
                        <option value="MUATAN KEWILAYAHAN">
                          Muatan Kewilayahan
                        </option>
                        <option value="DASAR BIDANG KEAHLIAN">
                          Dasar Bidang Keahlian
                        </option>
                        <option value="DASAR PROGRAM KEAHLIAN">
                          Dasar Program Keahlian
                        </option>
                        <option value="KOMPETENSI KEAHLIAN">
                          Kompetensi Keahlian
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="semester" className="form-label">
                      Semester
                    </label>
                    <div>
                      <select
                        className="form-control"
                        aria-label="Default select example"
                        id="semester"
                        onChange={(e) =>
                          setSearch({
                            ...search,
                            ...{ semester: e.target.value },
                          })
                        }
                      >
                        <option selected value={""}>
                          select semester
                        </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="level" className="form-label">
                      Grade
                    </label>
                    <div>
                      <select
                        className="form-control"
                        aria-label="Default select example"
                        id="level"
                        onChange={(e) =>
                          setSearch({
                            ...search,
                            ...{ level: e.target.value },
                          })
                        }
                      >
                        <option selected value={""}>
                          select grade
                        </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                    </div>
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

            <CourseList
              ref={tableRef}
              onEdit={(data) => handleEdit(data)}
              onDelete={(data) => handleDelete(data)}
            />
          </div>
        </div>
      </div>

      <FormModalCourse
      {...formModal}
      onHide={handleCloseForm}
      onSuccess={onSubmitSuccess}
    />
    </>
  );
};

export default CoursePage;
