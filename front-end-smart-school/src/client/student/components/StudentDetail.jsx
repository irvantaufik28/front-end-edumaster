import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getById, studentSelector } from "../../../features/studentSlice";
import { Button, Card, Col, Row, Tab, Tabs } from "react-bootstrap";
import TabPersonalInfo from "./partials/TabPersonalInfo";
import ButtonSecondary from "../../../components/ui/button/ButtonSecondary";
import { CgImport } from "react-icons/cg";
import TabParentsInfo from "./partials/TabParentsInfo";
import TabClassroomHistory from "./partials/TabClassroomHistory";

const StudentDetail = () => {
  const student = useSelector(studentSelector.getById);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [key, setKey] = useState("personal_detail");
  useEffect(() => {
    dispatch(getById(id));
  }, [dispatch, id]);

  return (
    <Row>
      <Card style={{ width: "100%", height: "auto" }}>
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
                <Button variant="light">change foto</Button>
              </Row>
            </Col>
            <Col
              md={7}
              className="student-personal-button"
              style={{ justifyContent: "end", display: "flex", height: "50%" }}
            >
              <ButtonSecondary title="download CV" icon={<CgImport />} />
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
            className="mb-3"
          >
            <Tab eventKey="personal_detail" title="Personal Detail">
              <TabPersonalInfo />
            </Tab>
            <Tab eventKey="parents" title="Parents Info">
              <TabParentsInfo />
            </Tab>
            <Tab eventKey="classroom_history" title="Classroom History">
              <TabClassroomHistory />
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </Row>
  );
};

export default StudentDetail;
