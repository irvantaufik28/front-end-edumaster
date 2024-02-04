import { useState } from "react";
import Brands from "./Brands";
import PriceFilter from "./PriceFilter";
import RatingFilter from "./RatingFilter";
import CardProducts from "./CardProducts";
import CategoryFilter from "./CategoryFilter";

const ProductList = () => {
  const [showFilter, setShowFilter] = useState(false);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <>
      <div>
        {/* Main Navigation */}

        {/* sidebar + content */}
        <section className>
          <div className="container">
            <div className="row">
              {/* sidebar */}
              <div className="col-lg-3">
                {/* Toggle button */}
                <button
                  className="btn btn-outline-secondary mb-3 w-100 d-lg-none"
                  type="button"
                  onClick={toggleFilter}
                >
                  <span>{showFilter ? "Hide filter" : "Show filter"}</span>
                </button>
                {/* Collapsible wrapper */}
                <div
                  className={`collapse card d-lg-block mb-5 ${
                    showFilter ? "show" : ""
                  }`}
                  id="navbarSupportedContent"
                >
                  <div
                    className="accordion"
                    id="accordionPanelsStayOpenExample"
                  >
                    {/* Related item */}
                    <CategoryFilter />

                    {/* Brands */}
                    <Brands />

                    {/* Price filter */}
                    <PriceFilter />

                    {/* Ratings */}
                    <RatingFilter />
                  </div>
                </div>
              </div>
              <div className="col-lg-9">
                <CardProducts />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductList;
