import { SiAddthis } from "react-icons/si";
import ButtonPrimary from "../../../components/ui/button/ButtonPrimary";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import ClassmajorList from "./components/ClassmajorList";
import HeaderContentGlobal from "../../../components/ui/header/HeaderContentGlobal";
import config from "../../../config";
import FormModalClassmajor from "./components/modals/FormModalClassmajor";
import CmsLayout from "../../../components/layouts/CmsLayout";

const ClassmajorPage = () => {
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
        config.apiUrl + `/class/major/` + id
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

          await axios.delete(config.apiUrl + `/class/major/` + id, {
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
    navigate("/classroom/manage/" + data.id);
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

  return (
    <>
     <CmsLayout>
     <div className="main-content">
              <HeaderContentGlobal
                page={"Class Major"}
                title={"Classmajor"}
                type={"List"}
              />
              <div className="main-content-alpha">
                <div className="global-head">
                  <div className="row sub-header-content">
                    <div className="col-md-6 add-role">
                      <ButtonPrimary
                        title="add"
                        onClick={handleAdd}
                        icon={<SiAddthis />}
                      />
                    </div>
                    <div className="search-box-single col-md-6 d-flex justify-content-end align-items-end">
                      <form onSubmit={handleSearch}>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control bg-light border-2 small"
                            placeholder="search ..."
                            aria-label="Search"
                            id="name"
                            aria-describedby="basic-addon2"
                            onChange={(e) =>
                              setSearch({
                                ...search,
                                ...{ name: e.target.value },
                              })
                            }
                          />
                          <div className="input-group-append">
                            <button className="btn btn-primary" type="submit">
                              <i className="fas fa-search fa-sm" />
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>

                </div>

                <ClassmajorList
                  ref={tableRef}
                  onEdit={(data) => handleEdit(data)}
                  onDelete={(data) => handleDelete(data)}
                  onManage={(data) => handleManage(data)}
                />
              </div>
            </div>
     </CmsLayout>
      <FormModalClassmajor
        {...formModal}
        onHide={handleCloseForm}
        onSuccess={onSubmitSuccess}
      />
    </>
  );
};

export default ClassmajorPage;
