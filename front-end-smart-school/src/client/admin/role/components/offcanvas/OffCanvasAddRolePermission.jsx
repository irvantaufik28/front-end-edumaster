/* eslint-disable react/prop-types */
import { Button, Offcanvas } from "react-bootstrap";
import { useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { RxReset } from "react-icons/rx";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import ButtonSuccess from "../../../../../components/ui/button/ButtonSuccess";
import ButtonDanger from "../../../../../components/ui/button/ButtonDanger";
import config from "../../../../../config";
import OffCanvasListPermission from "./OffcanvarListPermission";

const OffCanvasAddRolePermission = (props) => {
  const dataPermission = useSelector((state) => state.role.dataRolePermissionCheckBox);
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
    <Offcanvas
      placement="end"
      backdrop="static"
      show={props.show}
      onHide={props.onHide}
      style={{ width: "150vh" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Add Permission Role</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <>
          <div className="main-content-alpha">
            <div className="student-head">
              <div className="search-box-global">
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label htmlFor="nama-classroom" className="form-label">
                      permission Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      onChange={(e) =>
                        setSearch({ ...search, ...{ name: e.target.value } })
                      }
                    />
                  </div>
                </div>

                <div className="col-md-6 button-search-student">
                  <ButtonSuccess
                    title="search"
                    icon={<FaSearch />}
                    onClick={handleSearch}
                  />
                  <ButtonDanger
                    title="reset"
                    icon={<RxReset />}
                    onClick={handleReset}
                  />
                </div>
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
