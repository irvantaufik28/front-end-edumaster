import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {  Button, Card, Col, Row, Tab, Tabs } from "react-bootstrap";
import { CgImport } from "react-icons/cg";
import ButtonPrimary from "../../../components/ui/button/ButtonPrimary";
import { MdPhotoCamera } from "react-icons/md";
import TabStaffTeacherInfo from "./partials/TabStaffTeacherInfo";
import { getById, staffSelector } from "../../../features/staffSlice";
import TabCourseInfo from "./partials/TabCourseInfo";
import TabTeacherSchedule from "./partials/TabTeacherSchedule";
const StaffTeacherDetail = () => {
  const student = useSelector(staffSelector.getById);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [key, setKey] = useState("personal_detail");
  useEffect(() => {
    dispatch(getById(id));
  }, [dispatch, id]);

  return (
    <Row>
      <Card style={{ width: "100%", height: "auto", marginBottom: "20px" }}>
        <Card.Body>
          <Row>
            <Col md={1} className="student-personal-foto">
              <img
                src={student?.foto_url}
                alt="Preview"
                style={{
                  width: "100px",
                  height: "100px",
                  border: "1px solid #ccc",
                }}
              />
            </Col>
            <Col md={4} className="student-personal-name">
              <Row>
                <span style={{ fontSize: "30px" }}>{`${
                  student?.first_name ?? ""
                } ${student?.last_name ?? ""}`}</span>
              </Row>
              <Row>
                <div className="button-change-foto">
                  <Button variant="light"><MdPhotoCamera/> change Photo </Button>
                </div>
              </Row>
            </Col>
            <Col
              md={7}
              className="student-personal-button"
              style={{ justifyContent: "end", display: "flex", height: "50%" }}
            >
              <ButtonPrimary title="download CV" icon={<CgImport />} />
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
              eventKey="personal_detail"
              title="Personal Detail"
              className="tab-student-detail"
            >
              <TabStaffTeacherInfo />
            </Tab>
            <Tab
              eventKey="teacher_course"
              title="Teacher Course"
              className="tab-student-detail"
            >
              <TabCourseInfo />
            </Tab>
            <Tab
              eventKey="Schedule"
              title="schedule"
              className="tab-student-detail"
            >
              <TabTeacherSchedule />
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </Row>
  );
};

export default StaffTeacherDetail;
