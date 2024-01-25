/* eslint-disable no-unused-vars */
import { SiAddthis } from "react-icons/si";
import ButtonPrimary from "../../../components/ui/button/ButtonPrimary";

import { useRef, useState } from "react";
import ButtonSuccess from "../../../components/ui/button/ButtonSuccess";
import ButtonDanger from "../../../components/ui/button/ButtonDanger";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import config from "../../../config";
import ListRole from "./components/RoleList";
import { Row } from "react-bootstrap";
import HeaderContentGlobal from "../../../components/ui/header/HeaderContentGlobal";
import FormModalAddRole from "./components/modals/FormModalAddRole";
import SideBarList from "../../../components/layouts/SideBarList";
import TopBarList from "../../../components/layouts/TopBarList";
import Footer from "../../../components/layouts/Footer";

const RolePage = () => {
  const navigate = useNavigate();
  const defaultFormModal = {
    show: false,
    initialValues: null,
    type: "add",
    editId: null,
  };

  const tableRef = useRef(null);
  const [formModal, setFormModal] = useState(defaultFormModal);

  const handleAdd = () => {
    setFormModal({
      ...defaultFormModal,
      show: true,
      initialValues: null,
    });
  };

  const handleEdit = async (data) => {
    try {
      const id = data.id;

      const { data: resData } = await axios.get(
        config.apiUrl + `/classroom/` + id
      );
      setFormModal({
        ...defaultFormModal,
        show: true,
        initialValues: resData.data,
        type: "edit",
        editId: id,
      });
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

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

          await axios.delete(config.apiUrl + `/role/` + id, {
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

  const handleCloseForm = () => {
    setFormModal({
      ...formModal,
      show: false,
    });
  };

  const handleManage = (data) => {
    navigate(`/admin/role/manage/${data.id}`);
  };

  const onSubmitSuccess = () => {
    handleCloseForm();
    tableRef.current.refreshData();
  };

  const [search, setSearch] = useState({
    name: "",
  });

  const handleSearch = (e) => {
    e.preventDefault();
    tableRef.current.doFilter({
      name: search.name,
    });
  };
  const handleReset = (e) => {
    e.preventDefault();
    setSearch({
      name: "",
    });
    tableRef.current.doFilter({
      name: "",
    });
    document.getElementById("name").value = "";
  };

  return (
    <>
      <div id="wrapper">
        <SideBarList />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <TopBarList />
            <div className="main-content">
              <HeaderContentGlobal page={"Role"} title={"Role"} type={"List"} />
              <div className="main-content-alpha">
                <div className="role-head">
                  <div className="row sub-header-content">
                    <div className="col-md-6 add-role">
                      <ButtonPrimary
                        title="add"
                        onClick={handleAdd}
                        icon={<SiAddthis />}
                      />
                    </div>
                  </div>
                  <div className="search-box-global">
                    <Row>
                      <div className="col-md-4 mb-4">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="search..."
                          id="name"
                          onChange={(e) =>
                            setSearch({
                              ...search,
                              ...{ name: e.target.value },
                            })
                          }
                        />
                      </div>
                    </Row>

                    <div className="col-md-6 button-search-classroom">
                      <ButtonSuccess title="search" onClick={handleSearch} />
                      <ButtonDanger title="reset" onClick={handleReset} />
                    </div>
                  </div>
                </div>

                <ListRole
                  ref={tableRef}
                  onEdit={(data) => handleEdit(data)}
                  onDelete={(data) => handleDelete(data)}
                  onManage={(data) => handleManage(data)}
                />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up" />
      </a>

      <FormModalAddRole
        {...formModal}
        onHide={handleCloseForm}
        onSuccess={onSubmitSuccess}
      />
    </>
  );
};

export default RolePage;
