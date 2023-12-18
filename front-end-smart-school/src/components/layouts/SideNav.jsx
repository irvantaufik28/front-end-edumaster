import {  useNavigate } from "react-router-dom";

export const SideNav = () => {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <a href="index3.html" className="brand-link">
        <img
          src="dist/img/AdminLTELogo.png"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />
        <span className="brand-text font-weight-light">AdminLTE 3</span>
      </a>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src="dist/img/user2-160x160.jpg"
              className="img-circle elevation-2"
              alt="User Image"
            />
          </div>
          <div className="info">
            <a href="#" className="d-block">
              Alexander Pierce
            </a>
          </div>
        </div>
        {/* SidebarSearch Form */}
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
            <li className="nav-item menu-open">
              <a href="#" className="nav-link active">
                <i className="nav-icon fas fa-folder" />
                <p>
                  Master
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <li className="nav-item menu-open">
                    <a href="#" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p>
                        Biodata
                        <i className="right fas fa-angle-left" />
                      </p>
                    </a>
                    <ul className="nav nav-treeview">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          onClick={() =>
                            handleNavigation("/biodata/family-status")
                          }
                        >
                          <i className="far fa-circle nav-icon" />
                          <p>Family status</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          onClick={() => handleNavigation("/biodata/religion")}
                        >
                          <i className="far fa-circle nav-icon" />
                          <p>Religion</p>
                        </a>
                      </li>
                    </ul>
                  </li>
                </li>
                <li className="nav-item">
                  <li className="nav-item menu-open">
                    <a href="#" className="nav-link active">
                      <i className="far fa-circle nav-icon" />
                      <p>
                        Class
                        <i className="right fas fa-angle-left" />
                      </p>
                    </a>
                    <ul className="nav nav-treeview">
                      <li className="nav-item"></li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          onClick={() => handleNavigation("/class/major")}
                        >
                          <i className="far fa-circle nav-icon" />
                          <p>Class Major</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          onClick={() => handleNavigation("/classroom")}
                        >
                          <i className="far fa-circle nav-icon" />
                          <p>Class Room</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          onClick={() => handleNavigation("/grade")}
                        >
                          <i className="far fa-circle nav-icon" />
                          <p>Grade</p>
                        </a>
                      </li>
                    </ul>
                  </li>
                </li>
                <li className="nav-item">
                  <a href="./index3.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Dashboard v3</p>
                  </a>
                </li>
              </ul>
            </li>

            {/* <li className="nav-item menu-open">
              <a href="#" className="nav-link active">
                <i className="nav-icon fas fa-folder" />
                <p>
                  example
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="./index.html" className="nav-link active">
                    <i className="far fa-circle nav-icon" />
                    <p>sub example</p>
                  </a>
                </li>
              </ul>
            </li> */}

            <li className="nav-item menu-open">
              <a href="#" className="nav-link active">
                <i className="nav-icon fas fa-users" />
                <p>
                  Student
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    onClick={() => handleNavigation("/student")}
                  >
                    <i className="far fa-circle nav-icon" />
                    <p>Student List</p>
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-header">EXAMPLES</li>

            <li className="nav-header">LABELS</li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon far fa-circle text-danger" />
                <p className="text">Important</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon far fa-circle text-warning" />
                <p>Warning</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon far fa-circle text-info" />
                <p>Informational</p>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};
