import FormStudent from "./components/FromStudent";
import { useSelector } from "react-redux";
import HeaderContent from "./components/HeaderContent";
import CmsLayout from "../../components/layouts/CmsLayout";

const StudentFormPage = () => {
  let title = "Create";
  const dataInitialValues = useSelector((state) => state.student.data);
  if (dataInitialValues.type === "edit") title = "Update";
  return (
    <>
      <CmsLayout>
        <div className="main-content">
          <HeaderContent title={"Student"} type={title} />
          <div className="main-content-alpha">
            <FormStudent />
          </div>
        </div>
      </CmsLayout>
    </>
  );
};

export default StudentFormPage;
