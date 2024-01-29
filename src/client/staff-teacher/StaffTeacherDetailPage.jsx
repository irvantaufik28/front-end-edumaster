import CmsLayout from "../../components/layouts/CmsLayout";
import HeaderContentGlobal from "../../components/ui/header/HeaderContentGlobal";
import StaffTeacherDetail from "./components/StaffTeacherDetail";

const StaffTeacherDetailPage = () => {
  return (
    <>
      <CmsLayout>
        <div className="main-content">
          <HeaderContentGlobal
            page={"Teacher"}
            type={"Detail"}
            title={"Teacher"}
          />
          <div className="main-content-alpha">
            <StaffTeacherDetail />
          </div>
        </div>
      </CmsLayout>
    </>
  );
};

export default StaffTeacherDetailPage;
