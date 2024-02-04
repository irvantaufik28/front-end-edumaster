/* eslint-disable react/no-unescaped-entities */

import { useSelector } from "react-redux"
import { productSelector } from "../../../../../../features/ecommerce/productSlice"
import FormatterCurrencyIDR from "../../../../../../utils/common"

const ProductAction = () => {
    const product = useSelector(productSelector.selectAll)
  return (
   <>
    <main className="col-lg-6">
          <div className="ps-lg-3">
            <h4 className="title text-dark">
              {product?.data?.name}
            </h4>
            <div className="d-flex flex-row my-3">
              <div className="text-warning mb-1 me-2">
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fas fa-star-half-alt" />
                <span className="ms-1">
                  4.5
                </span>
              </div>
              <span className="text-muted"><i className="fas fa-shopping-basket fa-sm mx-1" />154 orders</span>
              <span className="text-success ms-2">{product?.data?.stock}</span>
            </div>
            <div className="mb-3">
              <span className="h5">{FormatterCurrencyIDR.format(product?.data?.price)}</span>
              <span className="text-muted">/per pcs</span>
            </div>
            <p>
              {product?.data?.description}
            </p>
            <div className="row">
              <dt className="col-3">Type:</dt>
              <dd className="col-9">Regular</dd>
              <dt className="col-3">Color</dt>
              <dd className="col-9">Brown</dd>
              <dt className="col-3">Material</dt>
              <dd className="col-9">Cotton, Jeans</dd>
              <dt className="col-3">Brand</dt>
              <dd className="col-9">Reebook</dd>
            </div>
            <hr />
            <div className="row mb-4">
              <div className="col-md-4 col-6">
                <label className="mb-2">Size</label>
                <select className="form-select border border-secondary" style={{height: 35}}>
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                </select>
              </div>
              {/* col.// */}
              <div className="col-md-4 col-6 mb-3">
                <label className="mb-2 d-block">Quantity</label>
                <div className="input-group mb-3" style={{width: 170}}>
                  <button className="btn btn-white border border-secondary px-3" type="button" id="button-addon1" data-mdb-ripple-color="dark">
                    <i className="fas fa-minus" />
                  </button>
                  <input type="text" className="form-control text-center border border-secondary" placeholder={14} aria-label="Example text with button addon" aria-describedby="button-addon1" />
                  <button className="btn btn-white border border-secondary px-3" type="button" id="button-addon2" data-mdb-ripple-color="dark">
                    <i className="fas fa-plus" />
                  </button>
                </div>
              </div>
            </div>
            <a href="#" className="btn btn-warning shadow-0"> Buy now </a>
            <a href="#" className="btn btn-primary shadow-0"> <i className="me-1 fa fa-shopping-basket" /> Add to cart </a>
            <a href="#" className="btn btn-light border border-secondary py-2 icon-hover-detail-product px-3"> <i className="me-1 fa fa-heart fa-lg" /> Save </a>
          </div>
        </main>
   </>
  )
}

export default ProductAction