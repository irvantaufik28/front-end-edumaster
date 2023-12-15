import Footer from "../../../components/layouts/Footer";
import { Header } from "../../../components/layouts/Header";
import { SideNav } from "../../../components/layouts/SideNav";

const DashboardPage = () => {
  return (
    <>
    <Header />
    <SideNav />
    <div className="content-wrapper"><h1>Dashboard Page</h1></div>
    <Footer/>
    </>
  )
};

export default DashboardPage;
