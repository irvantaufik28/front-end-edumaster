import { SiAddthis } from "react-icons/si";
import ButtonPrimary from "../../../../components/ui/button/ButtonPrimary";
import ListTeacherSchedule from "./ListTecherSchedule";
import { Col, Row } from "react-bootstrap";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../../../../config";
import {  useSelector } from "react-redux";
import { staffSelector } from "../../../../features/staffSlice";
import FormModalAddTeacherSchedule from "../modals/FormModalAddTeacherSchedule";

const TabTeacherSchedule = () => {
  const staff = useSelector(staffSelector.getById);
  const defaultFormModal = {
    show: false,
    type: "add",
    editId: null,
  };
  const [formModal, setFormModal] = useState(defaultFormModal);
  const tableRef = useRef(null);
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

          await axios.delete(config.apiUrl + `/classroom/-schedule/` + id, {
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
    tableRef.current.refreshData();
  };
  return (
    <>
      <Row>
        <Col md={6}>
          <div className="title-form-student">Teacher Schedule</div>
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

        <ListTeacherSchedule
          ref={tableRef}
          onDelete={(data) => handleDelete(data)}
        />
      </Row>
      <FormModalAddTeacherSchedule
        {...formModal}
        onHide={handleCloseForm}
        onSuccess={onSubmitSuccess}
      />
    </>
  );
};

export default TabTeacherSchedule;
