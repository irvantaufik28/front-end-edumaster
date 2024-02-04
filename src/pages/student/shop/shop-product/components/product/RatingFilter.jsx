import { useState } from "react";

const RatingFilter = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingThree">
          <button
            className="accordion-button text-dark bg-light"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#panelsStayOpen-collapseFive"
            aria-expanded={isOpen ? "true" : "false"}
            aria-controls="panelsStayOpen-collapseFive"
            onClick={handleToggle}
          >
            Ratings
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseFive"
          className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}
          aria-labelledby="headingThree"
        >
          <div className="accordion-body">
            {/* Default checkbox */}
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue
                id="flexCheckDefault"
                defaultChecked
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                <i className="fas fa-star text-warning" />
                <i className="fas fa-star text-warning" />
                <i className="fas fa-star text-warning" />
                <i className="fas fa-star text-warning" />
                <i className="fas fa-star text-warning" />
              </label>
            </div>
            {/* Default checkbox */}
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue
                id="flexCheckDefault"
                defaultChecked
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                <i className="fas fa-star text-warning" />
                <i className="fas fa-star text-warning" />
                <i className="fas fa-star text-warning" />
                <i className="fas fa-star text-warning" />
                <i className="fas fa-star text-secondary" />
              </label>
            </div>
            {/* Default checkbox */}
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue
                id="flexCheckDefault"
                defaultChecked
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                <i className="fas fa-star text-warning" />
                <i className="fas fa-star text-warning" />
                <i className="fas fa-star text-warning" />
                <i className="fas fa-star text-secondary" />
                <i className="fas fa-star text-secondary" />
              </label>
            </div>
            {/* Default checkbox */}
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue
                id="flexCheckDefault"
                defaultChecked
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                <i className="fas fa-star text-warning" />
                <i className="fas fa-star text-warning" />
                <i className="fas fa-star text-secondary" />
                <i className="fas fa-star text-secondary" />
                <i className="fas fa-star text-secondary" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RatingFilter;
