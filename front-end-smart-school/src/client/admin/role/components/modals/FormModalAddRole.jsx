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

const FormModalAddRole = (props) => {
  const defaultValues = useMemo(
    () => ({
      name: "",
    }),
    []
  );
  const [initialValues, setInitialValues] = useState(defaultValues);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("name is required"),
  });
  let title = "Add Role";

  useEffect(() => {
    const newValues = { ...defaultValues, ...props.initialValues };
    setInitialValues(newValues);
  }, [props.initialValues, defaultValues]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const payload = _.pick(values, ["name"]);

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
        payload.student_id = props.student_id;
        response = await axios.post(config.apiUrl + `/role`, payload, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

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

FormModalAddRole.defaultProps = {
  onHide: () => {},
  show: false,
  type: "add",
  initialValues: null,
  editId: null,
  onSuccess: () => {},
};

export default FormModalAddRole;
