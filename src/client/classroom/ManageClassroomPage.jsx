import ManageClassroom from "./components/ManageClassroom";
import HeaderContentGlobal from "../../components/ui/header/HeaderContentGlobal";
import { Card, Col, Row, Tab, Table, Tabs } from "react-bootstrap";
import { useState } from "react";
import ButtonPrimary from "../../components/ui/button/ButtonPrimary";
import { MdModeEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { classroomSelector } from "../../features/classroomSlice";
import TabClassroomSchedule from "./components/partials/TabClassroomSchedule";
import CmsLayout from "../../components/layouts/CmsLayout";
const ManageClassroomPage = () => {
  const classroom = useSelector(classroomSelector.selectAll);
  const [key, setKey] = useState("list_student");
  return (
    <>
      <CmsLayout>
        <div className="main-content">
          <HeaderContentGlobal
            page={"classroom"}
            title={"Classroom"}
            type={"Manage"}
          />
          <div className="main-content-alpha">
            <Card
              style={{
                width: "100%",
                height: "auto",
                marginBottom: "20px",
              }}
            >
              <Card.Body>
                <div className="button-edit-current-classroom">
                  <ButtonPrimary
                    title="Edit Classroom"
                    icon={<MdModeEdit />}
                    // onClick={() => handleEditCurrentClassroom()}
                  />
                </div>
                <Row>
                  <Col md={6}>
                    <Table>
                      <tbody>
                        <tr>
                          <th className="no-border" width="150">
                            Code
                          </th>
                          <td className="no-border">
                            : <span id="text-code">{classroom?.code}</span>
                          </td>
                        </tr>
                        <tr>
                          <th className="no-border" width="150">
                            Class Major
                          </th>
                          <td className="no-border">
                            :{" "}
                            <span id="text-class_major">
                              {classroom?.classMajor?.name}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <th className="no-border" width="150">
                            Grade
                          </th>
                          <td className="no-border">
                            : <span id="text-level">{classroom?.level}</span>
                          </td>
                        </tr>
                        <tr>
                          <th className="no-border" width="150">
                            Year Group
                          </th>
                          <td className="no-border">
                            :{" "}
                            <span id="text-year_group">
                              {classroom?.year_group}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <th className="no-border" width="150">
                            Total Student
                          </th>
                          <td className="no-border">
                            :{" "}
                            <span id="text-year_group">
                              {classroom?.students_classroom?.length} Person
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                  <Col md={6}>
                    <Table>
                      <tbody>
                        <tr>
                          <th className="no-border" width="150">
                            Homeroom Teacher
                          </th>
                          <td className="no-border">
                            : <span id="text-code">Dummy Homeroom Teacher</span>
                          </td>
                        </tr>
                        <tr>
                          <th className="no-border" width="150">
                            Leader
                          </th>
                          <td className="no-border">
                            : <span id="text-class_major">Dummy Leader</span>
                          </td>
                        </tr>
                        <tr>
                          <th className="no-border" width="150">
                            Vice Leader
                          </th>
                          <td className="no-border">
                            : <span id="text-level">Dummy Vice Leadey</span>
                          </td>
                        </tr>
                        <tr>
                          <th className="no-border" width="150">
                            Secertary
                          </th>
                          <td className="no-border">
                            : <span id="text-year_group">Dummy Secretary</span>
                          </td>
                        </tr>
                        <tr>
                          <th className="no-border" width="150">
                            Finance
                          </th>
                          <td className="no-border">
                            : <span id="text-year_group">Dummy Finance</span>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card style={{ width: "100%", height: "auto" }}>
              <Card.Body>
                <Tabs
                  id="controlled-tab-example"
                  activeKey={key}
                  onSelect={(k) => setKey(k)}
                  className="mb-3 tab-student"
                >
                  <Tab
                    eventKey="list_student"
                    title="List Student"
                    className="tab-student-detail"
                  >
                    <ManageClassroom />
                  </Tab>
                  <Tab
                    eventKey="list_teacher"
                    title="List Teacher"
                    className="tab-student-detail"
                  >
                    {/* <TabParentsInfo /> */}
                  </Tab>
                  <Tab
                    eventKey="classroom_schedule"
                    title="Classroom Schedule"
                    className="tab-student-detail"
                  >
                    <TabClassroomSchedule />
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>
          </div>
        </div>
      </CmsLayout>
    </>
  );
};

export default ManageClassroomPage;
