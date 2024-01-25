import Footer from "../../components/layouts/Footer"
import SideBarEcommerce from "../../components/layouts/SideBarEcommerce"
import TopBarList from "../../components/layouts/TopBarList"

const EcommeceDashboard = () => {
  return (
    <>
    <div id="wrapper">
     <SideBarEcommerce />
     <div id="content-wrapper" className="d-flex flex-column">
       <div id="content">
         <TopBarList />
         <h1>Dashboard Ecommerce</h1>
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

export default EcommeceDashboard