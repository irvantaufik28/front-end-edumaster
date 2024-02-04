import { useSelector } from "react-redux";
import { cartSelector } from "../../../../../features/ecommerce/cartSlice";

const SummaryCart = () => {
  const cartData = useSelector(cartSelector.selectAll);
  const formatterCurrencyIDR = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
  return (
    <div className="col-md-4">
      <div className="card mb-4">
        <div className="card-header py-3">
          <h5 className="mb-0">Summary</h5>
        </div>
        <div className="card-header py-3">
          <h5 className="mb-0">Details</h5>
          <div className="card-body">
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                Total Product
                <span>x {cartData?.data?.total_product}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                Total Qty
                <span>x {cartData?.data?.total_qty}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
              Products
              <span>{formatterCurrencyIDR.format(cartData?.data?.grand_total_price)}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center px-0">
              Shipping
              <span>Gratis</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
              <div>
                <strong>Total amount</strong>
                <strong>
                  <p className="mb-0">(including VAT)</p>
                </strong>
              </div>
              <span>
                <strong>{formatterCurrencyIDR.format(cartData?.data?.grand_total_price)}</strong>
              </span>
            </li>
          </ul>
          <button type="button" className="btn btn-primary btn-lg btn-block">
            checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryCart;
