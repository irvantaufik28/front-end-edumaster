import CmsLayout from "../../components/layouts/CmsLayout";
import HeaderContentGlobal from "../../components/ui/header/HeaderContentGlobal";
import FormCreateTeacher from "./components/FormCreateTeacher";

const StaffTeacherCreatePage = () => {
  return (
    <>
      <CmsLayout>
        <div className="main-content">
          <HeaderContentGlobal
            title={"Teacher"}
            page={"teacher"}
            type={"Add"}
          />
          <div className="main-content-alpha">
            <FormCreateTeacher />
          </div>
        </div>
      </CmsLayout>
    </>
  );
};

export default StaffTeacherCreatePage;
