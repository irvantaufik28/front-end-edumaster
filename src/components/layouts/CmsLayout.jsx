import { Footer } from "rsuite";
import SideBarList from "./SideBarList";
import TopBarList from "./TopBarList";

// eslint-disable-next-line react/prop-types
const CmsLayout = ({ children }) => {
  return (
    <>
      <div id="wrapper">
        <SideBarList />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <TopBarList />
            {children}
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

export default CmsLayout;
