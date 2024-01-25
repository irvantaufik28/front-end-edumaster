import { useEffect } from "react";
import Footer from "../../components/layouts/Footer";
import SideBarEcommerce from "../../components/layouts/SideBarEcommerce";
import TopBarList from "../../components/layouts/TopBarList";
import FormProduct from "./components/FormProduct";
import axios from "axios";

import { useDispatch } from "react-redux";
import { setDataProduct } from "../../features/ecommerce/productSlice";
import { useParams } from "react-router-dom";
import config from "../../config";
const ProductEditPage = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const token = document.cookie
  .split("; ")
  .find((row) => row.startsWith("token="))
  ?.split("=")[1];
  useEffect(() => {
    const defaultForm = {
      initialValues: null,
      type: 'add',
      editId: null,
    };
    const fetchData = async () => {
      try {
        const { data: resData } = await axios.get(
          config.apiUrl + `/product/` + id,
          {
            headers: {
              authorization: token,
            },
          }
        );
        dispatch(
          setDataProduct({
            ...defaultForm,
            initialValues: resData.data,
            type: 'edit',
            editId: id,
          })
        );
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
  
    fetchData();
  }, [dispatch, id, token]);
  return (
    <>
      <div id="wrapper">
        <SideBarEcommerce />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <TopBarList />
            <FormProduct />
          </div>
          <Footer />
        </div>
      </div>
      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up" />
      </a>
    </>
  );
};

export default ProductEditPage;
