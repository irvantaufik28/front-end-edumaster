import {  useSelector } from "react-redux";
import {
  cartSelector,
} from "../../../../../features/ecommerce/cartSlice";
import { Row } from "react-bootstrap";
import { FaCircleMinus } from "react-icons/fa6";
import { MdAddCircle } from "react-icons/md";

const CartCard = () => {
  const cartData = useSelector(cartSelector.selectAll);
  

  const formatterCurrencyIDR = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

 
  return (
    <>
      {cartData?.data?.cart_details?.map((item, index) => (
        <>
          <Row key={index} className="cart-card-product">
            <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
              {/* Image */}
              <div
                className="bg-image hover-overlay hover-zoom ripple rounded"
                data-mdb-ripple-color="light"
              >
                <img
                  src={item?.product?.product_images[0]?.image_url}
                  className="w-50"
                />
                <a href="#!">
                  <div
                    className="mask"
                    style={{
                      backgroundColor: "rgba(251, 251, 251, 0.2)",
                    }}
                  />
                </a>
              </div>
              {/* Image */}
            </div>
            <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
              {/* Data */}
              <p>
                <strong>{item?.product?.name}</strong>
              </p>
              {/* <p>Color: red</p> */}
              <p>Price : {formatterCurrencyIDR.format(item?.product?.price)}</p>
              <button
                type="button"
                className="btn btn-primary btn-sm me-1 mb-2"
                data-mdb-toggle="tooltip"
                title="Remove item"
              >
                <i className="fas fa-trash" />
              </button>
              <button
                type="button"
                className="btn btn-danger btn-sm mb-2"
                data-mdb-toggle="tooltip"
                title="Move to the wish list"
              >
                <i className="fas fa-heart" />
              </button>
              {/* Data */}
            </div>
            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0 cart-action">
              {/* Quantity */}
              <div className="d-flex mb-4" style={{ maxWidth: 300 }}>
                <div className="px-3 me-2 button-min-add-cart">
                  <FaCircleMinus />
                </div>
                <div className="form-outline qty-form-cart">
                  <input
                    id="form1"
                    min={0}
                    name="quantity"
                    defaultValue={item?.qty}
                    type="number"
                    className="form-control"
                  />
                  <label className="form-label" htmlFor="form1">
                    Quantity
                  </label>
                </div>
                <div className="px-3 me-2 button-min-add-cart">
                  <MdAddCircle />
                </div>
              </div>
              <p className="text-start text-md-center">
                <strong>
                  {" "}
                  {formatterCurrencyIDR.format(item?.total_price)}
                </strong>
              </p>
              {/* Price */}
            </div>
          </Row>
        </>
      ))}
    </>
  );
};

export default CartCard;
