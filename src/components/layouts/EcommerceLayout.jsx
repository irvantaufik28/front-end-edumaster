import Footer from "./Footer";
import SideBarEcommerce from "./SideBarEcommerce";
import TopBarList from "./TopBarList";

// eslint-disable-next-line react/prop-types
const EcommerceLayout = ({ children }) => {
    return (
      <>
        <div id="wrapper">
          <SideBarEcommerce />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <TopBarList />
              {children}
            </div>
            <Footer />
          </div>
        </div>
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up"></i>
        </a>
      </>
    );
  };
  
  export default EcommerceLayout;