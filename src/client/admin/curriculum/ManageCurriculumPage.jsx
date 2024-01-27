import ButtonPrimary from "../../../components/ui/button/ButtonPrimary";
import HeaderContentGlobal from "../../../components/ui/header/HeaderContentGlobal";
import { Card, Col, Row, Table } from "react-bootstrap";
import { MdOutlineEdit } from "react-icons/md";
import { SiAddthis } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import {
  curriculumSelector,
  getByIdCurriculum,
} from "../../../features/curriculumSlice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OffCanvasAddCourse from "./components/offcanvas/OffCanvasAddCourse";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../../../config";
import FormModalCourseCurriculum from "./components/modals/FormModalCourseCurriculum";
import SideBarList from "../../../components/layouts/SideBarList";
import TopBarList from "../../../components/layouts/TopBarList";
import Footer from "../../../components/layouts/Footer";
import { RiDeleteBin5Line } from "react-icons/ri";

const ManageCurriculumPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const curriculum = useSelector(curriculumSelector.selectAll);

  const classroomSchedule = curriculum?.classroom_schedule;

  useEffect(() => {
    dispatch(getByIdCurriculum(id));
  }, [dispatch, id]);

  const defaultOffanvas = {
    show: false,
    initialValues: null,
    type: "add",
    editId: null,
  };
  const defaultFromCourseCurriculum = {
    show: false,
    initialValues: null,
    type: "add",
    editId: null,
  };
  const [formOffcanvas, setFormOffcanvas] = useState(defaultOffanvas);
  const [formCourseCurriculum, setFormCourseCurriculum] = useState(
    defaultFromCourseCurriculum
  );

  const handleDelete = async (classroom_schedule_id) => {
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
            config.apiUrl + `/classroom-schedule/` + classroom_schedule_id,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          dispatch(getByIdCurriculum(id));
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

  const handleAdd = () => {
    setFormOffcanvas({
      ...defaultOffanvas,
      show: true,
      initialValues: null,
    });
  };

  const handleUpdateCourse = async (classroom_schedule_id) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const { data: resData } = await axios.get(
        config.apiUrl + `/classroom-schedule/` + classroom_schedule_id,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setFormCourseCurriculum({
        ...defaultFromCourseCurriculum,
        show: true,
        initialValues: resData.data,
        type: "edit",
        editId: classroom_schedule_id,
      });
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const handleCloseOffCanvas = () => {
    setFormOffcanvas({
      ...formOffcanvas,
      show: false,
    });
  };
  const handleCloseFormCourseCurriculum = () => {
    setFormCourseCurriculum({
      ...formCourseCurriculum,
      show: false,
    });
  };

  const onSubmitSuccess = () => {
    handleCloseOffCanvas();
    dispatch(getByIdCurriculum(id));
  };
  return (
    <>
      <div id="wrapper">
        <SideBarList />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <TopBarList />
            <div className="main-content">
              <HeaderContentGlobal
                page={"Curriculum"}
                title={"Curriculum"}
                type={"Manage"}
              />
              <div className="main-content-alpha">
                <Card
                  style={{
                    width: "100%",
                    height: "auto",
                    marginBottom: "20px",
                  }}
                >
                  <Card.Body>
                    <Row>
                      <Col md={6}>
                        <Table>
                          <tbody>
                            <tr>
                              <th className="no-border" width="150">
                                Curriculum Name
                              </th>
                              <td className="no-border">
                                : <span id="text-name">{curriculum?.name}</span>
                              </td>
                            </tr>
                            <tr>
                              <th className="no-border" width="150">
                                Grade
                              </th>
                              <td className="no-border">
                                :{" "}
                                <span id="text-level">{curriculum?.level}</span>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </Col>
                      <Col md={6}>
                        <Table>
                          <tbody>
                            <tr>
                              <th className="no-border" width="150">
                                Year Group
                              </th>
                              <td className="no-border">
                                :{" "}
                                <span id="text-year_group">
                                  {curriculum?.year_group}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <th className="no-border" width="150">
                                Semester
                              </th>
                              <td className="no-border">
                                :{" "}
                                <span id="text-semester">
                                  {" "}
                                  {curriculum?.semester}
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                <Row>
                  <Col md={6}>
                    <div className="title-form-student">Courses List</div>
                  </Col>

                  <div className="button-edit-current-classroom">
                    <ButtonPrimary
                      title="Add Course"
                      icon={<SiAddthis />}
                      onClick={() => handleAdd()}
                    />
                  </div>
                  {classroomSchedule?.length ? (
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th className="th-react-table ">No</th>
                          <th className="th-react-table ">Course</th>
                          <th className="th-react-table ">Meet Per Week</th>
                          <th className="th-react-table ">Type</th>
                          <th className="th-react-table ">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {classroomSchedule?.map((item, index) => (
                          <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>
                              {item?.courses?.name} Kelas {item?.courses?.level}
                            </td>
                            <td>{item?.meet_per_week}</td>
                            <td>{item?.courses?.type}</td>

                            <td>
                              <div className="icon-action">
                                <div
                                  className="icon-action-edit"
                                  title="Delete"
                                >
                                  <MdOutlineEdit
                                    onClick={() => handleUpdateCourse(item?.id)}
                                  />
                                </div>
                                <div
                                  className="icon-action-delete"
                                  title="Delete"
                                >
                                  <RiDeleteBin5Line
                                    onClick={() => handleDelete(item?.id)}
                                  />
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <Card style={{ width: "100%", height: "auto" }}>
                      <Card.Body style={{ textAlign: "center" }}>
                        <p>No data available </p>
                      </Card.Body>
                    </Card>
                  )}
                  <FormModalCourseCurriculum
                    {...formCourseCurriculum}
                    onHide={handleCloseFormCourseCurriculum}
                    onSuccess={onSubmitSuccess}
                  />
                  <OffCanvasAddCourse
                    {...formOffcanvas}
                    onHide={handleCloseOffCanvas}
                    onSuccess={onSubmitSuccess}
                  />
                </Row>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up" />
      </a>
    </>
  );
};

export default ManageCurriculumPage;
