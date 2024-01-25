import { useDispatch } from "react-redux"
import Footer from "../../components/layouts/Footer"
import SideBarEcommerce from "../../components/layouts/SideBarEcommerce"
import TopBarList from "../../components/layouts/TopBarList"
import FormProduct from "./components/FormProduct"
import { setDataProduct } from "../../features/ecommerce/productSlice"
import { useEffect } from "react"

const ProductCreatePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const defaultForm = {
      initialValues: null,
      type: 'add',
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
  )
}

export default ProductCreatePage