/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import _ from "lodash";
import axios from "axios";

import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import config from "../../../../config";
import { useDispatch, useSelector } from "react-redux";
import {
  curriculumSelector,
  listCurriculum,
} from "../../../../features/curriculumSlice";

const FormAddScheduleUseTemplate = (props) => {
  const dispatch = useDispatch();
  const listStructureCurruculum = useSelector(curriculumSelector.selectAll);

  useEffect(() => {
    dispatch(listCurriculum());
  }, [dispatch]);
  const defaultValues = useMemo(
    () => ({
      classroom_id: null,
      structure_curriculum_id: null,
    }),
    []
  );


  const [initialValues, setInitialValues] = useState(defaultValues);

  const validationSchema = Yup.object().shape({
    structure_curriculum_id: Yup.string().required("Structure Curriculum is required")
  });

  let title = "Add Schedule Use Template";

  useEffect(() => {
    const newValues = { ...defaultValues, ...props.initialValues };
    setInitialValues(newValues);
  }, [props.initialValues, defaultValues]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const payload = _.pick(values, [
        "classroom_id",
        "structure_curriculum_id",
      ]);
      console.log(payload)

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
        await axios.post(
          config.apiUrl + `/classroom-schedule/structure-curriculum`,
          payload,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        Swal.fire({
          title: props.type,
          text: "Your file has been Created.",
          icon: "success",
        });
      }

      props.onSuccess();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Failed to created. Please try again.",
        icon: "error",
      });
    } finally {
      setSubmitting(false);
    }
    setSubmitting(false);
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
          handleChange,
          isSubmitting,
          handleSubmit,
        }) => (
          <>
            <Modal.Body>
              <Form>
                {values.id && (
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4">ID</Form.Label>
                    <Col>
                      <Form.Control type="text" disabled value={values.id} />
                    </Col>
                  </Row>
                )}
               <Row className="mb-3">
                  <Form.Label className="col-sm-2">Curriculum</Form.Label>
                  <Col>
                    <Form.Control
                      as="select"
                      className="input-form-parent-student mb-3"
                      name="structure_curriculum_id"
                      value={values.structure_curriculum_id}
                      isInvalid={
                        touched.structure_curriculum_id && errors.structure_curriculum_id
                      }
                      onChange={handleChange}
                    >
                      <option value="">Select Teacher Course</option>
                      {listStructureCurruculum?.map((item) => (
                        <option key={item?.id} value={item?.id}>
                          {item?.name} Kelas {item?.level} Semester
                          {item?.semester} Tahun {item?.year_group}
                        </option>
                      ))}
                    </Form.Control>

                    {touched.structure_curriculum_id && errors.structure_curriculum_id && (
                      <Form.Control.Feedback
                        type="invalid"
                        style={{ display: "unset" }}
                      >
                        {errors.structure_curriculum_id}
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

FormAddScheduleUseTemplate.defaultProps = {
  onHide: () => {},
  show: false,
  type: "add",
  initialValues: null,
  editId: null,
  onSuccess: () => {},
};

export default FormAddScheduleUseTemplate;
