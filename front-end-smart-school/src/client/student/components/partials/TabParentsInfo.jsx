import { Card, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { studentSelector } from "../../../../features/studentSlice";

const TabParentsInfo = () => {
  const student = useSelector(studentSelector.getById);
  return (
    <Row>
      <div className="title-form-student">Parents Info</div>
      <hr></hr>
      {student?.student_parents?.map((item, index) => (
        <>
          <Card style={{ width: "100%", height: "auto" }}>
            <Card.Body key={index}>
              <Row>
                <Table>
                  <tbody>
                    <tr>
                      <th className="no-border" width="150">
                        NIK
                      </th>
                      <td className="no-border">
                        : <span id="text-nik">{item?.nik}</span>
                      </td>
                    </tr>
                    <tr>
                      <th className="no-border" width="150">
                        First Name
                      </th>
                      <td className="no-border">
                        : <span id="text-first_name"> {item?.first_name}</span>
                      </td>
                    </tr>
                    <tr>
                      <th className="no-border" width="150">
                        Last Name
                      </th>
                      <td className="no-border">
                        : <span id="text-last_name"> {item?.last_name}</span>
                      </td>
                    </tr>
                    <tr>
                      <th className="no-border" width="150">
                        Relationship
                      </th>
                      <td className="no-border">
                        : <span id="text-relationship"> {item?.relationship}</span>
                      </td>
                    </tr>
                    <tr>
                      <th className="no-border" width="150">
                        Phone
                      </th>
                      <td className="no-border">
                        : <span id="text-phone"> {item?.phone}</span>
                      </td>
                    </tr>
                    <tr>
                      <th className="no-border" width="150">
                        Email
                      </th>
                      <td className="no-border">
                        : <span id="text-email"> {item?.email}</span>
                      </td>
                    </tr>
                    <tr>
                      <th className="no-border" width="150">
                        Job
                      </th>
                      <td className="no-border">
                        : <span id="text-job"> {item?.job}</span>
                      </td>
                    </tr>
                    <tr>
                      <th className="no-border" width="150">
                        Salary
                      </th>
                      <td className="no-border">
                        : <span id="text-salary"> {item?.salary}</span>
                      </td>
                    </tr>
                    <tr>
                      <th className="no-border" width="150">
                        Address
                      </th>
                      <td className="no-border">
                        : <span id="text-address"> {item?.address}</span>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Row>
            </Card.Body>
          </Card>
        </>
      ))}
    </Row>
  );
};

export default TabParentsInfo;
