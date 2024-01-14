import { SiAddthis } from "react-icons/si";
import { CgImport } from "react-icons/cg";
import { BiExport } from "react-icons/bi";
import ClassroomList from "./components/ClassroomList";
import "./styles/classroomPage.css";
import ButtonPrimary from "../../components/ui/button/ButtonPrimary";
import ButtonSecondary from "../../components/ui/button/ButtonSecondary";
import ButtonSuccess from "../../components/ui/button/ButtonSuccess";
import ButtonDanger from "../../components/ui/button/ButtonDanger";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { classMajorSelector, getAll } from "../../features/classMajorSlice";
import FormModal from "./components/FormModal";
import axios from "axios";
import config from "../../config";
import Topbar from "../../components/layouts/TopBar";
import SideBar from "../../components/layouts/SideBar";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import HeaderContentGlobal from "../../components/ui/header/HeaderContentGlobal";

export const ClassroomPage = () => {
  const navigate = useNavigate();
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
    try {
      const id = data.id;
      const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
      const { data: resData } = await axios.get(
        config.apiUrl + `/classroom/` + id, {
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

          await axios.delete(config.apiUrl + `/classroom/` + id, {
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

  const handleManage = (data) => {
    navigate("/classroom/manage/" + data.id);
  };

  const onSubmitSuccess = () => {
    handleCloseForm();
    tableRef.current.refreshData();
  };

  const classMajor = useSelector(classMajorSelector.selectAll);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [search, setSearch] = useState({
    code: "",
    level: "",
    class_major_id: "",
    year_group: "",
    status: "",
  });

  const handleSearch = (e) => {
    e.preventDefault();
    tableRef.current.doFilter({
      code: search.code,
      level: search.level,
      class_major_id: search.class_major_id,
      year_group: search.year_group,
      status: search.status,
    });
  };
  const handleReset = (e) => {
    e.preventDefault();
    setSearch({
      code: "",
      level: "",
      class_major_id: "",
      year_group: "",
      status: "",
    });
    tableRef.current.doFilter({
      code: "",
      level: "",
      class_major_id: "",
      year_group: "",
      status: "",
    });
    document.getElementById("level").value = "";
    document.getElementById("code").value = "";
    document.getElementById("class_major_id").value = "";
    document.getElementById("year_group").value = "";
    document.getElementById("status").value = "";
  };

  return (
    <>
      <Topbar />
      <div className="content">
        <SideBar />
        <div className="main-content">
          <HeaderContentGlobal page={"Classrom"} title={"Classroom"} type={"List"} />
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
                <div className="col-md-6 right-button-classroom-list">
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
                  <div className="col-md-4 mb-4">
                    <label htmlFor="nama-classroom" className="form-label">
                      code
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="code"
                      onChange={(e) =>
                        setSearch({ ...search, ...{ code: e.target.value } })
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="class" className="form-label">
                      Class
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="level"
                      onChange={(e) =>
                        setSearch({ ...search, ...{ level: e.target.value } })
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="classMajor" className="form-label">
                      Class Major
                    </label>
                    <div>
                      <select
                        className="form-control"
                        aria-label="Default select example"
                        id="class_major_id"
                        onChange={(e) =>
                          setSearch({
                            ...search,
                            ...{ class_major_id: e.target.value },
                          })
                        }
                      >
                        <option selected value={""}>
                          select class major
                        </option>
                        {classMajor?.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <label htmlFor="year" className="form-label">
                      Year
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="year_group"
                      onChange={(e) =>
                        setSearch({
                          ...search,
                          ...{ year_group: e.target.value },
                        })
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
                        <option value="not_active">Not Active</option>
                        <option value="preparation">Preparation</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 button-search-classroom">
                  <ButtonSuccess title="search" onClick={handleSearch} />
                  <ButtonDanger title="reset" onClick={handleReset} />
                </div>
              </div>
            </div>

            <ClassroomList
              ref={tableRef}
              onEdit={(data) => handleEdit(data)}
              onDelete={(data) => handleDelete(data)}
              onManage={(data) => handleManage(data)}
            />
          </div>
        </div>
      </div>

      <FormModal
        {...formModal}
        onHide={handleCloseForm}
        onSuccess={onSubmitSuccess}
      />
    </>
  );
};
