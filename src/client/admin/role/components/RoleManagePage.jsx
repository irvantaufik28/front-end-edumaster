import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { SiAddthis } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../../../../config";
import Topbar from "../../../../components/layouts/TopBar";
import SideBar from "../../../../components/layouts/SideBar";
import HeaderContentGlobal from "../../../../components/ui/header/HeaderContentGlobal";
import ButtonPrimary from "../../../../components/ui/button/ButtonPrimary";
import { getByIdRole, roleSelector } from "../../../../features/roleSlice";
import OffCanvasAddRolePermission from "./offcanvas/OffCanvasAddRolePermission";

const RoleManagePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const role = useSelector(roleSelector.selectAll);

  const rolePermission = role?.role_permission;

  useEffect(() => {
    dispatch(getByIdRole(id));
  }, [dispatch, id]);

  const defaultOffanvas = {
    show: false,
    initialValues: null,
    type: "add",
    editId: null,
  };
  const [formOffcanvas, setFormOffcanvas] = useState(defaultOffanvas);

  const handleDelete = async (role_permission_id) => {
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
            config.apiUrl + `/role-permission/` + role_permission_id,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          dispatch(getByIdRole(id));
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

  const handleCloseOffCanvas = () => {
    setFormOffcanvas({
      ...formOffcanvas,
      show: false,
    });
  };

  const onSubmitSuccess = () => {
    handleCloseOffCanvas();
    dispatch(getByIdRole(id));
  };
  return (
    <>
      <Topbar />
      <div className="content">
        <SideBar />
        <div className="main-content">
          <HeaderContentGlobal
            page={"Role"}
            title={"Role Manage"}
            type={"Manage"}
          />
          <div className="main-content-alpha">
            <Row>
              <Col md={6}>
                <div className="title-form-student">Permission List</div>
              </Col>

              <div className="button-edit-current-classroom">
                <ButtonPrimary
                  title="Add Permission"
                  icon={<SiAddthis />}
                  onClick={() => handleAdd()}
                />
              </div>
              {rolePermission?.length ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th className="th-react-table ">No</th>
                      <th className="th-react-table ">Permission Name</th>
                      <th className="th-react-table ">Description</th>
                      <th className="th-react-table ">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rolePermission?.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item?.permission?.name}</td>
                        <td>{item?.permission?.description}</td>
                        <td>
                          {" "}
                          <Button
                            className="me-2"
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

              <OffCanvasAddRolePermission
                {...formOffcanvas}
                onHide={handleCloseOffCanvas}
                onSuccess={onSubmitSuccess}
              />
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoleManagePage;
