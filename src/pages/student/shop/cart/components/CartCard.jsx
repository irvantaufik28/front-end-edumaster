import { useDispatch, useSelector } from "react-redux";
import {
  cartSelector,
  getAllCart,
} from "../../../../../features/ecommerce/cartSlice";
import { Row } from "react-bootstrap";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import axios from "axios";
import { useCookies } from "react-cookie";
import config from "../../../../../config";
import Swal from "sweetalert2";

const CartCard = () => {
  const [cookies] = useCookies(["token"]);
  const token = cookies.token ?? null;
  const cartData = useSelector(cartSelector.selectAll);
  const dispatch = useDispatch();

  const formatterCurrencyIDR = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  // Fungsi untuk mengurangi jumlah barang
  const decreaseQuantity = async (item) => {
    const newQty = item.qty - 1; // Ensure the quantity doesn't go below 0

    if (newQty === 0) {
      // Tampilkan SweetAlert untuk konfirmasi
      const { isConfirmed } = await Swal.fire({
        title: "Are you sure?",
        text: "Are you sure you want to remove this product from your cart?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove it!",
      });

      if (!isConfirmed) {
        return; // Stop the function execution if the user cancels the confirmation
      }
    }

    const payload = {
      cart_details: [
        {
          product_id: item?.product?._id,
          qty: newQty,
        },
      ],
    };

    await axios.post(config.apiUrl + `/cart`, payload, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    // Jangan lupa untuk memperbarui state setelah pengurangan
    dispatch(getAllCart());
  };

  // Fungsi untuk menambah jumlah barang
  const increaseQuantity = async (item) => {
    console.log(item?.qty);
    const payload = {
      cart_details: [
        {
          product_id: item?.product?._id,
          qty: item?.qty + 1,
        },
      ],
    };

    await axios.post(config.apiUrl + `/cart`, payload, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    dispatch(getAllCart());
  };

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

              {/* Data */}
            </div>
            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0 cart-action">
              {/* Quantity */}
              <div className="d-flex mb-4" style={{ maxWidth: 300 }}>
                <div
                  className="px-3 me-2 button-min-add-cart"
                  onClick={() => decreaseQuantity(item)}
                >
                  <FaMinusCircle />
                </div>
                <div className="form-outline qty-form-cart">
                  <input
                    id={`form${index}`}
                    min={0}
                    name="qty"
                    value={item.qty} // Gunakan value untuk menampilkan jumlah barang saat ini
                    type="text"
                    className="form-control"
                    readOnly // Jadikan input hanya baca saja, karena nilai qty dikelola oleh Redux
                  />
                  <label className="form-label" htmlFor={`form${index}`}>
                    Quantity
                  </label>
                </div>
                <div
                  className="px-3 me-2 button-min-add-cart"
                  onClick={() => increaseQuantity(item)}
                >
                  <FaPlusCircle />
                </div>
              </div>
              <p className="text-start text-md-center">
                <strong>
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
