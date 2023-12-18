import { useSelector } from "react-redux";
import { studentSelector } from "../../../../features/studentSlice";
import { Card, Row, Table } from "react-bootstrap";
import ButtonDanger from "../../../../components/ui/button/ButtonDanger";

const TabClassroomHistory = () => {
  const student = useSelector(studentSelector.getById);
  const handleDelete = (id) => {
    console.log(`Delete button clicked for id: ${id}`);
  }

  return (
    <>
      <div className="title-form-student">Current Classroom</div>
      <hr></hr>
      <Row>
        {student?.student_classrooms
          ?.filter(
            (item) => item?.classroom_id === student?.current_classroom_id
          )
          .map((item) => (
            <>
              <Card style={{ width: "100%", height: "auto" }}>
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
            </>
          ))}

        <div className="title-form-student">History</div>
        <hr></hr>

        <table className="table table-striped">
          <thead>
            <tr>
              <th className="th-react-table">Code</th>
              <th className="th-react-table">Grade</th>
              <th className="th-react-table">Class Major</th>
              <th className="th-react-table">Year Group</th>
              <th className="th-react-table">Status</th>
              <th className="th-react-table">Action</th>
            </tr>
          </thead>
          <tbody>
            {student?.student_classrooms.length &&
              student?.student_classrooms.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{data?.classroom?.code}</td>
                    <td>{data?.classroom?.level}</td>
                    <td>{data?.classroom?.classMajor?.name}</td>
                    <td>{data?.classroom?.year_group}</td>
                    <td>{data?.classroom?.status}</td>
                    <td><ButtonDanger title="delete" onClick={() => handleDelete(data?.classroom?.id)} /> </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </Row>
    </>
  );
};

export default TabClassroomHistory;
