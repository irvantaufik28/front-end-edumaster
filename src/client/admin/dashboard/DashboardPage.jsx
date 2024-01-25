import Content from "../../../components/layouts/Content";
import Footer from "../../../components/layouts/Footer";
import SideBarList from "../../../components/layouts/SideBarList";

import TopBarList from "../../../components/layouts/TopBarList";

const DashboardPage = () => {
  return (
    <>
       <div id="wrapper">
        <SideBarList />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <TopBarList />
            <Content />
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

export default DashboardPage;
