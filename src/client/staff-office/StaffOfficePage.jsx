import { FaSearch } from "react-icons/fa";
import { SiAddthis } from "react-icons/si";
import { CgImport } from "react-icons/cg";
import { BiExport } from "react-icons/bi";
import { RxReset } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../../components/ui/button/ButtonPrimary";
import ButtonSuccess from "../../components/ui/button/ButtonSuccess";
import ButtonDanger from "../../components/ui/button/ButtonDanger";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderContentGlobal from "../../components/ui/header/HeaderContentGlobal";
import StaffOfficeList from "./components/StaffOfficeList";
import { roleList, roleSelector } from "../../features/roleSlice";
import CmsLayout from "../../components/layouts/CmsLayout";

const StaffOfficePage = () => {
  const roles = useSelector(roleSelector.selectAll);

  const filteredRoles = roles?.filter((role) => role.name !== "student");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(roleList());
  }, [dispatch]);

  const tableRef = useRef(null);

  const handleAdd = () => {
    navigate("/staff/office/create");
  };

  const handleDetail = async (data) => {
    navigate("/staff/office/detail/" + data.id);
  };

  const [search, setSearch] = useState({
    nik: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    role_id: "",
    status: "",
  });

  const handleSearch = (e) => {
    e.preventDefault();
    tableRef.current.doFilter({
      nik: search.nik,
      first_name: search.first_name,
      middle_name: search.middle_name,
      last_name: search.last_name,
      role_id: search.role_id,
      status: search.status,
    });
  };
  const handleReset = (e) => {
    e.preventDefault();
    setSearch({
      nis: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      status: "",
      role_id: "",
    });
    tableRef.current.doFilter({
      nik: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      status: "",
      role_id: "",
    });
    document.getElementById("nik").value = "";
    document.getElementById("first_name").value = "";
    document.getElementById("last_name").value = "";
    document.getElementById("middle_name").value = "";
    document.getElementById("status").value = "";
    document.getElementById("role_id").value = "";
  };

  return (
    <>
      <CmsLayout>
        <div className="main-content">
          <HeaderContentGlobal title={"Staff"} page={"Staff"} type={"List"} />
          <div className="main-content-alpha">
            <div className="global-head">
              <div className="row sub-header-content">
                <div className="col-md-6 add-student">
                  <ButtonPrimary
                    title="add"
                    onClick={handleAdd}
                    icon={<SiAddthis />}
                  />
                </div>
                <div className="col-md-6 right-button-student-list">
                  <div>
                    <ButtonPrimary title="Import" icon={<CgImport />} />
                  </div>
                  <div>
                    <ButtonPrimary title="Export" icon={<BiExport />} />
                  </div>
                </div>
              </div>
              <div className="search-box-global">
                <div className="row">
                  <div className="col-md-4 mb-4">
                    <label htmlFor="nama-classroom" className="form-label">
                      NIK
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nik"
                      onChange={(e) =>
                        setSearch({ ...search, ...{ nis: e.target.value } })
                      }
                    />
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="status" className="form-label">
                      Status
                    </label>
                    <div>
                      <select
                        className="form-control"
                        aria-label="Default select example"
                        id="status"
                        onChange={(e) =>
                          setSearch({
                            ...search,
                            ...{ status: e.target.value },
                          })
                        }
                      >
                        <option selected value={""}>
                          select status
                        </option>
                        <option value="active">Active</option>
                        <option value="preparation">Preparation</option>
                        <option value="drop_out">Drop Out</option>
                        <option value="graduate">Graduate</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="role_id" className="form-label">
                      Role
                    </label>
                    <div>
                      <select
                        className="form-control"
                        aria-label="Default select example"
                        id="role_id"
                        onChange={(e) =>
                          setSearch({
                            ...search,
                            ...{ role_id: e.target.value },
                          })
                        }
                      >
                        <option selected value={""}>
                          select role
                        </option>
                        {filteredRoles?.map((option) => (
                          <option key={option?.id} value={option?.id}>
                            {option?.display_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <label htmlFor="class" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="first_name"
                      onChange={(e) =>
                        setSearch({
                          ...search,
                          ...{ first_name: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="year" className="form-label">
                      Middle Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="middle_name"
                      onChange={(e) =>
                        setSearch({
                          ...search,
                          ...{ middle_name: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="year" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="last_name"
                      onChange={(e) =>
                        setSearch({
                          ...search,
                          ...{ last_name: e.target.value },
                        })
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

            <StaffOfficeList
              ref={tableRef}
              onDetail={(data) => handleDetail(data)}
            />
          </div>
        </div>
      </CmsLayout>
    </>
  );
};

export default StaffOfficePage;
