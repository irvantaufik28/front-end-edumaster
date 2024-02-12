import { Card, Col, Row, Table } from "react-bootstrap"
import { useSelector } from "react-redux"
import { userSelector } from "../../../../../features/userSlice"

const PersonalInfoTab = () => {
    const student = useSelector(userSelector.selectAll)
  return (
    <Row>
    <Card style={{ width: "100%", height: "auto", marginBottom: "100px" }}>
      <Card.Body>
        <div className="title-form-student">Personal Info</div>
        <hr></hr>
        <div className="button-edit-student">
          <div className="icon-action">
           
          </div>
        </div>
        <Row>
          <Col md={6}>
            <Table>
              <tbody>
                <tr>
                  <th className="no-border" width="150">
                    NIS
                  </th>
                  <td className="no-border">
                    : <span id="text-nis">{student?.user_detail?.nis}</span>
                  </td>
                </tr>
                <tr>
                  <th className="no-border" width="150">
                    First Name
                  </th>
                  <td className="no-border">
                    :{" "}
                    <span id="text-first_name"> {student?.user_detail?.first_name}</span>
                  </td>
                </tr>
                <tr>
                  <th className="no-border" width="150">
                    Middle Name
                  </th>
                  <td className="no-border">
                    :{" "}
                    <span id="text-middle_name">
                      {" "}
                      {student?.user_detail?.middle_name}
                    </span>
                  </td>
                </tr>
                <tr>
                  <th className="no-border" width="150">
                    Last Name
                  </th>
                  <td className="no-border">
                    : <span id="text-last_name"> {student?.user_detail?.last_name}</span>
                  </td>
                </tr>
                <tr>
                  <th className="no-border" width="150">
                    Gender
                  </th>
                  <td className="no-border">
                    : <span id="text-gender"> {student?.user_detail?.gender}</span>
                  </td>
                </tr>
                <tr>
                  <th className="no-border" width="150">
                    Birth Place
                  </th>
                  <td className="no-border">
                    :{" "}
                    <span id="text-birth_place">
                      {" "}
                      {student?.user_detail?.birth_place}
                    </span>
                  </td>
                </tr>
                <tr>
                  <th className="no-border" width="150">
                    Birth Date
                  </th>
                  <td className="no-border">
                    :{" "}
                    <span id="text-birth_place">
                      {" "}
                      {student?.user_detail?.birth_date}
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
                    Birth Certificate
                  </th>
                  <td className="no-border">
                    :{" "}
                    <span id="text-birth_certificate_no">
                      {student?.user_detail?.birth_certificate_no}
                    </span>
                  </td>
                </tr>
                <tr>
                  <th className="no-border" width="150">
                    Family Identity
                  </th>
                  <td className="no-border">
                    :{" "}
                    <span id="text-family_identity_no">
                      {" "}
                      {student?.user_detail?.family_identity_no}
                    </span>
                  </td>
                </tr>
                <tr>
                  <th className="no-border" width="150">
                    Register Year
                  </th>
                  <td className="no-border">
                    :{" "}
                    <span id="text-register_year">
                      {" "}
                      {student?.user_detail?.register_year}
                    </span>
                  </td>
                </tr>
                <tr>
                  <th className="no-border" width="150">
                    Origin Academy
                  </th>
                  <td className="no-border">
                    :{" "}
                    <span id="text-origin_academy">
                      {" "}
                      {student?.user_detail?.origin_academy}
                    </span>
                  </td>
                </tr>
                <tr>
                  <th className="no-border" width="150">
                    Status
                  </th>
                  <td className="no-border">
                    : <span id="text-status"> {student?.user_detail?.status}</span>
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
  )
}

export default PersonalInfoTab