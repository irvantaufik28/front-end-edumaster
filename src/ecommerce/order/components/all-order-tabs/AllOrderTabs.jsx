import { Card, Col, Form, Row } from "react-bootstrap";
import FormCalendar from "../FormCalendar";
import { useEffect, useRef, useState } from "react";
import ButtonPrimary from "../../../../components/ui/button/ButtonPrimary";
import { BiExport } from "react-icons/bi";
import axios from "axios";
import Cookies from "js-cookie";
import config from "../../../../config";
import { BiDetail } from "react-icons/bi";
import { Avatar, Button } from "@material-ui/core";
import { IoMdChatboxes } from "react-icons/io";

const AllOrderTabs = () => {
  const [message, setMessage] = useState("");
  const [data, setData] = useState({});

  const formatterCurrencyIDR = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = config.apiUrl;
        const token = Cookies.get("token");
        const response = await axios.get(`${apiUrl}/order`, {
          headers: {
            Authorization: token,
          },
        });

        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const calendarHandle = (payload) => {
    console.log(payload);
    setMessage("hello");
  };

  const [search, setSearch] = useState({
    name: "",
  });
  const tableRef = useRef(null);
  const handleSearch = (e) => {
    e.preventDefault();
    tableRef.current.doFilter({
      name: search.name,
    });
  };
  return (
    <>
      <Row>
        <div className="head-order-tabs">
          <div>
            <Form.Label style={{ paddingTop: "8px" }}>
              Order time created
            </Form.Label>
          </div>
          <div>
            <FormCalendar onSubmit={calendarHandle} message={message} />
          </div>
          <div>
            <ButtonPrimary title="Export" icon={<BiExport />} />
          </div>
        </div>
      </Row>
      <Row>
        <div className="group-search d-flex justify-content-end mt-5">
          <div className="input-search-from">
            <select className="form-control bg-light border-2 small">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="search-box-single search-order d-flex justify-content-end align-items-end">
            <form onSubmit={handleSearch} className="flex-grow-1">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control bg-light border-2 small"
                  placeholder="search ..."
                  aria-label="Search"
                  id="name"
                  aria-describedby="basic-addon2"
                  onChange={(e) =>
                    setSearch({
                      ...search,
                      ...{ name: e.target.value },
                    })
                  }
                />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="submit">
                    <i className="fas fa-search fa-sm" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Row>
      <Row className="content-order-card mt-5">
        {data?.data?.length ? (
          data?.data?.map((item, index) => (
            <Card
              key={index} // Memberikan key yang unik untuk setiap card
              style={{
                width: "100%",
                height: "auto",
                marginBottom: "5px",
                marginTop: "5px",
              }}
            >
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Row>
                      <div className="card-order-name">
                        <div>
                          <Avatar
                            alt="Remy Sharp"
                            src="https://source.unsplash.com/user/c_v_r"
                          />
                        </div>
                        <div className="avatar-order-name">{`${item?.first_name} ${item?.last_name}`}</div>
                        <div className="avatar-order-icon">
                          <IoMdChatboxes />
                        </div>
                      </div>
                    </Row>
                  </Col>
                  <Col md={6}>
                    <div className="order-number">
                      <div>No Order</div>
                      <div>1234441222</div>
                    </div>
                  </Col>
                </Row>
                <hr />

                <Row>
                  <Col md={6}>
                    <div className="order-product">
                      {item?.order_products?.map((itemProduct, index) => (
                        <div key={index}>
                          <Row>
                            <Col md={2}>
                              <img
                                src={itemProduct?.product_images[0]?.image_url}
                                alt="Foto"
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  marginBottom: "20px",
                                }}
                              />
                            </Col>
                            <Col md={10}>
                              <div className="content-order">
                                <div className="status-order-name">
                                  <Button
                                    color="secondary"
                                    variant="outlined"
                                    size="small"
                                  >
                                    {item?.status}
                                  </Button>
                                </div>
                                <div>
                                  {itemProduct?.name} x {itemProduct?.qty}
                                </div>
                                <div></div>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      ))}
                    </div>
                  </Col>
                  <Col md={2}>
                    <div className="amount-order">
                      <div>Amount to be paid</div>
                      <div>{formatterCurrencyIDR.format(item?.grand_total_price)}</div>
                      <div><p>payment method</p></div>
                    </div>
                  </Col>
                  <Col md={2}>
                    <div className="status-card-order">
                      Status
                    </div>
                    <div>
                      {item?.status}
                    </div>
                    <div></div>
                  </Col>
                  <Col md={2}>
                    <div className="card-order-action">
                      Action
                    </div>
                    <div className="view-detail-order"><BiDetail/> View details </div>

                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))
        ) : (
          <div style={{ textAlign: "center" }}>
            <p>No data available </p>
          </div>
        )}
      </Row>
    </>
  );
};

export default AllOrderTabs;
