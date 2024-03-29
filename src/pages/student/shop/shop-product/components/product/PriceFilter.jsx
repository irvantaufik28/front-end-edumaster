import { useState } from "react";

const PriceFilter = () => {
  const [isOpen, setIsOpen] = useState(true); // Mengubah initial state menjadi false

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
            data-mdb-target="#panelsStayOpen-collapseThree"
            aria-expanded={isOpen ? "true" : "false"}
            aria-controls="panelsStayOpen-collapseThree"
            onClick={handleToggle}
          >
            Price
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseThree"
          className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}
          aria-labelledby="headingThree"
        >
          <div className="accordion-body">
            <div className="range">
              <input type="range" className="form-range" id="customRange1" />
            </div>
            <div className="row mb-3">
              <div className="col-6">
                <p className="mb-0">Min</p>
                <div className="form-outline">
                  <input
                    type="number"
                    id="typeNumber"
                    className="form-control"
                  />
                  <label className="form-label" htmlFor="typeNumber">
                    Rp.0
                  </label>
                </div>
              </div>
              <div className="col-6">
                <p className="mb-0">Max</p>
                <div className="form-outline">
                  <input
                    type="number"
                    id="typeNumber"
                    className="form-control"
                  />
                  <label className="form-label" htmlFor="typeNumber">
                    Rp.1.0000
                  </label>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-white w-100 border border-secondary"
            >
              apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PriceFilter;
