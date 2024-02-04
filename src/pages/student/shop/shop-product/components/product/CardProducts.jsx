import { Card, Col, Container, Row } from "react-bootstrap";
import "../../style/cardproduct.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProduct,
  productSelector,
} from "../../../../../../features/ecommerce/productSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CardProducts = () => {
  const products = useSelector(productSelector.selectAll);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);


  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };


  return (
    <Container className="container-product">
      <Row>
      {Array.isArray(products?.data) && products?.data.map((item, index) => (
          <Col key={index} sm={6} md={4} lg={3} className="card-product-content" onClick={()=> {handleNavigation(
            `/student-page/school-shop/product/${item?._id}`)}}>
            <Card className="card-product">
              <div>
              <img src={item.product_images[0]?.image_url ?? ""} alt={"nll"} />
              </div>

              <Card.Body className="body-card-product">
                <p>
                  {item.name.length > 25
                    ? `${item.name.slice(0, 25)}...`
                    : item.name}
                </p>

                <Card.Text>
                  <p>Rp. {item.price}</p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CardProducts;
