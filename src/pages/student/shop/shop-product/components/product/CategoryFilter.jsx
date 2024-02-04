import { useEffect, useState } from "react";
import "../../style/categoryfilter.css";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryProductSelector,
  getAllCategory,
} from "../../../../../../features/ecommerce/categoryProduct";

const CategoryFilter = () => {
  const dispatch = useDispatch();
  const categoryList = useSelector(categoryProductSelector.selectAll);
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  const handleNavigate = (id) => {
    console.log(id)
    alert(id)

  }

  console.log(categoryList);
  return (
    <>
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
          <button
            className="accordion-button text-dark bg-light"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#panelsStayOpen-collapseOne"
            aria-expanded={isOpen}
            aria-controls="panelsStayOpen-collapseOne"
            onClick={handleToggle}
          >
            Category
          </button>
          <div
            id="panelsStayOpen-collapseOne"
            className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}
            aria-labelledby="headingOne"
          >
            <div className="accordion-body">
              <ul className="list-unstyled">
                {categoryList?.map((item, index) => (
                  <li className="text-dark" key={index} onClick={() => handleNavigate(item?._id)}>
                    {item?.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </h2>
      </div>
    </>
  );
};

export default CategoryFilter;
