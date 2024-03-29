import { Card, Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getById, studentSelector } from "../../../../features/studentSlice";
import ButtonPrimary from "../../../../components/ui/button/ButtonPrimary";
import {  MdOutlineEdit } from "react-icons/md";
import { SiAddthis } from "react-icons/si";
import { useState } from "react";
import FormModalParent from "../modals/FormModalParent";
import axios from "axios";
import config from "../../../../config";
import Swal from "sweetalert2";
import { RiDeleteBin5Line } from "react-icons/ri";

const TabParentsInfo = () => {
  const dispatch = useDispatch();
  const defaultFormModal = {
    show: false,
    type: "add",
    editId: null,
  };

  const student = useSelector(studentSelector.getById);
  const [formModal, setFormModal] = useState(defaultFormModal);
  const handleEdit = async (id) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    try {
      const { data: resData } = await axios.get(
        config.apiUrl + `/student-parent/` + id,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setFormModal({
        ...defaultFormModal,
        show: true,
        initialValues: resData,
        type: "edit",
        editId: id,
      });
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const handleCloseForm = () => {
    setFormModal({
      ...formModal,
      show: false,
    });
  };

  const onSubmitSuccess = () => {
    handleCloseForm();
  };

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
          await axios.delete(config.apiUrl + `/student-parent/` + id, {
            headers: {
              Authorization: token,
            },
          });
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

  const handleAdd = async () => {
    setFormModal({
      ...defaultFormModal,
      show: true,
      initialValues: null,
      student_id: student?.id,
    });
  };
  return (
    <>
      <Row>
        <Col md={6}>
          <div className="title-form-student">Parents Info</div>
        </Col>
        <Col md={6} className="add-button-parent">
          <ButtonPrimary
            title="Add Parent"
            icon={<SiAddthis />}
            onClick={() => handleAdd()}
          />
        </Col>

        <hr></hr>
        {student?.student_parents?.map((item, index) => (
          <>
            <Card
              style={{ width: "100%", height: "auto", marginBottom: "50px" }}
            >
              <Card.Body key={index}>
              <div className="button-edit-parent">
                  <div className="icon-action">
                    <div className="icon-action-edit" title="Edit">
                      <MdOutlineEdit
                        onClick={() => handleEdit(item?.id)}
                      />
                    </div>
                    <div className="icon-action-delete" title="Delete">
                      <RiDeleteBin5Line
                        onClick={() => handleDelete(item?.id)}
                      />
                    </div>
                  </div>
                </div>
                <Row>
                  <Table>
                    <tbody>
                      <tr>
                        <th className="no-border" width="150">
                          NIK
                        </th>
                        <td className="no-border">
                          : <span id="text-nik">{item?.nik}</span>
                        </td>
                      </tr>
                      <tr>
                        <th className="no-border" width="150">
                          First Name
                        </th>
                        <td className="no-border">
                          :{" "}
                          <span id="text-first_name"> {item?.first_name}</span>
                        </td>
                      </tr>
                      <tr>
                        <th className="no-border" width="150">
                          Last Name
                        </th>
                        <td className="no-border">
                          : <span id="text-last_name"> {item?.last_name}</span>
                        </td>
                      </tr>
                      <tr>
                        <th className="no-border" width="150">
                          Relationship
                        </th>
                        <td className="no-border">
                          :{" "}
                          <span id="text-relationship">
                            {" "}
                            {item?.relationship}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <th className="no-border" width="150">
                          Phone
                        </th>
                        <td className="no-border">
                          : <span id="text-phone"> {item?.phone}</span>
                        </td>
                      </tr>
                      <tr>
                        <th className="no-border" width="150">
                          Email
                        </th>
                        <td className="no-border">
                          : <span id="text-email"> {item?.email}</span>
                        </td>
                      </tr>
                      <tr>
                        <th className="no-border" width="150">
                          Job
                        </th>
                        <td className="no-border">
                          : <span id="text-job"> {item?.job}</span>
                        </td>
                      </tr>
                      <tr>
                        <th className="no-border" width="150">
                          Salary
                        </th>
                        <td className="no-border">
                          : <span id="text-salary"> {item?.salary}</span>
                        </td>
                      </tr>
                      <tr>
                        <th className="no-border" width="150">
                          Address
                        </th>
                        <td className="no-border">
                          : <span id="text-address"> {item?.address}</span>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Row>
               
              </Card.Body>
            </Card>
          </>
        ))}
      </Row>
      <FormModalParent
        {...formModal}
        onHide={handleCloseForm}
        onSuccess={onSubmitSuccess}
      />
    </>
  );
};

export default TabParentsInfo;
