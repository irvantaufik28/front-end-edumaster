import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row } from "react-bootstrap";
import ButtonDanger from "../../../../components/ui/button/ButtonDanger";
import ButtonPrimary from "../../../../components/ui/button/ButtonPrimary";
import {  MdDelete } from "react-icons/md";
import { SiAddthis } from "react-icons/si";
import { useState } from "react";
// import FormModalHistoryClassroom from "../modals/FormModalHistoryClassroom";
import axios from "axios";
import config from "../../../../config";
import Swal from "sweetalert2";
import { getById, staffSelector } from "../../../../features/staffSlice";
import FormModalAddTeacherCourse from "../modals/FormModalAddTeacherCourse";
const TabCourseInfo = () => {
  const staff = useSelector(staffSelector.getById);
  const dispacth = useDispatch();
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
          await axios.delete(config.apiUrl + `/teacher/course/${id}`, {
            headers: {
              Authorization: token,
            },
          });
          dispacth(getById(staff?.id));

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


  const handleAdd = async () => {
    setFormModal({
      ...defaultFormModal,
      show: true,
      initialValues: { staff_id: staff.id },
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
    dispacth(getById(staff?.id));
  };
  return (
    <>
      <Row>
        <Col md={6}>
          <div className="title-form-student">Teacher Courses</div>
        </Col>
        <Col md={6}>
          <div className="button-edit-current-classroom">
            <ButtonPrimary
              title="Add Course"
              icon={<SiAddthis />}
              onClick={() => handleAdd()}
            />
          </div>
        </Col>
        <hr></hr>

        {staff?.teacher_course?.length ? (
          <table
            className="table table-striped"
            style={{ marginBottom: "100px" }}
          >
            <thead>
              <tr>
                <th className="th-react-table">id</th>
                <th className="th-react-table">name</th>
                <th className="th-react-table">Grade</th>
                <th className="th-react-table">Action</th>
              </tr>
            </thead>
            <tbody>
              {staff?.teacher_course?.map((data, index) => (
                <tr key={index}>
                  <td>{data?.courses?.id}</td>
                  <td>{data?.courses?.name}</td>
                  <td>{data?.courses?.level}</td>
                  <td>
                    <ButtonDanger
                      title="delete"
                      icon={<MdDelete />}
                      onClick={() => handleDelete(data?.id)}
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
      <FormModalAddTeacherCourse
        {...formModal}
        onHide={handleCloseForm}
        onSuccess={onSubmitSuccess}
      />
    </>
  );
};

export default TabCourseInfo;
