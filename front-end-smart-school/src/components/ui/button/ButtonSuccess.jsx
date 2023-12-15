/* eslint-disable react/prop-types */
import './styles/buttonSuccess.css'

const ButtonSuccess= ({ title, onClick, icon }) => {
  return (
    <button className="button-30" role="button" onClick={onClick}>
      <div className="button-type">
        {icon} {title}
      </div>
    </button>
  )
}

export default ButtonSuccess