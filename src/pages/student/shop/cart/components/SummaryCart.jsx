import { useSelector } from "react-redux";
import { cartSelector } from "../../../../../features/ecommerce/cartSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import config from "../../../../../config";
import Swal from "sweetalert2";

const SummaryCart = () => {
  const [cookies] = useCookies(["token"]);
  const token = cookies.token ?? null;
  const cartData = useSelector(cartSelector.selectAll);
  const formatterCurrencyIDR = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  const handelCheckout = async () => {
    try {
      const response = await axios.post(
        config.apiUrl + "/order",
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      )

      if (response.data) {
        navigate(`/student-page/shop/order/${response.data.data._id}`);
      }

      return;
    } catch (error) {
      const errorMessage = error.response.data.errors
      Swal.fire({
        icon: 'error',
        title: 'failed',
        text: errorMessage,
        showConfirmButton: false 
    });
      console.error("Error during checkout:", error.response.data.errors);
    }
  };
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
              <span>
                {formatterCurrencyIDR.format(cartData?.data?.grand_total_price)}
              </span>
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
                <strong>
                  {formatterCurrencyIDR.format(
                    cartData?.data?.grand_total_price
                  )}
                </strong>
              </span>
            </li>
          </ul>
          <button
            type="button"
            className="btn btn-primary btn-lg btn-block"
            onClick={() => {
              handelCheckout();
            }}
          >
            checkout
          </button>
          <button
            type="button"
            className="btn btn-primary btn-lg btn-block"
            onClick={() => {
              handleNavigation(`/student-page/shop/product`);
            }}
          >
            continue shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryCart;
