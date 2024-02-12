import { Card, Col, Row, Table } from "react-bootstrap"
import { useSelector } from "react-redux"
import { userSelector } from "@features/userSlice"

const ClassroomInfoTab = () => {
    const student = useSelector(userSelector.selectAll)
  return (
    <>
    <div className="title-form-student">Current Classroom</div>
    <hr></hr>

    
    <Row>
      {student?.user_detail?.student_classrooms?.length ? (
        student?.user_detail?.student_classrooms
          ?.filter(
            (item) => item?.classroom_id === student?.user_detail?.current_classroom_id
          )
          .map((item, index) => (
            <Card key={index} style={{ width: "100%", height: "auto" }}>
              <Card.Body>
                <Table>
                  <tbody>
                    <tr>
                      <th className="no-border" width="150">
                        Code
                      </th>
                      <td className="no-border">
                        : <span id="text-code">{item?.classroom?.code}</span>
                      </td>
                    </tr>
                    <tr>
                      <th className="no-border" width="150">
                        Class Major
                      </th>
                      <td className="no-border">
                        :{" "}
                        <span id="text-class_major">
                          {item?.classroom?.classMajor?.name}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th className="no-border" width="150">
                        Grade
                      </th>
                      <td className="no-border">
                        :{" "}
                        <span id="text-level">{item?.classroom?.level}</span>
                      </td>
                    </tr>
                    <tr>
                      <th className="no-border" width="150">
                        Year Group
                      </th>
                      <td className="no-border">
                        :{" "}
                        <span id="text-year_group">
                          {item?.classroom?.year_group}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          ))
      ) : (
        <Card style={{ width: "100%", height: "auto" }}>
          <Card.Body style={{ textAlign: "center" }}>
            <p>No data available </p>
          </Card.Body>
        </Card>
      )}

      <Col md={6}>
        <div className="title-form-student">History</div>
      </Col>

      <Card
        style={{
          width: "100%",
          height: "auto",
          marginBottom: "20px",
        }}
      >
        <Card.Body>
          {student?.user_detail?.student_classrooms?.length ? (
            <table
              className="react-basic-table"
              style={{ marginBottom: "100px" }}
            >
              <thead>
                <tr>
                  <th className="th-react-table">No</th>
                  <th className="th-react-table">Code</th>
                  <th className="th-react-table">Grade</th>
                  <th className="th-react-table">Class Major</th>
                  <th className="th-react-table">Year Group</th>
                  <th className="th-react-table">Status</th>
                 
                </tr>
              </thead>
              <tbody>
                {student?.user_detail?.student_classrooms.map((data, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data?.classroom?.code}</td>
                    <td>{data?.classroom?.level}</td>
                    <td>{data?.classroom?.classMajor?.name}</td>
                    <td>{data?.classroom?.year_group}</td>
                    <td>{data?.classroom?.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{ textAlign: "center" }}>
              <p>No data available </p>
            </div>
          )}
        </Card.Body>
      </Card>
    </Row>
  </>
  )
}

export default ClassroomInfoTab