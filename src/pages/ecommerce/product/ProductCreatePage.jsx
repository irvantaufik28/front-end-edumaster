import { useDispatch } from "react-redux";
import FormProduct from "./components/FormProduct";
import { setDataProduct } from "../../../features/ecommerce/productSlice";
import { useEffect } from "react";
import EcommerceLayout from "../../../components/layouts/EcommerceLayout";

const ProductCreatePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const defaultForm = {
      initialValues: null,
      type: "add",
      editId: null,
    };
    const fetchData = async () => {
      dispatch(
        setDataProduct({
          ...defaultForm,
        })
      );
    };

    fetchData();
  }, [dispatch]);
  return (
    <>
      <EcommerceLayout>
        <FormProduct />
      </EcommerceLayout>
    </>
  );
};

export default ProductCreatePage;
