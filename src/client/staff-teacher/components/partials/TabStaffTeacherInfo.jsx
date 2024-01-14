import { Card, Col, Row, Table } from "react-bootstrap";

import { useSelector } from "react-redux";
import { useState } from "react";
import config from "../../../../config";
import axios from "axios";
import { MdModeEdit } from "react-icons/md";
// import FormModalstaff from "../modals/FormModalstaff";
import ButtonPrimary from "../../../../components/ui/button/ButtonPrimary";
import { staffSelector } from "../../../../features/staffSlice";
import FormModalStaffTeacher from "../modals/FormModalStaffTeacher";
const TabStaffTeacherInfo = () => {
  const defaultFormModal = {
    show: false,
    initialValues: null,
    type: "add",
    editId: null,
  };

  const [formModal, setFormModal] = useState(defaultFormModal);
  const staff = useSelector(staffSelector.getById);

  const handleEdit = async (id) => {
    const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
    try {
      const { data: resData } = await axios.get(
        config.apiUrl + `/staff/` + id , {
            headers: {
                authorization :token
            }
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

  return (
    <>
      <Row>
        <Card style={{ width: "100%", height: "auto", marginBottom: "100px" }}>
          <Card.Body>
            <div className="title-form-student">Personal Info</div>
            <hr></hr>
            <div className="button-edit-student">
              <ButtonPrimary
                title="Edit"
                icon={<MdModeEdit />}
                onClick={() => handleEdit(staff?.id)}
              />
            </div>
            <Row>
              <Col md={6}>
                <Table>
                  <tbody>
                    <tr>
                      <th className="no-border" width="150">
                        NIK
                      </th>
                      <td className="no-border">
                        : <span id="text-nis">{staff?.nik}</span>
                      </td>
                    </tr>
                    <tr>
                      <th className="no-border" width="150">
                        First Name
                      </th>
                      <td className="no-border">
                        :{" "}
                        <span id="text-first_name"> {staff?.first_name}</span>
                      </td>
                    </tr>
                    <tr>
                      <th className="no-border" width="150">
                        Middle Name
                      </th>
                      <td className="no-border">
                        :{" "}
                        <span id="text-middle_name">
                          {" "}
                          {staff?.middle_name}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th className="no-border" width="150">
                        Last Name
                      </th>
                      <td className="no-border">
                        : <span id="text-last_name"> {staff?.last_name}</span>
                      </td>
                    </tr>
                    <tr>
                      <th className="no-border" width="150">
                        Gender
                      </th>
                      <td className="no-border">
                        : <span id="text-gender"> {staff?.gender}</span>
                      </td>
                    </tr>
                    <tr>
                      <th className="no-border" width="150">
                        Birth Place
                      </th>
                      <td className="no-border">
                        :{" "}
                        <span id="text-birth_place">
                          {" "}
                          {staff?.birth_place}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th className="no-border" width="150">
                        Birth Date
                      </th>
                      <td className="no-border">
                        :{" "}
                        <span id="text-birth_place">
                          {" "}
                          {staff?.birth_date}
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
                        Religion
                      </th>
                      <td className="no-border">
                        :{" "}
                        <span id="religion">
                          {staff?.religion}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th className="no-border" width="150">
                        Address
                      </th>
                      <td className="no-border">
                        :{" "}
                        <span id="addres">
                          {" "}
                          {staff?.address}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th className="no-border" width="150">
                        Phone
                      </th>
                      <td className="no-border">
                        :{" "}
                        <span id="phone">
                          {" "}
                          {staff?.phone}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th className="no-border" width="150">
                        Email
                      </th>
                      <td className="no-border">
                        :{" "}
                        <span id="email">
                          {" "}
                          {staff?.email}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th className="no-border" width="150">
                        Status
                      </th>
                      <td className="no-border">
                        : <span id="text-status"> {staff?.status}</span>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        {/* 
      <Card style={{ width: "100%", height: "auto" }}>
        <Card.Body>
          {" "}
          <h1>personal</h1>
        </Card.Body>
      </Card> */}
      </Row>
      <FormModalStaffTeacher
        {...formModal}
        onHide={handleCloseForm}
        onSuccess={onSubmitSuccess}
      />
    </>
  );
};

export default TabStaffTeacherInfo;
