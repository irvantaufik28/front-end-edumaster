/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from "react";
import _ from "lodash";
import axios from "axios";
import config from "../../../config";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { FieldArray, Formik } from "formik";
import * as Yup from "yup";
import ConfirmationEdit from "../../../components/modals/ConfirmationEdit";
import { useDispatch, useSelector } from "react-redux";
import { classMajorSelector, getAll } from "../../../features/classMajorSlice";

const FormModal = (props) => {
  const classMajor = useSelector(classMajorSelector.selectAll);

  const dispacth = useDispatch();

  useEffect(() => {
    dispacth(getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const defaultValues = useMemo(
    () => ({
      code: "",
      level: "",
      status: "",
      year_group: "",
      class_major_id: null,
    }),
    []
  );
  const [initialValues, setInitialValues] = useState(defaultValues);

  const validationSchema = Yup.object().shape({
    code: Yup.string().required("code is required"),
    level: Yup.string().required("level is required"),
    status: Yup.string().required("status is required"),
    year_group: Yup.string().required("year is required"),
    class_major_id: Yup.number().required("class major is required"),
  });
  let title = "Add Classroom";
  if (props.type === "edit") title = "classroom";

  useEffect(() => {
    const newValues = { ...defaultValues, ...props.initialValues };
    setInitialValues(newValues);
  }, [props.initialValues, defaultValues]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const payload = _.pick(values, [
        "code",
        "level",
        "class_major_id",
        "status",
        "year_group",
      ]);

      payload.class_major_id = parseInt(payload.class_major_id);

      if (props.type === "add") {
        await axios.post(config.apiUrl + `/classroom`, payload);
      } else {
        const url = config.apiUrl + `/classroom/` + props.editId;
        await ConfirmationEdit(url, payload);
        // await axios.put(config.apiUrl + `/classroom/` + props.editId, payload);
      }

      props.onSuccess(props.type);
    } catch (error) {
      console.log(error);
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
                  <Form.Label className="col-sm-4">code</Form.Label>
                  <Col md={8}>
                    <Form.Control
                      type="text"
                      name="code"
                      placeholder="Enter name"
                      isInvalid={touched.code && errors.code}
                      value={values.code}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.code && errors.code && (
                      <Form.Control.Feedback type="invalid">
                        {errors.code}
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
                      <option>Open this select menu</option>
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
                  <Form.Label className="col-sm-4">Year Group</Form.Label>
                  <Col md={8}>
                    <Form.Control
                      type="text"
                      name="year_group"
                      placeholder="Enter year group"
                      isInvalid={touched.year_group && errors.year_group}
                      value={values.year_group}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.year_group && errors.year_group && (
                      <Form.Control.Feedback type="invalid">
                        {errors.year_group}
                      </Form.Control.Feedback>
                    )}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Form.Label className="col-sm-4">Class Major</Form.Label>
                  <Col md={8}>
                    <Form.Select
                      aria-label="Default select example"
                      name="class_major_id"
                      isInvalid={
                        touched.class_major_id && errors.class_major_id
                      }
                      value={values.class_major_id}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ width: "100%", height: "100%" }}
                    >
                      <option selected value={""}>
                        select class major
                      </option>
                      {classMajor?.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {touched.level && errors.level}
                    </Form.Control.Feedback>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Form.Label className="col-sm-4">Status</Form.Label>
                  <Col md={8}>
                    <Form.Select
                      aria-label="Default select example"
                      name="status"
                      isInvalid={touched.status && errors.status}
                      value={values.status}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ width: "100%", height: "100%" }}
                    >
                      <option>select status</option>
                      <option value={"active"}>Active</option>
                      <option value={"not_active"}>Non active</option>
                      <option value={"preparation"}>Preparation</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {touched.level && errors.level}
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

FormModal.defaultProps = {
  onHide: () => {},
  show: false,
  type: "add",
  initialValues: null,
  editId: null,
  onSuccess: () => {},
};

export default FormModal;
