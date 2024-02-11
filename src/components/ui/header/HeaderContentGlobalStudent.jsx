/* eslint-disable react/prop-types */
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import "./styles/headercontent.css";
const HeaderContentGlobalStudent = (props) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      <div className="header-content">
        <div className="title-content">
          <TiArrowBack className="back-arrow" onClick={handleBack} />
          <h5>
            <span style={{ fontSize: "30px", color: "darkblue" }}>
              {props.title}
            </span>
          </h5>
        </div>
        <div className="title-global-student">
          <span style={{ opacity: "0.5", cursor: "pointer" }} 
          onClick={() => handleNavigation("/student-page/home")}>Home /</span>
          <span style={{ opacity: "0.5", cursor: "pointer" }}
           onClick={() => handleNavigation(`/student-page/${props.page.toLowerCase()}`)}
          >
            {props.page} /
          </span>
          <span style={{ opacity: "0.5", cursor: "pointer" }}
           onClick={() => handleNavigation(`/student-page/${props.page.toLowerCase()}/${props.type.toLowerCase()}`)}
          >
            {props.type}
          </span>
        </div>
      </div>
    </>
  );
};

export default HeaderContentGlobalStudent;
