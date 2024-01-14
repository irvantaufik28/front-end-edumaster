/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from "react";
import _ from "lodash";
import axios from "axios";
// import config from "../../../config";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import ReactDatePicker from "react-datepicker";
import config from "../../../../config";
import { useDispatch } from "react-redux";
import { setDataStudent } from "../../../../features/studentSlice";
import moment from "moment";
import Swal from "sweetalert2";

const FormModalStudent = (props) => {
  const dispatch = useDispatch();
  const defaultValues = useMemo(
    () => ({
      birth_certificate_no: "",
      family_identity_no: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      religion: "",
      birth_place: "",
      birth_date: "",
      gender: "",
      register_year: "",
      foto_url: "",
      origin_academy: "",
      student_parents: [
        {
          id: null,
          nik: "",
          first_name: "",
          last_name: "",
          relationship: "",
          phone: "",
          email: "",
          job: "",
          salary: "",
          address: "",
        },
      ],
    }),
    []
  );
  const [initialValues, setInitialValues] = useState(defaultValues);

  const validationSchema = Yup.object().shape({
    birth_certificate_no: Yup.string().required(
      "birth certificate number is required"
    ),
    family_identity_no: Yup.string().required("family identity no is required"),
    first_name: Yup.string().required("first name is required"),
    last_name: Yup.string().required("last name is required"),
    religion: Yup.string().required("religion is required"),
    birth_place: Yup.string().required("birth place is required"),
    birth_date: Yup.string().required("birth date is required"),
    gender: Yup.string().required("gender is required"),
    register_year: Yup.string().required("register year is required"),
    origin_academy: Yup.string().required("origin academy is required"),
  });
  let title = "";
  if (props.type === "edit") title = "Edit Personal Student";

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
        "birth_certificate_no",
        "family_identity_no",
        "first_name",
        "middle_name",
        "last_name",
        "religion",
        "birth_place",
        "birth_date",
        "gender",
        "register_year",
        "origin_academy",
        "foto_url",
        "student_parents",
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
          config.apiUrl + `/student/` + props.editId,
          payload ,{
            headers: {
              Authorization: token
            }
          }
        );
        dispatch(setDataStudent(response.data));
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
                    <Form.Label>Birth Certificate No</Form.Label>
                    <Form.Control
                      type="text"
                      name="birth_certificate_no"
                      placeholder="Enter Birth Certificate No"
                      isInvalid={
                        touched.birth_certificate_no &&
                        errors.birth_certificate_no
                      }
                      value={values.birth_certificate_no}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.birth_certificate_no &&
                      errors.birth_certificate_no && (
                        <Form.Control.Feedback type="invalid">
                          {errors.birth_certificate_no}
                        </Form.Control.Feedback>
                      )}
                  </Col>
                  <Col md={6}>
                    <Form.Label>Family Identity Card No</Form.Label>
                    <Form.Control
                      type="text"
                      name="family_identity_no"
                      placeholder="Enter Family Indentity"
                      isInvalid={
                        touched.family_identity_no && errors.family_identity_no
                      }
                      value={values.family_identity_no}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.family_identity_no &&
                      errors.family_identity_no && (
                        <Form.Control.Feedback type="invalid">
                          {errors.family_identity_no}
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
                      name="register_year"
                      placeholder="Enter register_year"
                      isInvalid={touched.register_year && errors.register_year}
                      value={values.register_year}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.register_year && errors.register_year && (
                      <Form.Control.Feedback type="invalid">
                        {errors.register_year}
                      </Form.Control.Feedback>
                    )}
                  </Col>
                  <Col md={4}>
                    <Form.Label>Origin Academy</Form.Label>
                    <Form.Control
                      type="text"
                      name="origin_academy"
                      placeholder="Enter Origin Academy"
                      isInvalid={
                        touched.origin_academy && errors.origin_academy
                      }
                      value={values.origin_academy}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.origin_academy && errors.origin_academy && (
                      <Form.Control.Feedback type="invalid">
                        {errors.origin_academy}
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

FormModalStudent.defaultProps = {
  onHide: () => {},
  show: false,
  type: "add",
  initialValues: null,
  editId: null,
  onSuccess: () => {},
};

export default FormModalStudent;
