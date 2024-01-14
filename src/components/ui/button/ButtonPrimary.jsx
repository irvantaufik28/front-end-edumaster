/* eslint-disable react/prop-types */
import "./styles/buttonPrimary.css";
const ButtonPrimary = ({ title, onClick, icon }) => {
  return (
    <button className="button-10" role="button" onClick={onClick}>
      <div className="button-type">
        {icon} {title}
      </div>
    </button>
  );
};

export default ButtonPrimary;