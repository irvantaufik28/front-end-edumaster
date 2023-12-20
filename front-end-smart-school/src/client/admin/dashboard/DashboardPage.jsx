import Footer from "../../../components/layouts/Footer";
import { Header } from "../../../components/layouts/Header";
import { SideNav } from "../../../components/layouts/SideNav";
import Dashboard from "../../../components/layouts/Home";

const DashboardPage = () => {
  return (
    <>
    <Header />
    <SideNav />
    <Dashboard />
    <Footer/>
    </>
  )
};

export default DashboardPage;
