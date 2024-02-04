import { useState } from "react";
// import './Brands.css'; // Import file CSS untuk gaya transisi

const Brands = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingTwo">
          <button
            className="accordion-button text-dark bg-light"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#panelsStayOpen-collapseTwo"
            aria-expanded={isOpen ? "true" : "false"}
            aria-controls="panelsStayOpen-collapseTwo"
            onClick={handleToggle}
          >
            Brands
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseTwo"
          className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}
          aria-labelledby="headingTwo"
        >
          <div className="accordion-body">
            <div>
              {/* Checked checkbox */}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultValue
                  id="flexCheckChecked1"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="flexCheckChecked1">
                  Mercedes
                </label>
                <span className="badge badge-secondary float-end">120</span>
              </div>
              {/* Checked checkbox */}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultValue
                  id="flexCheckChecked2"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="flexCheckChecked2">
                  Toyota
                </label>
                <span className="badge badge-secondary float-end">15</span>
              </div>
              {/* Checked checkbox */}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultValue
                  id="flexCheckChecked3"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="flexCheckChecked3">
                  Mitsubishi
                </label>
                <span className="badge badge-secondary float-end">35</span>
              </div>
              {/* Checked checkbox */}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultValue
                  id="flexCheckChecked4"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="flexCheckChecked4">
                  Nissan
                </label>
                <span className="badge badge-secondary float-end">89</span>
              </div>
              {/* Default checkbox */}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultValue
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Honda
                </label>
                <span className="badge badge-secondary float-end">30</span>
              </div>
              {/* Default checkbox */}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultValue
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Suzuki
                </label>
                <span className="badge badge-secondary float-end">30</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Brands;
