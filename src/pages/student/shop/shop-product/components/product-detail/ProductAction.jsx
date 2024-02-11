/* eslint-disable react/no-unescaped-entities */

import { useDispatch, useSelector } from "react-redux";
import { productSelector } from "../../../../../../features/ecommerce/productSlice";
import FormatterCurrencyIDR from "../../../../../../utils/common";
import {  useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import config from "../../../../../../config";
import Swal from "sweetalert2";
import { getAllCart } from "../../../../../../features/ecommerce/cartSlice";

const ProductAction = () => {
  const [cookies] = useCookies(["token"]);
  const token = cookies.token ?? null;
  const product = useSelector(productSelector.selectAll);
  const [qty, setQty] = useState(1); // Initialize quantity state with 1
  const dispatch = useDispatch()

 
  // Function to handle increasing quantity
  const increaseQty = () => {
    setQty(qty + 1);
  };

  // Function to handle decreasing quantity
  const decreaseQty = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  // Function to handle adding product to cart
  const addToCart = async () => {
    const payload = {
      cart_details: [
        {
          product_id: product?.data?._id,
          qty: qty,
        },
      ],
    };

    try {
      await axios.post(config.apiUrl + `/cart`, payload, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Product added to cart successfully!',
        timer: 2000, 
        showConfirmButton: false 
    });
    dispatch(getAllCart())
   
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };


  return (
    <>
      <main className="col-lg-6">
        <div className="ps-lg-3">
          <h4 className="title text-dark">{product?.data?.name}</h4>
          <div className="d-flex flex-row my-3">
            <div className="text-warning mb-1 me-2">
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fas fa-star-half-alt" />
              <span className="ms-1">4.5</span>
            </div>
            <span className="text-muted">
              <i className="fas fa-shopping-basket fa-sm mx-1" />
              154 orders
            </span>
            <span className="text-success ms-2">{product?.data?.stock}</span>
          </div>
          <div className="mb-3">
            <span className="h5">
              {FormatterCurrencyIDR.format(product?.data?.price)}
            </span>
            <span className="text-muted">/per pcs</span>
          </div>
          <p>{product?.data?.description}</p>
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
              <select
                className="form-select border border-secondary"
                style={{ height: 35 }}
              >
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>
            {/* col.// */}
            <div className="col-md-4 col-6 mb-3">
              <label className="mb-2 d-block">Quantity</label>
              <div className="input-group mb-3" style={{ width: 170 }}>
                <button
                  className="btn btn-white border border-secondary px-3"
                  type="button"
                  id="button-addon1"
                  onClick={decreaseQty} // Attach decreaseQty function
                >
                  <i className="fas fa-minus" />
                </button>
                <input
                  type="text"
                  className="form-control text-center border border-secondary"
                  value={qty} // Bind value to the quantity state
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                  readOnly // Make input readOnly
                />
                <button
                  className="btn btn-white border border-secondary px-3"
                  type="button"
                  id="button-addon2"
                  onClick={increaseQty} // Attach increaseQty function
                >
                  <i className="fas fa-plus" />
                </button>
              </div>
            </div>
          </div>
          <a href="#" className="btn btn-primary shadow-0" onClick={addToCart}>
            <i className="me-1 fa fa-shopping-basket" /> Add to cart{" "}
          </a>
        </div>
      </main>

    </>
  );
};

export default ProductAction;
