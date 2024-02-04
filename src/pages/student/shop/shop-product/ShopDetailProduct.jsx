import { useParams } from "react-router-dom";
import ShopLayout from "../../../../components/layouts/ShopLayout";
import DetailProduct from "./components/product-detail/DetailProduct";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getProductById,
  productSelector,
} from "../../../../features/ecommerce/productSlice";

const ShopDetailProduct = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(productSelector.selectAll);
  useEffect(() => {
    dispatch(getProductById(_id));
  }, [dispatch, _id]);

  console.log(product)
  return (
    <ShopLayout>
      <div className="main-content">
        <DetailProduct />
      </div>
    </ShopLayout>
  );
};

export default ShopDetailProduct;
