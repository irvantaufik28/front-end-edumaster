import CmsLayout from "../../components/layouts/CmsLayout";
import HeaderContentGlobal from "../../components/ui/header/HeaderContentGlobal";
import FormCreateStaff from "./components/FormCreateStaff";

const StaffOfficeCreatePage = () => {
  return (
    <>
      <CmsLayout>
        <div className="main-content">
          <HeaderContentGlobal title={"Staff"} page={"Staff"} type={"Add"} />
          <div className="main-content-alpha">
            <FormCreateStaff />
          </div>
        </div>
      </CmsLayout>
    </>
  );
};

export default StaffOfficeCreatePage;
