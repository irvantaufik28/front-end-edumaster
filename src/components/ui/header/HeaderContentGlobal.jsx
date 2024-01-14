/* eslint-disable react/prop-types */
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

const HeaderContentGlobal = (props) => {

    const navigate = useNavigate();
    const handleBack = () => {
      navigate(-1);
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
      <div className="title-global">
        <p>
          <span style={{ opacity: "0.5" }}> Home / {props.page} / {props.type}</span>
        </p>
      </div>
    </div>
  </>
  )
}

export default HeaderContentGlobal