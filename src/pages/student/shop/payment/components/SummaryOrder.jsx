import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import config from "../../../../../config";
import Swal from "sweetalert2";
import { orderSelector } from "@features/ecommerce/orderSlice";
import useSnap from "../hooks/useSpan";
import { useState } from "react";
import { Layout } from "./midtrans/Layout";

const SummaryOrder = () => {
  const [cookies] = useCookies(["token"]);
  const token = cookies.token ?? null;

  const [snapShow, setSnapShow] = useState(false);
  const { snapEmbed } = useSnap();

  const orderData = useSelector(orderSelector.selectAll);
  const formatterCurrencyIDR = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  const handelPlaceOrder = async (order_id) => {
    try {
      const response = await axios.post(
        config.apiUrl + `/payment/order-paid/${order_id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data && response.data.data.snap_redirect_url) {
        setSnapShow(true);
        snapEmbed(response.data.data.snap_token, "snap-container", {
          onSuccess: function (result) {
            console.log("success", result);
            navigate(`/order-status?transaction_id=${response.data.data._id}`);
            setSnapShow(false);
          },
          onPending: function (result) {
            console.log("pending", result);
            navigate(`/order-status?transaction_id=${response.data.data_id}`);
            setSnapShow(false);
          },
          onClose: function () {
            navigate(`/order-status?transaction_id=${response.data.data_id}`);
            setSnapShow(false);
          },
        });
      } else if (response && response.status === "error") {
        alert(response.errors.map((msg) => msg.msg).join(", "));
      }
    } catch (error) {
      console.log(error)
      const errorMessage = error.response.data.errors;
      Swal.fire({
        icon: "error",
        title: "failed",
        text: errorMessage,
        showConfirmButton: false,
      });
      console.error("Error during checkout:", error.response.data.errors);
    }
  };
  return (
    <>
      <div className="col-md-8">
        <Layout>
          <div id="snap-container"></div>
        </Layout>
      </div>
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
                  <span>x {orderData?.total_product}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                  Total Qty
                  <span>x {orderData?.total_qty}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="card-body">
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                Products
                <span>
                  {formatterCurrencyIDR.format(orderData?.grand_total_price)}
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
                    {formatterCurrencyIDR.format(orderData?.grand_total_price)}
                  </strong>
                </span>
              </li>
            </ul>
            <button
                type="button"
                className="btn btn-primary btn-lg btn-block"
                onClick={() => {
                    if (!snapShow) {
                        handelPlaceOrder(orderData?._id);
                    }
                }}
                disabled={snapShow}
            >
                Place Order
            </button>
            <button
                type="button"
                className="btn btn-danger btn-lg btn-block"
                onClick={() => {
                    handleNavigation(`/student-page/shop/product`);
                }}
            >
                Cancel Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SummaryOrder;
