/* eslint-disable react/prop-types */
import { Button, Offcanvas } from "react-bootstrap";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import config from "../../../../../config";
import OffCanvasListPermission from "./OffcanvarListPermission";

const OffCanvasAddRolePermission = (props) => {
  const dataPermission = useSelector(
    (state) => state.role.dataRolePermissionCheckBox
  );
  const tableRef = useRef(null);
  const handleAdd = async () => {
    const payload = {
      permissions: dataPermission,
    };
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      });

      if (result.isConfirmed) {
        try {
          const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];

          await axios.post(config.apiUrl + `/role-permission`, payload, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          });
          props.onSuccess();
          Swal.fire({
            title: "Created!",
            text: "successfully created schedule.",
            icon: "success",
          });
        } catch (error) {
          console.error(error);
          Swal.fire({
            title: "Error",
            text: "Failed to Created Schedule. Please try again.",
            icon: "error",
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
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
    <Offcanvas
      placement="end"
      backdrop="static"
      show={props.show}
      onHide={props.onHide}
      style={{ width: "100vh" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Add Permission Role</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <>
          <div className="main-content-alpha">
            <div className="global-head">
              <div className="search-box-single d-flex justify-content-end align-items-end">
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

            <OffCanvasListPermission ref={tableRef} />

            <div className="button-student-moved">
              {dataPermission?.length == 0}
              <Button
                variant="primary"
                disabled={dataPermission?.length === 0}
                onClick={handleAdd}
              >
                {" "}
                save
              </Button>
            </div>
          </div>
        </>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

OffCanvasAddRolePermission.defaultProps = {
  onHide: () => {},
  show: false,
  onSuccess: () => {},
};

export default OffCanvasAddRolePermission;
