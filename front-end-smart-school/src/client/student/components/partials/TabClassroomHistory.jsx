import { useDispatch, useSelector } from "react-redux";
import { getById, studentSelector } from "../../../../features/studentSlice";
import { Card, Col, Row, Table } from "react-bootstrap";
import ButtonDanger from "../../../../components/ui/button/ButtonDanger";
import ButtonPrimary from "../../../../components/ui/button/ButtonPrimary";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { SiAddthis } from "react-icons/si";
import { useState } from "react";
import FormModalHistoryClassroom from "../modals/FormModalHistoryClassroom";
import axios from "axios";
import config from "../../../../config";
import Swal from "sweetalert2";
const TabClassroomHistory = () => {
  const student = useSelector(studentSelector.getById);
  const dispacth = useDispatch();
  const defaultFormModal = {
    show: false,
    type: "add",
    editId: null,
  };

  const [formModal, setFormModal] = useState(defaultFormModal);

  const handleDelete = async (id) => {
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
              `/classroom/delete/student?student_id=${student?.id}&classroom_id=${id}`
          );
          dispacth(getById(student?.id));

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
    dispacth(getById(student?.id));
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
        <hr></hr>

        {student?.student_classrooms?.length ? (
          <table className="table table-striped">
            <thead>
              <tr>
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
                  <td>{data?.classroom?.code}</td>
                  <td>{data?.classroom?.level}</td>
                  <td>{data?.classroom?.classMajor?.name}</td>
                  <td>{data?.classroom?.year_group}</td>
                  <td>{data?.classroom?.status}</td>
                  <td>
                    <ButtonDanger
                      title="delete"
                      icon={<MdDelete />}
                      onClick={() => handleDelete(data?.classroom?.id)}
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
      <FormModalHistoryClassroom
        {...formModal}
        onHide={handleCloseForm}
        onSuccess={onSubmitSuccess}
      />
    </>
  );
};

export default TabClassroomHistory;
