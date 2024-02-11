import { useDispatch } from "react-redux";
import { useEffect } from "react";
import ShopLayout from "@components/layouts/ShopLayout";
import HeaderContentGlobalStudent from "@components/ui/header/HeaderContentGlobalStudent";
import { useParams } from "react-router-dom";
import { getOrderById } from "@features/ecommerce/orderSlice";
import { Row } from "react-bootstrap";
import DataOrderer from "./components/DataOrderer";
import ProductOrdered from "./components/ProductOrdered";
import SummaryOrder from "./components/SummaryOrder";

const PaymentOrder = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderById(_id));
  }, [dispatch, _id]);
  return (
    <ShopLayout>
      <div className="main-content">
        <section className="h-100 gradient-custom">
          <div className="container py-5">
            <div className="row d-flex justify-content-center my-4">
              <HeaderContentGlobalStudent
                page={"Shop"}
                type={"Order"}
                title={"Order"}
              />
              <Row>
                <div className="col-md-12">
                  <div className="card mb-4">
                    <div className="card-header py-3">
                      <h5 className="mb-0">Data orderer</h5>
                    </div>
                    <div className="card-body">
                      <DataOrderer />
                    </div>
                  </div>
                </div>
              </Row>
              <Row>
                <div className="col-md-12">
                  <div className="card mb-4">
                    <div className="card-header py-3">
                      <h5 className="mb-0">Products Ordered</h5>
                    </div>
                    <div className="card-body">
                      <hr className="my-4" />
                      <ProductOrdered />
                    </div>
                  </div>
                </div>
              </Row>
              <SummaryOrder />
            </div>
          </div>
        </section>
      </div>
    </ShopLayout>
  );
};

export default PaymentOrder;
