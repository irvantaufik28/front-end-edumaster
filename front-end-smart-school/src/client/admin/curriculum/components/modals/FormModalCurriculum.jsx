/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from "react";
import _ from "lodash";
import axios from "axios";
import config from "../../../../../config";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const FormModalCurriculum = (props) => {
  const defaultValues = useMemo(
    () => ({
      name: "",
      level: "",
      semester: "",
      year_group: "",
    }),
    []
  );
  const [initialValues, setInitialValues] = useState(defaultValues);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("name is required"),
    level: Yup.string().required("level is required"),
    semester: Yup.string().required("semester is required"),
    year_group: Yup.string()
      .matches(/^[0-9]+$/, "Year group must be a numeric string")
      .required("Year group is required"),
  });
  let title = "Add Curriculum";
  if (props.type === "edit") title = "Edit Curriculum";

  useEffect(() => {
    const newValues = { ...defaultValues, ...props.initialValues };
    setInitialValues(newValues);
  }, [props.initialValues, defaultValues]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const payload = _.pick(values, [
        "name",
        "level",
        "year_group",
        "semester",
      ]);

      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const confirmation = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      });

      if (confirmation.isConfirmed) {
        let response;
        if (props.type === "add") {
          payload.student_id = props.student_id;
          response = await axios.post(
            config.apiUrl + `/structure-curriculum`,
            payload,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
        } else {
          response = await axios.put(
            config.apiUrl + `/structure-curriculum/` + props.editId,
            payload,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
        }

        Swal.fire({
          title: props.type,
          text: "Your file has been updated.",
          icon: "success",
        });
      }

      props.onSuccess();
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
    setSubmitting(false);
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
                {values.id && (
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4">ID</Form.Label>
                    <Col md={8}>
                      <Form.Control type="text" disabled value={values.id} />
                    </Col>
                  </Row>
                )}
                <Row className="mb-3">
                  <Form.Label className="col-sm-4">Name</Form.Label>
                  <Col md={8}>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter name"
                      isInvalid={touched.name && errors.name}
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.name && errors.name && (
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
                      </Form.Control.Feedback>
                    )}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Form.Label className="col-sm-4">Year Group</Form.Label>
                  <Col md={8}>
                    <Form.Control
                      type="text"
                      name="year_group"
                      placeholder="2024"
                      isInvalid={touched.year_group && errors.year_group}
                      value={values.year_group}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.year_group && errors.year_group && (
                      <Form.Control.Feedback type="invalid">
                        {errors.year_group}
                      </Form.Control.Feedback>
                    )}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Form.Label className="col-sm-4">Level</Form.Label>
                  <Col md={8}>
                    <Form.Select
                      aria-label="Default select example"
                      name="level"
                      isInvalid={touched.level && errors.level}
                      value={values.level}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ width: "100%", height: "100%" }}
                    >
                      <option value={""}>select level</option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {touched.level && errors.level}
                    </Form.Control.Feedback>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Form.Label className="col-sm-4">Semester :</Form.Label>
                  <Col md={8}>
                    <Form.Select
                      aria-label="Default select example"
                      name="semester"
                      isInvalid={touched.semester && errors.semester}
                      value={values.semester}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ width: "100%", height: "100%" }}
                    >
                      <option value={""}>select semester</option>
                      <option value={"1"}>1</option>
                      <option value={"2"}>2</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {touched.semester && errors.semester}
                    </Form.Control.Feedback>
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

FormModalCurriculum.defaultProps = {
  onHide: () => {},
  show: false,
  type: "add",
  initialValues: null,
  editId: null,
  onSuccess: () => {},
};

export default FormModalCurriculum;
