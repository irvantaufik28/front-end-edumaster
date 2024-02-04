/* eslint-disable react/no-unescaped-entities */
import { useEffect } from "react";
import { LuShoppingCart } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import {
  cartSelector,
  getAllCart,
} from "../../../../features/ecommerce/cartSlice";
import { useNavigate } from "react-router-dom";
const CartNotication = () => {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  const cartData = useSelector(cartSelector.selectAll);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCart());
  }, [dispatch]);

  const formatterCurrencyIDR = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  return (
    <>
      <li className="nav-item dropdown no-arrow mx-1">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          id="messagesDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i className="fa-solid fa-cart-shopping" />
          <i>
            {" "}
            <LuShoppingCart fontSize={"20px"} />{" "}
          </i>
          {/* Counter - Messages */}
          <span className="badge badge-danger badge-counter">
            {cartData?.data?.cart_details?.length}
          </span>
        </a>
        {/* Dropdown - Messages */}
        <div
          className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
          aria-labelledby="messagesDropdown"
        >
          <h6 className="dropdown-header">My Cart</h6>
          {cartData?.data?.cart_details?.slice(0, 5).map((item, index) => (
            <div
              key={index}
              className="dropdown-item d-flex align-items-center"
            >
              <div className="dropdown-list-image mr-3">
                <img
                  className="rounded-circle"
                  src={item?.product?.product_images[0]?.image_url}
                  alt="Profile"
                />
              </div>
              <div className="font-weight-bold">
                <div className="text-truncate">
                  <strong>{item?.product?.name}</strong>
                </div>
                <div className="small text-gray-500">
                  <p>
                    Price : {formatterCurrencyIDR.format(item?.product?.price)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <a
            className="dropdown-item text-center small text-gray-500"
            href="#"
            onClick={() => handleNavigation("/student-page/school-shop/cart")}
          >
            Read More
          </a>
        </div>
      </li>
    </>
  );
};

export default CartNotication;
