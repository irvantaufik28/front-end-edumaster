/* eslint-disable react/prop-types */
import './styles/buttonDanger.css'

const ButtonDanger= ({ title, onClick, icon }) => {
  return (
    <button className="button-40" role="button" onClick={onClick}>
      <div className="button-type">
        {icon} {title}
      </div>
    </button>
  )
}

export default ButtonDanger