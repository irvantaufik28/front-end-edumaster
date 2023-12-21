import SideBar from "../../components/layouts/SideBar"
import Topbar from "../../components/layouts/TopBar"
import HeaderContent from "./components/HeaderContent"
import ManageClassroom from "./components/ManageClassroom"

const ManageClassroomPage = () => {
  return (
    <>
    <Topbar />
    <div className="content">
      <SideBar />
      <div className="main-content">
        <HeaderContent title={"Classroom"} type={"Manage"} />
        <div className="main-content-alpha">
          <ManageClassroom />
        </div>
      </div>
    </div>
  </>
  )
}

export default ManageClassroomPage