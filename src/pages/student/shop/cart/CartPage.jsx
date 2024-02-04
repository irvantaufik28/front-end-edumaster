import { useDispatch } from "react-redux";
import CartCard from "./components/CartCard";
import OptionPayment from "./components/OptionPayment";
import SummaryCart from "./components/SummaryCart";
import "./styles/cart.css";
import { useEffect } from "react";
import { getAllCart } from "../../../../features/ecommerce/cartSlice";
import ShopLayout from "../../../../components/layouts/ShopLayout";
const CartPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCart());
  }, [dispatch]);
  return (
    <ShopLayout>
      <div className="main-content">
        <section className="h-100 gradient-custom">
          <div className="container py-5">
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-8">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">Cart</h5>
                  </div>
                  <div className="card-body">
                    <hr className="my-4" />
                    {/* Single item  looping here*/}
                    <CartCard />
                    {/* Single item */}
                  </div>
                </div>

                <OptionPayment />
              </div>
              {/* sumary */}
              <SummaryCart />
            </div>
          </div>
        </section>
      </div>
    </ShopLayout>
  );
};

export default CartPage;
