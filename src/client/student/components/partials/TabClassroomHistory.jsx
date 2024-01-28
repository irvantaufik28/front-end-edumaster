import { useDispatch, useSelector } from "react-redux";
import { getById, studentSelector } from "../../../../features/studentSlice";
import { Card, Col, Row, Table } from "react-bootstrap";
import ButtonPrimary from "../../../../components/ui/button/ButtonPrimary";
import { MdModeEdit } from "react-icons/md";
import { SiAddthis } from "react-icons/si";
import { useState } from "react";
import FormModalHistoryClassroom from "../modals/FormModalHistoryClassroom";
import axios from "axios";
import config from "../../../../config";
import Swal from "sweetalert2";
import { RiDeleteBin5Line } from "react-icons/ri";
const TabClassroomHistory = () => {
  const student = useSelector(studentSelector.getById);
  const dispatch = useDispatch();
  const defaultFormModal = {
    show: false,
    type: "add",
    editId: null,
  };

  const [formModal, setFormModal] = useState(defaultFormModal);

  const handleDelete = async (id) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
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
          await axios.delete(
            config.apiUrl +
              `/classroom/delete/student?student_id=${student?.id}&classroom_id=${id}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          dispatch(getById(student?.id));

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

  const handleEditCurrentClassroom = () => {
    console.log("click");
  };
  const handleAdd = async () => {
    setFormModal({
      ...defaultFormModal,
      show: true,
      initialValues: { students: [{ id: student?.id }] },
    });
  };

  const handleCloseForm = () => {
    setFormModal({
      ...formModal,
      show: false,
    });
  };

  const onSubmitSuccess = () => {
    handleCloseForm();
    dispatch(getById(student?.id));
  };
  return (
    <>
      <div className="title-form-student">Current Classroom</div>
      <hr></hr>

      {student?.student_classrooms?.length > 0 && (
        <div className="button-edit-current-classroom">
          <ButtonPrimary
            title="Edit Current Classroom"
            icon={<MdModeEdit />}
            onClick={() => handleEditCurrentClassroom()}
          />
        </div>
      )}
      <Row>
        {student?.student_classrooms?.length ? (
          student?.student_classrooms
            ?.filter(
              (item) => item?.classroom_id === student?.current_classroom_id
            )
            .map((item, index) => (
              <Card key={index} style={{ width: "100%", height: "auto" }}>
                <Card.Body>
                  <Table>
                    <tbody>
                      <tr>
                        <th className="no-border" width="150">
                          Code
                        </th>
                        <td className="no-border">
                          : <span id="text-code">{item?.classroom?.code}</span>
                        </td>
                      </tr>
                      <tr>
                        <th className="no-border" width="150">
                          Class Major
                        </th>
                        <td className="no-border">
                          :{" "}
                          <span id="text-class_major">
                            {item?.classroom?.classMajor?.name}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <th className="no-border" width="150">
                          Grade
                        </th>
                        <td className="no-border">
                          :{" "}
                          <span id="text-level">{item?.classroom?.level}</span>
                        </td>
                      </tr>
                      <tr>
                        <th className="no-border" width="150">
                          Year Group
                        </th>
                        <td className="no-border">
                          :{" "}
                          <span id="text-year_group">
                            {item?.classroom?.year_group}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            ))
        ) : (
          <Card style={{ width: "100%", height: "auto" }}>
            <Card.Body style={{ textAlign: "center" }}>
              <p>No data available </p>
            </Card.Body>
          </Card>
        )}

        <Col md={6}>
          <div className="title-form-student">History</div>
        </Col>
        <Col md={6}>
          <div className="button-edit-current-classroom">
            <ButtonPrimary
              title="Add Classroom"
              icon={<SiAddthis />}
              onClick={() => handleAdd()}
            />
          </div>
        </Col>

        <Card
          style={{
            width: "100%",
            height: "auto",
            marginBottom: "20px",
          }}
        >
          <Card.Body>
            {student?.student_classrooms?.length ? (
              <table
                className="react-basic-table"
                style={{ marginBottom: "100px" }}
              >
                <thead>
                  <tr>
                    <th className="th-react-table">No</th>
                    <th className="th-react-table">Code</th>
                    <th className="th-react-table">Grade</th>
                    <th className="th-react-table">Class Major</th>
                    <th className="th-react-table">Year Group</th>
                    <th className="th-react-table">Status</th>
                    <th className="th-react-table">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {student?.student_classrooms.map((data, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{data?.classroom?.code}</td>
                      <td>{data?.classroom?.level}</td>
                      <td>{data?.classroom?.classMajor?.name}</td>
                      <td>{data?.classroom?.year_group}</td>
                      <td>{data?.classroom?.status}</td>
                      <td>
                        <div className="icon-action">
                          <div className="icon-action-delete" title="Delete">
                            <RiDeleteBin5Line
                              onClick={() => handleDelete(data?.classroom?.id)}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ textAlign: "center" }}>
                <p>No data available </p>
              </div>
            )}
          </Card.Body>
        </Card>
      </Row>
      <FormModalHistoryClassroom
        {...formModal}
        onHide={handleCloseForm}
        onSuccess={onSubmitSuccess}
      />
    </>
  );
};

export default TabClassroomHistory;
