import CmsLayout from "../../components/layouts/CmsLayout";
import HeaderContentGlobal from "../../components/ui/header/HeaderContentGlobal";
import StaffOfficeDetail from "./components/StaffOfficeDetail";

const StaffOfficeDetailPage = () => {
  return (
    <>
      <CmsLayout>
        <div className="main-content">
          <HeaderContentGlobal page={"Staff"} type={"Detail"} title={"Staff"} />
          <div className="main-content-alpha">
            <StaffOfficeDetail />
          </div>
        </div>
      </CmsLayout>
    </>
  );
};

export default StaffOfficeDetailPage;
