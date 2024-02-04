import Footer from "./Footer";
import TopBarShop from "./TopBarShop";

// eslint-disable-next-line react/prop-types
const ShopLayout = ({ children }) => {
    return (
      <>
        <div id="wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <TopBarShop />
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
  
  export default ShopLayout;