/* eslint-disable react/prop-types */
import './styles/buttonSecondary.css'

const ButtonSecondary = ({ title, onClick, icon }) => {
  return (
    <button className="button-20" role="button" onClick={onClick}>
      <div className="button-type">
        {icon} {title}
      </div>
    </button>
  )
}

export default ButtonSecondary