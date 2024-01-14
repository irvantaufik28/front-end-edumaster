/* eslint-disable react/prop-types */
import { Button, Offcanvas } from "react-bootstrap";
import { useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { RxReset } from "react-icons/rx";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import ButtonSuccess from "../../../../../components/ui/button/ButtonSuccess";
import ButtonDanger from "../../../../../components/ui/button/ButtonDanger";
import config from "../../../../../config";
import OffCanvasListCourse from "./OffCavasListCourse";

const OffCanvasAddCourse = (props) => {

  const timeTables = useSelector((state) => state.course.dataCheckBox);
  const tableRef = useRef(null);
  const handleAdd = async () => {
    const payload = {
      timeTables: timeTables
    }
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      });

      if (result.isConfirmed) {
        try {
          const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];

          await axios.post(
            config.apiUrl + `/classroom-schedule/structure-curriculum-template`,
            payload,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          props.onSuccess();
          Swal.fire({
            title: "Created!",
            text: "successfully created schedule.",
            icon: "success",
          });
        } catch (error) {
          console.error(error);
          Swal.fire({
            title: "Error",
            text: "Failed to Created Schedule. Please try again.",
            icon: "error",
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
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
    <Offcanvas
      placement="end"
      backdrop="static"
      show={props.show}
      onHide={props.onHide}
      style={{ width: "150vh" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Add Course Curriculum</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <>
          <div className="main-content-alpha">
            <div className="student-head">
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

            <OffCanvasListCourse ref={tableRef} />

            <div className="button-student-moved">
              {timeTables?.length == 0}
              <Button
                variant="primary"
                disabled={timeTables?.length === 0}
                onClick={handleAdd}
              >
                {" "}
                save
              </Button>
            </div>
          </div>
        </>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

OffCanvasAddCourse.defaultProps = {
  onHide: () => {},
  show: false,
  onSuccess: () => {},
};

export default OffCanvasAddCourse;
