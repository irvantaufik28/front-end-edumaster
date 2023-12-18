import { Card, Col, Row, Table } from "react-bootstrap";
import "../../styles/table.css";
import { useSelector } from "react-redux";
import { studentSelector } from "../../../../features/studentSlice";
const TabPersonalInfo = () => {
  const student = useSelector(studentSelector.getById);
  return (
    <Row>
      <Card style={{ width: "100%", height: "auto" }}>
        <Card.Body>
          <div className="title-form-student">Personal Info</div>
          <hr></hr>
          <Row>
            <Col md={6}>
              <Table>
                <tbody>
                  <tr>
                    <th className="no-border" width="150">
                      NIS
                    </th>
                    <td className="no-border">
                      : <span id="text-nis">{student?.nis}</span>
                    </td>
                  </tr>
                  <tr>
                    <th className="no-border" width="150">
                      First Name
                    </th>
                    <td className="no-border">
                      : <span id="text-first_name"> {student?.first_name}</span>
                    </td>
                  </tr>
                  <tr>
                    <th className="no-border" width="150">
                      Middle Name
                    </th>
                    <td className="no-border">
                      : <span id="text-middle_name"> {student?.middle_name}</span>
                    </td>
                  </tr>
                  <tr>
                    <th className="no-border" width="150">
                      Last Name
                    </th>
                    <td className="no-border">
                      : <span id="text-last_name"> {student?.last_name}</span>
                    </td>
                  </tr>
                   <tr>
                    <th className="no-border" width="150">
                      Gender
                    </th>
                    <td className="no-border">
                      : <span id="text-gender"> {student?.gender}</span>
                    </td>
                  </tr> 
                  <tr>
                    <th className="no-border" width="150">
                      Birth Place
                    </th>
                    <td className="no-border">
                      : <span id="text-birth_place"> {student?.birth_place}</span>
                    </td>
                  </tr>  
                   <tr>
                    <th className="no-border" width="150">
                      Birth Date
                    </th>
                    <td className="no-border">
                      : <span id="text-birth_place"> {student?.birth_date}</span>
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
                    Birth Certificate 
                    </th>
                    <td className="no-border">
                      : <span id="text-birth_certificate_no">{student?.birth_certificate_no}</span>
                    </td>
                  </tr>
                  <tr>
                    <th className="no-border" width="150">
                    Family Identity
                    </th>
                    <td className="no-border">
                      : <span id="text-family_identity_no"> {student?.family_identity_no}</span>
                    </td>
                  </tr>
                  <tr>
                    <th className="no-border" width="150">
                      Register Year
                    </th>
                    <td className="no-border">
                      : <span id="text-register_year"> {student?.register_year}</span>
                    </td>
                  </tr>
                  <tr>
                    <th className="no-border" width="150">
                      Origin Academy
                    </th>
                    <td className="no-border">
                      : <span id="text-origin_academy"> {student?.origin_academy}</span>
                    </td>
                  </tr>
                   <tr>
                    <th className="no-border" width="150">
                      Status
                    </th>
                    <td className="no-border">
                      : <span id="text-status"> {student?.status}</span>
                    </td>
                  </tr> 
                </tbody>
            
              </Table>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      {/* 
      <Card style={{ width: "100%", height: "auto" }}>
        <Card.Body>
          {" "}
          <h1>personal</h1>
        </Card.Body>
      </Card> */}
    </Row>
  );
};

export default TabPersonalInfo;
