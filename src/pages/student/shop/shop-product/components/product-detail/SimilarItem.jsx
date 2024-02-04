/* eslint-disable react/no-unescaped-entities */

const SimilarItem = () => {
  return (
  
      <div className="px-0 border rounded-2 shadow-0">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Similar items</h5>
            <div className="d-flex mb-3">
              <a href="#" className="me-3">
                <img
                  src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/8.webp"
                  style={{ minWidth: 96, height: 96 }}
                  className="img-md img-thumbnail"
                />
              </a>
              <div className="info">
                <a href="#" className="nav-link mb-1">
                  Rucksack Backpack Large <br />
                  Line Mounts
                </a>
                <strong className="text-dark"> $38.90</strong>
              </div>
            </div>
            <div className="d-flex mb-3">
              <a href="#" className="me-3">
                <img
                  src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/9.webp"
                  style={{ minWidth: 96, height: 96 }}
                  className="img-md img-thumbnail"
                />
              </a>
              <div className="info">
                <a href="#" className="nav-link mb-1">
                  Summer New Men's Denim <br />
                  Jeans Shorts
                </a>
                <strong className="text-dark"> $29.50</strong>
              </div>
            </div>
            <div className="d-flex mb-3">
              <a href="#" className="me-3">
                <img
                  src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/10.webp"
                  style={{ minWidth: 96, height: 96 }}
                  className="img-md img-thumbnail"
                />
              </a>
              <div className="info">
                <a href="#" className="nav-link mb-1">
                  {" "}
                  T-shirts with multiple colors, for men and lady{" "}
                </a>
                <strong className="text-dark"> $120.00</strong>
              </div>
            </div>
            <div className="d-flex">
              <a href="#" className="me-3">
                <img
                  src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/11.webp"
                  style={{ minWidth: 96, height: 96 }}
                  className="img-md img-thumbnail"
                />
              </a>
              <div className="info">
                <a href="#" className="nav-link mb-1">
                  {" "}
                  Blazer Suit Dress Jacket for Men, Blue color{" "}
                </a>
                <strong className="text-dark"> $339.90</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
  
  );
};

export default SimilarItem;
