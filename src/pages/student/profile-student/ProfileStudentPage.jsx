import { Card, Col, Row } from "react-bootstrap";
import StudentLayout from "../../../components/layouts/student/StudentLayout";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import CustomTabPanel from "../../../components/tabs/CustomTabPanel";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, userSelector } from "../../../features/userSlice";
import PersonalInfoTab from "./components/tabs/PersonalInfoTab";
import { CgImport } from "react-icons/cg";
import ButtonPrimary from "../../../components/ui/button/ButtonPrimary";
import FamilyInfoTab from "./components/tabs/FamilyInfoTab";
import ClassroomInfoTab from "./components/tabs/ClassroomInfoTab";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ProfileStudentPage = () => {
  const student = useSelector(userSelector.selectAll);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <StudentLayout>
      <div className="container">
        <div className="main-content">
          <Row>
            <Card
              style={{ width: "100%", height: "auto", marginBottom: "20px" }}
            >
              <Card.Body>
                <Row>
                  <Col md={1} className="student-personal-foto">
                    <img
                      src={student?.user_detail?.foto_url}
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
                        student?.user_detail?.first_name ?? ""
                      } ${student?.user_detail?.last_name ?? ""}`}</span>
                    </Row>
                  </Col>

                  <Col
                    md={7}
                    className="student-personal-button"
                    style={{
                      justifyContent: "end",
                      display: "flex",
                      height: "50%",
                    }}
                  >
                    <ButtonPrimary title="download CV" icon={<CgImport />} />
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card style={{ width: "100%", height: "auto" }}>
              <Card.Body>
                <Box sx={{ width: "100%" }}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="basic tabs example"
                    >
                      <Tab label="Personal Info" {...a11yProps(0)} />
                      <Tab label="Family Info" {...a11yProps(1)} />
                      <Tab label="Classroom Info" {...a11yProps(2)} />
                    </Tabs>
                  </Box>
                  <CustomTabPanel value={value} index={0}>
                    <PersonalInfoTab />
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={1}>
                  <FamilyInfoTab />
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={2}>
                   <ClassroomInfoTab />
                  </CustomTabPanel>
                </Box>
              </Card.Body>
            </Card>
          </Row>
        </div>
      </div>
    </StudentLayout>
  );
};

export default ProfileStudentPage;
