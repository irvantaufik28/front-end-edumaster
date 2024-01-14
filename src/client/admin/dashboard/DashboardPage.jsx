import SideBar from "../../../components/layouts/SideBar";
import Topbar from "../../../components/layouts/TopBar";

const DashboardPage = () => {
  return (
    <>
      <Topbar />
      <div className="content">
        <SideBar />
        <div className="main-content">
          <h1>DashBoardPage</h1>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
