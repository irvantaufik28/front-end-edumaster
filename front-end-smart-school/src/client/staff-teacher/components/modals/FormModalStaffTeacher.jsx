/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from "react";
import _ from "lodash";
import axios from "axios";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import ReactDatePicker from "react-datepicker";
import config from "../../../../config";
import { useDispatch } from "react-redux";
import moment from "moment";
import Swal from "sweetalert2";
import { setDataStaff } from "../../../../features/staffSlice";

const FormModalStaffTeacher = (props) => {
  const dispacth = useDispatch();
  const defaultValues = useMemo(
    () => ({
      phone: "",
      email: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      religion: "",
      birth_place: "",
      birth_date: "",
      gender: "",
      address: "",
      foto_url: "",
      status: "",
    }),
    []
  );
  const [initialValues, setInitialValues] = useState(defaultValues);

  const validationSchema = Yup.object().shape({
    phone: Yup.string().required("phone number is required"),
    email: Yup.string().required("email is required"),
    first_name: Yup.string().required("first name is required"),
    last_name: Yup.string().required("last name is required"),
    religion: Yup.string().required("religion is required"),
    birth_place: Yup.string().required("birth place is required"),
    birth_date: Yup.string().required("birth date is required"),
    gender: Yup.string().required("gender is required"),
    address: Yup.string().required("address is required"),
    status: Yup.string().required("status academy is required"),
  });
  let title = "";
  if (props.type === "edit") title = "Edit Personal Teacher";

  useEffect(() => {
    const newValues = { ...defaultValues, ...props.initialValues };
    setInitialValues(newValues);
    if (newValues.birth_date)
      newValues.birth_date = new Date(newValues.birth_date);
  }, [props.initialValues, defaultValues]);

  const handleSubmit = async (values, { setSubmitting }) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    try {
      const payload = _.pick(values, [
        "phone",
        "email",
        "first_name",
        "middle_name",
        "last_name",
        "religion",
        "birth_place",
        "birth_date",
        "gender",
        "address",
        "status",
        "foto_url",
      ]);
      if (payload.birth_date)
        payload.birth_date = moment(payload.birth_date).format("YYYY-MM-DD");

      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      });

      if (result.isConfirmed) {
        const response = await axios.put(
          config.apiUrl + `/staff/` + props.editId,
          payload,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        dispacth(setDataStaff(response.data));
        Swal.fire({
          title: "Updated",
          text: "Your file has been updated.",
          icon: "success",
        });
        props.onSuccess(props.type);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "An error occurred. Please try again.",
        icon: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Modal show={props.show} onHide={props.onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
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
            <Modal.Body>
              <Form>
                <Row className="row mb-3">
                  <Col md={6}>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      placeholder="Enter Phone.."
                      isInvalid={touched.phone && errors.phone}
                      value={values.phone}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.phone && errors.phone && (
                      <Form.Control.Feedback type="invalid">
                        {errors.phone}
                      </Form.Control.Feedback>
                    )}
                  </Col>
                  <Col md={6}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      placeholder="enter email.."
                      isInvalid={touched.email && errors.email}
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.email && errors.email && (
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    )}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={4}>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="first_name"
                      placeholder="Enter First Name"
                      isInvalid={touched.first_name && errors.first_name}
                      value={values.first_name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.first_name && errors.first_name && (
                      <Form.Control.Feedback type="invalid">
                        {errors.first_name}
                      </Form.Control.Feedback>
                    )}
                  </Col>

                  <Col md={4}>
                    <Form.Label>Middle Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="middle_name"
                      placeholder="Enter First Name"
                      isInvalid={touched.middle_name && errors.middle_name}
                      value={values.middle_name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.middle_name && errors.middle_name && (
                      <Form.Control.Feedback type="invalid">
                        {errors.middle_name}
                      </Form.Control.Feedback>
                    )}
                  </Col>
                  <Col md={4}>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="last_name"
                      placeholder="Enter last name"
                      isInvalid={touched.last_name && errors.last_name}
                      value={values.last_name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.last_name && errors.last_name && (
                      <Form.Control.Feedback type="invalid">
                        {errors.last_name}
                      </Form.Control.Feedback>
                    )}
                  </Col>
                </Row>
                <Row>
                  <div className="col-md-4">
                    <Form.Label>Religion</Form.Label>
                    <Col md={12} style={{ height: "45%" }}>
                      <Form.Select
                        aria-label="Default select example"
                        name="religion"
                        isInvalid={touched.religion && errors.religion}
                        value={values.religion}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{
                          width: "100%",
                          height: "100%",
                          border: "1px solid #ced4da",
                          borderRadius: "4px",
                          background: "none",
                        }}
                      >
                        <option>Open this select menu</option>
                        <option value={"islam"}>Islam</option>
                        <option value={"kristen"}>Kristen</option>
                        <option value={"hindu"}>Hindu</option>
                        <option value={"buddha"}>Buddha</option>
                        <option value={"konghucu"}>Konghucu</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {touched.religion && errors.religion}
                      </Form.Control.Feedback>
                    </Col>
                  </div>
                  <Col md={4} className="mb-3">
                    <Form.Label>Birth Place</Form.Label>
                    <Form.Control
                      type="text"
                      name="birth_place"
                      placeholder="Enter Birth Place"
                      isInvalid={touched.birth_place && errors.birth_place}
                      value={values.birth_place}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.birth_place && errors.birth_place && (
                      <Form.Control.Feedback type="invalid">
                        {errors.birth_place}
                      </Form.Control.Feedback>
                    )}
                  </Col>
                  <Col md={4}>
                    <div className="date-picker-student">
                      <Form.Label>Birth Date </Form.Label>
                    </div>
                    <ReactDatePicker
                      className={`form-control ${
                        touched.birth_date && errors.birth_date
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholderText="YYYY-MM-DD"
                      dateFormat="yyyy-MM-dd"
                      selected={values.birth_date}
                      onChange={(date) => setFieldValue("birth_date", date)}
                    />
                    {touched.birth_date && errors.birth_date && (
                      <Form.Control.Feedback
                        type="invalid"
                        style={{ display: "unset" }}
                      >
                        {errors.birth_date}
                      </Form.Control.Feedback>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col md={4} className="mb-3">
                    <div className="date-picker-student">
                      <Form.Label>Gender </Form.Label>
                    </div>
                    <Form.Group controlId="genderRadioGroup">
                      <Row>
                        <Col md={6}>
                          <Form.Check
                            type="radio"
                            label="Male"
                            name="gender"
                            value="male"
                            checked={values.gender === "male"}
                            onChange={handleChange}
                            isInvalid={touched.gender && errors.gender}
                          />
                        </Col>
                        <Col md={6}>
                          <Form.Check
                            type="radio"
                            label="Female"
                            name="gender"
                            value="female"
                            checked={values.gender === "female"}
                            onChange={handleChange}
                            isInvalid={touched.gender && errors.gender}
                          />
                        </Col>
                      </Row>
                      {touched.gender && errors.gender && (
                        <Form.Control.Feedback type="invalid">
                          {errors.gender}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Label>Register Year</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      placeholder="Enter address"
                      isInvalid={touched.address && errors.address}
                      value={values.address}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.address && errors.address && (
                      <Form.Control.Feedback type="invalid">
                        {errors.address}
                      </Form.Control.Feedback>
                    )}
                  </Col>
                  <Col md={4}>
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                      type="text"
                      name="status"
                      disabled="true"
                      placeholder="Enter Origin Academy"
                      isInvalid={touched.status && errors.status}
                      value={values.status}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.status && errors.status && (
                      <Form.Control.Feedback type="invalid">
                        {errors.status}
                      </Form.Control.Feedback>
                    )}
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={props.onHide}>
                Cancel
              </Button>
              <Button
                variant="primary"
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </Modal>
  );
};

FormModalStaffTeacher.defaultProps = {
  onHide: () => {},
  show: false,
  type: "add",
  initialValues: null,
  editId: null,
  onSuccess: () => {},
};

export default FormModalStaffTeacher;
