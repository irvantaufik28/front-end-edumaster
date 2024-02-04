/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from "react";
import _, { values } from "lodash";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ButtonSuccess from "../../../../components/ui/button/ButtonSuccess";
import ButtonDanger from "../../../../components/ui/button/ButtonDanger";
import ImageUploadForm from "./ImageUploadForm";
import {
  categoryProductSelector,
  getAllCategory,
} from "../../../../features/ecommerce/categoryProduct";
import { resetProductData } from "../../../../features/ecommerce/productSlice";
import config from "../../../../config";

const FormProduct = () => {
  const dispatch = useDispatch();
  const dataInitialValues = useSelector((state) => state.product.data);
  const categoryProductList = useSelector(categoryProductSelector.selectAll);
  console.log(dataInitialValues);
  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);
  const navigate = useNavigate();
  const defaultValues = useMemo(
    () => ({
      name: "",
      category_id: "",
      description: "",
      price: "",
      stock: "",
      product_images: [
        {
          _id: null,
        },
      ],
    }),
    []
  );
  const [initialValues, setInitialValues] = useState(defaultValues);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(" product name is required"),
  });

  const [images, setImages] = useState([null, null]);
  const [previewSources, setPreviewSources] = useState([]);

  useEffect(() => {
    const newValues = { ...defaultValues, ...dataInitialValues.initialValues };

    if (dataInitialValues.initialValues?.category) {
      newValues.category_id = dataInitialValues.initialValues.category._id;
    }

    if (dataInitialValues.initialValues?.product_images) {
      const imageUrls = dataInitialValues.initialValues.product_images.map(
        (image) => image.image_url
      );
      const initialPreviewSources = Array.from({ length: 2 }, (_, index) =>
        imageUrls[index] ? imageUrls[index] : null
      );
      setInitialValues(newValues);
      setPreviewSources(initialPreviewSources);
    }
  }, [dataInitialValues.initialValues, defaultValues]);

  const handleFileInputChange = (e, index) => {
    const file = e.target.files[0];
    const newImages = [...images];
    const newPreviewSources = [...previewSources];

    newImages[index] = file;
    previewFile(file, (result) => {
      newPreviewSources[index] = result;
      setPreviewSources(newPreviewSources);
    });
    setImages(newImages);
  };

  const previewFile = (file, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      callback(reader.result);
    };
  };

  const clearImage = (index) => {
    const newImages = [...images];
    const newPreviewSources = [...previewSources];

    newImages[index] = null;
    newPreviewSources[index] = null;

    setImages(newImages);
    setPreviewSources(newPreviewSources);
  };
  const handleSubmit = async (values) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const payload = _.pick(values, [
        "name",
        "category_id",
        "description",
        "price",
        "stock",
        "product_images",
      ]);

      const filteredImages = images.filter((item) => item !== null);
      if (filteredImages.length > 0) {
        const imageUploadPromises = images
          .filter((item) => item !== null)
          .map(async (item) => {
            const formData = new FormData();
            formData.append("file", item);
            formData.append("type", "image");
            formData.append("folder", "product_foto");

            const response = await axios.post(
              config.apiUrl + "/upload",
              formData,
              {
                headers: {
                  authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            );

            const productImagePayload = {
              image_url: response.data.url,
            };

            const productImage = await axios.post(
              config.apiUrl + "/product-image",
              productImagePayload,
              {
                headers: {
                  authorization: token,
                },
              }
            );

            return productImage.data._id;
          });

        payload.product_images = await Promise.all(imageUploadPromises);
      } else {
        payload.product_images =
          dataInitialValues.initialValues?.product_images.map(
            (image) => image._id
          );
      }
      if (dataInitialValues.type === "add") {
        await axios.post(config.apiUrl + "/product", payload, {
          headers: {
            authorization: token,
          },
        });
      } else {
        await axios.put(
          config.apiUrl + "/product/" + dataInitialValues.editId,
          payload,
          {
            headers: {
              authorization: token,
            },
          }
        );
      }

      navigate("/ecommerce/list-product");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    navigate("/ecommerce/list-product");
    dispatch(resetProductData())
  };

  return (
    <Formik
      initialValues={initialValues}
      //   validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({
        values,
        errors,
        touched,
        setFieldValue,
        handleChange,
        handleBlur,
        isSubmitting,
        handleSubmit,
      }) => (
        <>
          <Container>
            <Card style={{ width: "100%", height: "auto" }}>
              <Card.Body>
                <div className="title-form-student">Form Products</div>
                <hr></hr>
                <Form>
                  <Row>
                    <ImageUploadForm
                      previewSource={previewSources[0]}
                      clearImage={clearImage}
                      handleFileInputChange={handleFileInputChange}
                      index={0}
                    />
                    <ImageUploadForm
                      previewSource={previewSources[2]}
                      clearImage={clearImage}
                      handleFileInputChange={handleFileInputChange}
                      index={2}
                    />
                    <ImageUploadForm
                      previewSource={previewSources[1]}
                      clearImage={clearImage}
                      handleFileInputChange={handleFileInputChange}
                      index={1}
                    />
                  </Row>
                  <Row>
                    <Col>
                      <Row className="row mb-3">
                        <Col>
                          <Form.Label>Product Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            placeholder="Product Name"
                            isInvalid={touched.name && errors.name}
                            value={values.name}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          {touched.name && errors.name && (
                            <Form.Control.Feedback type="invalid">
                              {errors.name}
                            </Form.Control.Feedback>
                          )}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Row className="row mb-3">
                        <Col>
                          <Form.Label>Product Category</Form.Label>
                          <Form.Select
                            aria-label="Default select example"
                            name="category_id"
                            isInvalid={
                              touched.category_id && errors.category_id
                            }
                            value={values.category_id}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{ width: "100%", height: "100%" }}
                          >
                            <option selected value={""}>
                              select Product Category
                            </option>
                            {categoryProductList?.map((option) => (
                              <option key={option._id} value={option._id}>
                                {option.name}
                              </option>
                            ))}
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            {touched.category_id && errors.category_id}
                          </Form.Control.Feedback>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Row className="row mb-3">
                        <Col>
                          <Form.Label>Description</Form.Label>
                          <Form.Control
                            type="text"
                            name="description"
                            placeholder="decription...."
                            isInvalid={
                              touched.description && errors.description
                            }
                            value={values.description}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          {touched.description && errors.description && (
                            <Form.Control.Feedback type="invalid">
                              {errors.description}
                            </Form.Control.Feedback>
                          )}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Row className="row mb-3">
                        <Col>
                          <Form.Label>Price</Form.Label>
                          <Form.Control
                            type="number"
                            name="price"
                            placeholder="price"
                            isInvalid={touched.price && errors.price}
                            value={values.price}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          {touched.price && errors.price && (
                            <Form.Control.Feedback type="invalid">
                              {errors.price}
                            </Form.Control.Feedback>
                          )}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Row className="row mb-3">
                        <Col>
                          <Form.Label>Stock</Form.Label>
                          <Form.Control
                            type="number"
                            name="stock"
                            placeholder="stock"
                            isInvalid={touched.stock && errors.stock}
                            value={values.stock}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          {touched.stock && errors.stock && (
                            <Form.Control.Feedback type="invalid">
                              {errors.stock}
                            </Form.Control.Feedback>
                          )}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>

            <div className="form-button-student">
              <ButtonDanger title="cancel" onClick={handleCancel} />
              <ButtonSuccess title="save" onClick={handleSubmit} />
            </div>
          </Container>
        </>
      )}
    </Formik>
  );
};

FormProduct.defaultProps = {
  type: "add",
  initialValues: null,
  editId: null,
};

export default FormProduct;
