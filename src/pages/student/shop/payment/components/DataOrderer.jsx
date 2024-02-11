import { Col, Row, Table } from "react-bootstrap";
import { orderSelector } from "@features/ecommerce/orderSlice";
import { useSelector } from "react-redux";

const DataOrderer = () => {
  const orderData = useSelector(orderSelector.selectAll);
  console.log(orderData);
  return (
    <Row>
      <Col md={6}>
        <Table>
          <tbody>
            <tr>
              <th className="no-border" width="150">
                NIS
              </th>
              <td className="no-border">
                : <span id="text-nik">{orderData?.nis}</span>
              </td>
            </tr>
            <tr>
              <th className="no-border" width="150">
                Name
              </th>
              <td className="no-border">
                :{" "}
                <span id="text-nik">{`${orderData?.first_name} ${orderData?.last_name}`}</span>
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
                No. Transaction
              </th>
              <td className="no-border">
                : <span id="text-nik">{orderData?.code}</span>
              </td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default DataOrderer;
