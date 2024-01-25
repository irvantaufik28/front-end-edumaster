/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from "react";
import _ from "lodash";
import axios from "axios";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import config from "../../../../config";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { classroomSelector, getAll } from "../../../../features/classroomSlice";

const FormModalHistoryClassroom = (props) => {
  const dispatch = useDispatch();
  const classroom = useSelector(classroomSelector.selectAll);
  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  const defaultValues = useMemo(
    () => ({
      id: null,
      students: [{ id: "" }],
    }),
    []
  );
  const [initialValues, setInitialValues] = useState(defaultValues);

  let title = "Add Student Parent";
  if (props.type === "edit") title = "Edit Student";

  useEffect(() => {
    const newValues = { ...defaultValues, ...props.initialValues };
    setInitialValues(newValues);
  }, [props.initialValues, defaultValues]);

  const handleSubmit = async (values, { setSubmitting }) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    try {
      const payload = _.pick(values, ["id", "students"]);
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
        await axios.post(
          config.apiUrl + `/classroom/move-student/` + payload.id,
          payload,
          {
            headers: {
              authorization: token,
            },
          }
        );

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
                  <Form.Label className="col-sm-4">Classroom</Form.Label>
                  <Col md={8}>
                    <Form.Control
                      as="select"
                      className="input-form-parent-student mb-3"
                      name="id"
                      value={values.id}
                      isInvalid={
                        touched.id && touched.id && errors.id && errors.id
                      }
                      onChange={handleChange}
                    >
                      <option value="">Select Classroom</option>
                      {classroom?.map((item) => (
                        <option key={item?.id} value={item?.id}>
                          {item?.classMajor?.name} {item?.level}{item?.code}
                        </option>
                      ))}
                    </Form.Control>

                    {touched.id && touched.id && errors.id && errors.id && (
                      <Form.Control.Feedback
                        type="invalid"
                        style={{ display: "unset" }}
                      >
                        {errors.id}
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

FormModalHistoryClassroom.defaultProps = {
  onHide: () => {},
  show: false,
  type: "add",
  initialValues: null,
  editId: null,
  onSuccess: () => {},
};

export default FormModalHistoryClassroom;
