import { Button, Card, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  classroomScheduleSelector,
  listClassroomSchedule,
} from "../../../../features/classroomScheduleSlice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdDelete, MdModeEdit } from "react-icons/md";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../../../../config";
import ButtonPrimary from "../../../../components/ui/button/ButtonPrimary";
import { SiAddthis } from "react-icons/si";
import FormModalAddClassromSchedule from "../modals/FormModalAddClassromSchedule";

const TabClassroomSchedule = () => {
  const defaultFormModal = {
    show: false,
    type: "add",
    editId: null,
  };
  const [formModal, setFormModal] = useState(defaultFormModal);
  const classroomSchedule = useSelector(classroomScheduleSelector.selectAll);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listClassroomSchedule({ id: id, day_name: "" }));
  }, [dispatch, id]);

  const handleAdd = async () => {
    setFormModal({
      ...defaultFormModal,
      show: true,
      initialValues: { classroom_id: id },
    });
  };

  const handleDelete = async (schedule_id) => {
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
            config.apiUrl + `/classroom/-schedule/` + schedule_id,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          dispatch(listClassroomSchedule({ id: id, day_name: "" }));
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

  const handleEdit = (id) => {
    alert(id);
  };

  const handleCloseForm = () => {
    setFormModal({
      ...formModal,
      show: false,
    });
  };

  const onSubmitSuccess = () => {
    handleCloseForm();
    dispatch(listClassroomSchedule({ id: id, day_name: "" }));
  };
  return (
    <>
      <div className="button-edit-current-classroom">
        <ButtonPrimary
          title="Add Schedule"
          icon={<SiAddthis />}
          onClick={() => handleAdd()}
        />
      </div>
      {classroomSchedule?.length ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="th-react-table ">Day</th>
              <th className="th-react-table ">Course</th>
              <th className="th-react-table ">Start Time</th>
              <th className="th-react-table ">End Time</th>
              <th className="th-react-table ">Teacher</th>
              <th className="th-react-table ">Action</th>
            </tr>
          </thead>
          <tbody>
            {classroomSchedule?.map((item) => (
              <tr key={item.id}>
                <td>{item?.day_name}</td>
                <td>
                  {item?.teacher_course?.courses?.name} kelas{" "}
                  {item?.teacher_course?.courses?.level}
                </td>
                <td>{item?.start_time}</td>
                <td>{item?.end_time}</td>
                <td>
                  {item?.teacher_course?.staff?.first_name}{" "}
                  {item?.teacher_course?.staff?.middle_name}{" "}
                  {item?.teacher_course?.staff?.last_name}
                </td>
                <td>
                  {" "}
                  <Button
                    variant="info"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(item?.id)}
                  >
                    <MdModeEdit /> Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(item?.id)}
                  >
                    <MdDelete /> Delete
                  </Button>
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
      <FormModalAddClassromSchedule
        {...formModal}
        onHide={handleCloseForm}
        onSuccess={onSubmitSuccess}
      />
    </>
  );
};

export default TabClassroomSchedule;
