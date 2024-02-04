/* eslint-disable react/no-unescaped-entities */
import "../../style/detailproduct.css";
import ProductAction from "./ProductAction";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import SimilarItem from "./SimilarItem";
const DetailProduct = () => {
  return (
    <div>
      {/* content */}
      <section className="py-5">
        <div className="container">
          <div className="row gx-5">
            {/* image Product */}
            <ProductImages />

            {/* product data */}
            <ProductAction />
          </div>
        </div>
      </section>
      {/* content */}
      <section className="bg-light border-top py-4">
        <div className="container">
          {/* Spec Product */}
          <div className="row gx-4">
            <div className="col-lg-8 mb-4">
              <ProductInfo />
            </div>
            <div className="col-lg-4">
              <SimilarItem />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DetailProduct;
