import { Card, Col, Row, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ButtonPrimary from "../../../components/ui/button/ButtonPrimary";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { SiAddthis } from "react-icons/si";
import ButtonDanger from "../../../components/ui/button/ButtonDanger";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { classroomSelector, getById } from "../../../features/classroomSlice";
import OffCanvasAddStudent from "./offcanvas/OffCanvasAddStudent";

const ManageClassroom = () => {
    const defaultOffanvas = {
        show: false,
        initialValues: null,
        type: "add",
        editId: null,
      };

const [formOffcanvas, setFormOffcanvas] = useState(defaultOffanvas);

  const { id } = useParams();
  const dispacth = useDispatch();
  const classroom = useSelector(classroomSelector.selectAll);
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
  };

  return (
    <>
      <div className="button-edit-current-classroom">
        <ButtonPrimary
          title="Edit Classroom"
          icon={<MdModeEdit />}
          // onClick={() => handleEditCurrentClassroom()}
        />
      </div>
      <Row>
        <Card style={{ width: "100%", height: "auto" }}>
          <Card.Body>
            <Row>
                <Col md={6}>
            <Table>
              <tbody>
                <tr>
                  <th className="no-border" width="150">
                    Code
                  </th>
                  <td className="no-border">
                    : <span id="text-code">{classroom?.code}</span>
                  </td>
                </tr>
                <tr>
                  <th className="no-border" width="150">
                    Class Major
                  </th>
                  <td className="no-border">
                    :{" "}
                    <span id="text-class_major">
                      {classroom?.classMajor?.name}
                    </span>
                  </td>
                </tr>
                <tr>
                  <th className="no-border" width="150">
                    Grade
                  </th>
                  <td className="no-border">
                    : <span id="text-level">{classroom?.level}</span>
                  </td>
                </tr>
                <tr>
                  <th className="no-border" width="150">
                    Year Group
                  </th>
                  <td className="no-border">
                    : <span id="text-year_group">{classroom?.year_group}</span>
                  </td>
                </tr>
                <tr>
                  <th className="no-border" width="150">
                    Total Student
                  </th>
                  <td className="no-border">
                    :{" "}
                    <span id="text-year_group">
                      {classroom?.students_classroom?.length} Person
                    </span>
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
                    Homeroom Teacher
                  </th>
                  <td className="no-border">
                    : <span id="text-code">Dummy Homeroom Teacher</span>
                  </td>
                </tr>
                <tr>
                  <th className="no-border" width="150">
                    Leader
                  </th>
                  <td className="no-border">
                    :{" "}
                    <span id="text-class_major">
                      Dummy Leader
                    </span>
                  </td>
                </tr>
                <tr>
                  <th className="no-border" width="150">
                    Vice Leader
                  </th>
                  <td className="no-border">
                    : <span id="text-level">
                        Dummy Vice Leadey
                        </span>
                  </td>
                </tr>
                <tr>
                  <th className="no-border" width="150">
                    Secertary
                  </th>
                  <td className="no-border">
                    : <span id="text-year_group">
                        Dummy Secretary
                        </span>
                  </td>
                </tr>
                <tr>
                  <th className="no-border" width="150">
                    Finance
                  </th>
                  <td className="no-border">
                    :{" "}
                    <span id="text-year_group">
                      Dummy Finance
                    </span>
                  </td>
                </tr>
              </tbody>
            </Table>
            </Col>
            </Row>
          </Card.Body>
        </Card>

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

        {classroom?.students_classroom?.length ? (
          <table
            className="table table-striped"
            style={{ marginBottom: "100px" }}
          >
            <thead>
              <tr>
                <th className="th-react-table">NIS</th>
                <th className="th-react-table">First Name</th>
                <th className="th-react-table">Middle Name</th>
                <th className="th-react-table">Last Name</th>
                <th className="th-react-table">Gender</th>
                <th className="th-react-table">Status</th>
                <th className="th-react-table">Register Year</th>
                <th className="th-react-table">Action</th>
              </tr>
            </thead>
            <tbody>
              {classroom?.students_classroom?.map((data, index) => (
                <tr key={index}>
                  <td>{data?.student?.nis}</td>
                  <td>{data?.student?.first_name}</td>
                  <td>{data?.student?.middle_name}</td>
                  <td>{data?.student?.last_name}</td>
                  <td>{data?.student?.gender}</td>
                  <td>{data?.student?.status}</td>
                  <td>{data?.student?.register_year}</td>

                  <td>
                    <ButtonDanger
                      title="delete"
                      icon={<MdDelete />}
                      //   onClick={() => handleDelete(data?.classroom?.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Card style={{ width: "100%", height: "auto" }}>
            <Card.Body style={{ textAlign: "center" }}>
              <p>No data available </p>
            </Card.Body>
          </Card>
        )}
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
