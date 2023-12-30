import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ButtonPrimary from "../../../components/ui/button/ButtonPrimary";
import { SiAddthis } from "react-icons/si";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { getById } from "../../../features/classroomSlice";
import OffCanvasAddStudent from "./offcanvas/OffCanvasAddStudent";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../../../config";
import ClassroomStudentList from "./ClassroomStudentList";
import ButtonSuccess from "../../../components/ui/button/ButtonSuccess";
import { FaSearch } from "react-icons/fa";
import ButtonDanger from "../../../components/ui/button/ButtonDanger";
import { RxReset } from "react-icons/rx";

const ManageClassroom = () => {
  const defaultOffanvas = {
    show: false,
    initialValues: null,
    type: "add",
    editId: null,
  };

  const [formOffcanvas, setFormOffcanvas] = useState(defaultOffanvas);

  const tableRef = useRef(null);
  const { id } = useParams();
  const dispacth = useDispatch();

  useEffect(() => {
    dispacth(getById(id));
  }, [dispacth, id]);

  const handleAdd = () => {
    setFormOffcanvas({
      ...defaultOffanvas,
      show: true,
      initialValues: null,
    });
  };

  const handleCloseOffCanvas = () => {
    setFormOffcanvas({
      ...formOffcanvas,
      show: false,
    });
  };

  const onSubmitSuccess = () => {
    handleCloseOffCanvas();
    tableRef.current.refreshData();
  };

  const handleDeleteStudent = async (data) => {
    let student_id = data.id;
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

          await axios.delete(
            config.apiUrl +
              `/classroom/delete/student?student_id=${student_id}&classroom_id=${id}`,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );

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
      <Row>
        <Col md={6}>
          <div className="title-form-student">Students</div>
        </Col>
        <Col md={6}>
          <div className="button-edit-current-classroom">
            <ButtonPrimary
              title="Add Students"
              icon={<SiAddthis />}
              onClick={() => handleAdd()}
            />
          </div>
        </Col>
        <hr></hr>
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
        <ClassroomStudentList
          ref={tableRef}
          onDelete={(data) => handleDeleteStudent(data)}
        />
      </Row>
      <OffCanvasAddStudent
        {...formOffcanvas}
        onHide={handleCloseOffCanvas}
        onSuccess={onSubmitSuccess}
      />
    </>
  );
};

export default ManageClassroom;
