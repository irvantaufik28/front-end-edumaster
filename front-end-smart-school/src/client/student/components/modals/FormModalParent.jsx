/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from "react";
import _ from "lodash";
import axios from "axios";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import config from "../../../../config";
import { useDispatch } from "react-redux";
import { getById } from "../../../../features/studentSlice";
import Swal from "sweetalert2";

const FormModalParent = (props) => {
  const dispacth = useDispatch();

  const defaultValues = useMemo(
    () => ({
      nik: "",
      first_name: "",
      last_name: "",
      relationship: "",
      phone: "",
      email: "",
      job: "",
      salary: "",
      address: "",
      student_id: "",
    }),
    []
  );
  const [initialValues, setInitialValues] = useState(defaultValues);
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/s;

  const validationSchema = Yup.object().shape({
    nik: Yup.string()
      .matches(/^\d{16}$/, "Nik number is not valid")
      .required(" NIK is Required"),
    first_name: Yup.string().required(" first name is Required"),
    last_name: Yup.string().required("last name is required"),
    relationship: Yup.string().required("relationship is required"),
    email: Yup.string().matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Email not valid"
    ),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("phone is required"),
    job: Yup.string().required("Job is required"),
    address: Yup.string().required("address is required"),
  });

  let title = "Add Student Parent";
  if (props.type === "edit") title = "Edit Student";

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
        "nik",
        "first_name",
        "last_name",
        "relationship",
        "phone",
        "email",
        "job",
        "salary",
        "address",
        "student_id",
      ]);
  
      const confirmation = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      });
  
      if (confirmation.isConfirmed) {
        let response;
        if (props.type === "add") {
          payload.student_id = props.student_id;
          response = await axios.post(config.apiUrl + `/student-parent`, payload , {
            headers: {
              Authorization: token
            }
          });
        } else {
          response = await axios.put(
            config.apiUrl + `/student-parent/` + props.editId,
            payload , {
              headers: {
                Authorization: token
              }
            }
          );
        }
  
        // Update redux
        dispacth(getById(payload.student_id));
        Swal.fire({
          title: "Updated",
          text: "Your file has been updated.",
          icon: "success",
        });
      }
  
      // Trigger the success callback
      props.onSuccess(props.type);
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Failed to update. Please try again.",
        icon: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <Modal show={props.show} onHide={props.onHide}>
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
                <Row className="mb-3">
                  <Form.Label className="col-sm-4">NIK</Form.Label>
                  <Col md={8}>
                    <Form.Control
                      type="text"
                      name="nik"
                      placeholder="Enter NIK"
                      isInvalid={touched.nik && errors.nik}
                      value={values.nik}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.nik && errors.nik && (
                      <Form.Control.Feedback type="invalid">
                        {errors.nik}
                      </Form.Control.Feedback>
                    )}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Form.Label className="col-sm-4">First Name</Form.Label>
                  <Col md={8}>
                    <Form.Control
                      type="text"
                      name="first_name"
                      placeholder="Enter First Name"
                      isInvalid={touched.first_name && errors.first_name}
                      value={values.first_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.first_name && errors.first_name && (
                      <Form.Control.Feedback type="invalid">
                        {errors.first_name}
                      </Form.Control.Feedback>
                    )}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Form.Label className="col-sm-4">Last Name</Form.Label>
                  <Col md={8}>
                    <Form.Control
                      type="text"
                      name="last_name"
                      placeholder="Enter Last Name"
                      isInvalid={touched.last_name && errors.last_name}
                      value={values.last_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.last_name && errors.last_name && (
                      <Form.Control.Feedback type="invalid">
                        {errors.last_name}
                      </Form.Control.Feedback>
                    )}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Form.Label className="col-sm-4">Relationship</Form.Label>
                  <Col md={8}>
                    <Form.Control
                      as="select"
                      className="input-form-parent-student mb-3"
                      name="relationship"
                      value={values.relationship}
                      isInvalid={
                        touched.relationship &&
                        touched.relationship &&
                        errors.relationship &&
                        errors.relationship
                      }
                      onChange={handleChange}
                    >
                      <option value="">Select Relationship</option>
                      <option value="ayah">Ayah</option>
                      <option value="ibu">Ibu</option>
                      <option value="tante">Tante</option>
                    </Form.Control>

                    {touched.relationship &&
                      touched.relationship &&
                      errors.relationship &&
                      errors.relationship && (
                        <Form.Control.Feedback
                          type="invalid"
                          style={{ display: "unset" }}
                        >
                          {errors.relationship}
                        </Form.Control.Feedback>
                      )}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Form.Label className="col-sm-4">Phone</Form.Label>
                  <Col md={8}>
                    <Form.Control
                      type="text"
                      name="phone"
                      pattern="^-?[0-9]\d*\.?\d*$"
                      placeholder="Enter Phone "
                      isInvalid={touched.phone && errors.phone}
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.phone && errors.phone && (
                      <Form.Control.Feedback type="invalid">
                        {errors.phone}
                      </Form.Control.Feedback>
                    )}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Form.Label className="col-sm-4">Email</Form.Label>
                  <Col md={8}>
                    <Form.Control
                      type="text"
                      name="email"
                      placeholder="Enter Email "
                      isInvalid={touched.email && errors.email}
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.email && errors.email && (
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    )}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Form.Label className="col-sm-4">Job</Form.Label>
                  <Col md={8}>
                    <Form.Control
                      type="text"
                      name="job"
                      placeholder="Enter Job "
                      isInvalid={touched.job && errors.job}
                      value={values.job}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.job && errors.job && (
                      <Form.Control.Feedback type="invalid">
                        {errors.job}
                      </Form.Control.Feedback>
                    )}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Form.Label className="col-sm-4">Salary</Form.Label>
                  <Col md={8}>
                    <Form.Control
                      type="text"
                      name="salary"
                      placeholder="Enter Salary"
                      isInvalid={touched.salary && errors.salary}
                      value={values.salary}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.salary && errors.salary && (
                      <Form.Control.Feedback type="invalid">
                        {errors.salary}
                      </Form.Control.Feedback>
                    )}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Form.Label className="col-sm-4">Address</Form.Label>
                  <Col md={8}>
                    <Form.Control
                      type="text"
                      name="address"
                      placeholder="Enter Address "
                      isInvalid={touched.address && errors.address}
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.address && errors.address && (
                      <Form.Control.Feedback type="invalid">
                        {errors.address}
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

FormModalParent.defaultProps = {
  onHide: () => {},
  show: false,
  type: "add",
  initialValues: null,
  editId: null,
  onSuccess: () => {},
};

export default FormModalParent;
