/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from "react";
import _ from "lodash";
import axios from "axios";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { FieldArray, Formik } from "formik";
import config from "../../../../config";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import TimePicker from "react-time-picker";
import * as Yup from "yup";
import {
  listAllTeacherCourse,
  teacherCourseSelector,
} from "../../../../features/teacherCourse";
import { courseSelector, list } from "../../../../features/courseSlice";

const FormModalAddClassromSchedule = (props) => {
  const dispatch = useDispatch();
  const teacherCourse = useSelector(teacherCourseSelector.selectAll);
  const courses = useSelector(courseSelector.selectAll);

  const defaultValues = useMemo(
    () => ({
      teacher_course_id: null,
      course_id: "",
      classroom_id: null,
      timeTables: [
        {
          day_name: "",
          start_time: "",
          end_time: "",
        },
      ],
    }),
    []
  );

  const validationSchema = Yup.object().shape({
    teacher_course_id: Yup.string().required("teacher course is required"),
    // TODO FIX VALIDATE COURSE ID
    // course_id: Yup.string().required("course is required"),
    timeTables: Yup.array()
      .of(
        Yup.object().shape({
          day_name: Yup.string().required(" Day is Required"),
          start_time: Yup.string().required(" start time is Required"),
          end_time: Yup.string().required("end time is required"),
        })
      )
      .min(1, "min 1"),
  });

  const [initialValues, setInitialValues] = useState(defaultValues);

  let title = "Add Classroom Schedule";

  useEffect(() => {
    const newValues = { ...defaultValues, ...props.initialValues };
    setInitialValues(newValues);
  }, [props.initialValues, defaultValues]);

  const [filterTeacherCourse, setFilterTeacherCourse] = useState({
    course_id: initialValues.course_id,
  });

  useEffect(() => {
    setFilterTeacherCourse((prevFilter) => ({
      ...prevFilter,
      course_id: initialValues.course_id,
    }));
  }, [initialValues]);

  useEffect(() => {
    dispatch(
      listAllTeacherCourse({ course_id: filterTeacherCourse.course_id })
    );
    dispatch(list());
  }, [dispatch, filterTeacherCourse.course_id]);

  const handleChangeTeacherCourse = (e) => {
    const newFilterTeacherCourse = {
      ...filterTeacherCourse,
      course_id: e.target.value,
    };

    if (newFilterTeacherCourse.course_id === "") {
      setInitialValues((prevValues) => ({
        ...prevValues,
        teacher_course_id: "",
      }));
    }

    setFilterTeacherCourse(newFilterTeacherCourse);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    try {
      const payload = _.pick(values, [
        "classroom_id",
        "course_id",
        "teacher_course_id",
        "timeTables",
      ]);

      if (
        filterTeacherCourse.course_id !== "" ||
        filterTeacherCourse.course_id !== undefined
      ) {
        payload.course_id = parseInt(filterTeacherCourse.course_id);
      } else {
        payload.course_id = null;
      }

      if (payload.teacher_course_id) {
        payload.teacher_course_id = parseInt(payload.teacher_course_id);
      }

      if (payload.classroom_id) {
        payload.classroom_id = parseInt(payload.classroom_id);
      }

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
          config.apiUrl + `/classroom-schedule/create-many`,
          payload,
          {
            headers: {
              authorization: token,
            },
          }
        );

        Swal.fire({
          title: "Created",
          text: "Your file has been Created.",
          icon: "success",
        });
      }

      // Trigger the success callback
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
  };

  return (
    <Modal show={props.show} onHide={props.onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
        validationSchema={validationSchema}
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
                  <Form.Label className="col-sm-4">Course</Form.Label>
                  <Col md={8}>
                    <Form.Control
                      as="select"
                      className="input-form-parent-student mb-3"
                      name="course_id"
                      value={filterTeacherCourse.course_id}
                      isInvalid={touched.course_id && errors.course_id}
                      onChange={handleChangeTeacherCourse}
                    >
                      <option value="">Select Course</option>
                      {courses?.map((item) => (
                        <option key={item?.id} value={item?.id}>
                          {item?.name} Kelas {item?.level}
                        </option>
                      ))}
                    </Form.Control>

                    {touched.course_id && errors.course_id && (
                      <Form.Control.Feedback
                        type="invalid"
                        style={{ display: "unset" }}
                      >
                        {errors.course_id}
                      </Form.Control.Feedback>
                    )}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Form.Label className="col-sm-4">Teacher Course</Form.Label>
                  <Col md={8}>
                    <Form.Control
                      disabled={filterTeacherCourse.course_id === ""}
                      as="select"
                      className="input-form-parent-student mb-3"
                      name="teacher_course_id"
                      value={values.teacher_course_id}
                      isInvalid={
                        touched.teacher_course_id && errors.teacher_course_id
                      }
                      onChange={handleChange}
                    >
                      <option value="">Select Teacher Course</option>
                      {teacherCourse?.map((item) => (
                        <option key={item?.id} value={item?.id}>
                          {item?.courses?.name} Kelas {item?.courses?.level}{" "}
                          {item?.staff?.first_name}
                        </option>
                      ))}
                    </Form.Control>

                    {touched.teacher_course_id && errors.teacher_course_id && (
                      <Form.Control.Feedback
                        type="invalid"
                        style={{ display: "unset" }}
                      >
                        {errors.teacher_course_id}
                      </Form.Control.Feedback>
                    )}
                  </Col>
                </Row>
                <FieldArray name="timeTables">
                  {({ insert, remove, push }) => (
                    <>
                      {values.timeTables.length > 0 &&
                        values.timeTables.map((parent, index) => (
                          <>
                            <Row className="mb-3">
                              <Form.Label className="col-sm-4">
                                Day {index + 1}:
                              </Form.Label>
                              <Col md={8}>
                                <Form.Control
                                  className="input-form-parent-student mb-3"
                                  as="select"
                                  name={`timeTables.${index}.day_name`}
                                  value={values.timeTables[index].day_name}
                                  placeholder={`Select Day ${index + 1}`}
                                  isInvalid={
                                    touched.timeTables &&
                                    touched.timeTables[index]?.day_name &&
                                    errors.timeTables &&
                                    errors.timeTables[index]?.day_name
                                  }
                                  onChange={handleChange}
                                >
                                  <option value="">Select Day</option>
                                  <option value="MONDAY">MONDAY</option>
                                  <option value="TUESDAY">TUESDAY</option>
                                  <option value="WEDNESDAY">WEDNESDAY</option>
                                  <option value="THURSDAY">THURSDAY</option>
                                  <option value="FRIDAY">FRIDAY</option>
                                  <option value="SATURDAY">SATURDAY</option>
                                </Form.Control>

                                {touched.timeTables &&
                                  touched.timeTables[index]?.day_name &&
                                  errors.timeTables &&
                                  errors.timeTables[index]?.day_name && (
                                    <Form.Control.Feedback
                                      type="invalid"
                                      style={{ display: "unset" }}
                                    >
                                      {errors.timeTables[index].day_name}
                                    </Form.Control.Feedback>
                                  )}
                              </Col>
                            </Row>

                            <Row className="mb-3">
                              <Form.Label className="col-sm-4">
                                Start Time {index + 1}:
                              </Form.Label>
                              <Col md={8}>
                                <TimePicker
                                  className="input-form-parent-student mb-3"
                                  as="select"
                                  name={`timeTables.${index}.start_time`}
                                  value={values.timeTables[index].start_time}
                                  isInvalid={
                                    touched.timeTables &&
                                    touched.timeTables[index]?.start_time &&
                                    errors.timeTables &&
                                    errors.timeTables[index]?.start_time
                                  }
                                  onChange={(time) =>
                                    setFieldValue(
                                      `timeTables.${index}.start_time`,
                                      time
                                    )
                                  }
                                />

                                {touched.timeTables &&
                                  touched.timeTables[index]?.start_time &&
                                  errors.timeTables &&
                                  errors.timeTables[index]?.start_time && (
                                    <Form.Control.Feedback
                                      type="invalid"
                                      style={{ display: "unset" }}
                                    >
                                      {errors.timeTables[index].start_time}
                                    </Form.Control.Feedback>
                                  )}
                              </Col>
                            </Row>
                            <Row className="mb-3">
                              <Form.Label className="col-sm-4">
                                End Time {index + 1}:
                              </Form.Label>
                              <Col md={8}>
                                <TimePicker
                                  className="input-form-parent-student mb-3"
                                  as="select"
                                  name={`timeTables.${index}.end_time`}
                                  value={values.timeTables[index].end_time}
                                  isInvalid={
                                    touched.timeTables &&
                                    touched.timeTables[index]?.end_time &&
                                    errors.timeTables &&
                                    errors.timeTables[index]?.end_time
                                  }
                                  onChange={(time) =>
                                    setFieldValue(
                                      `timeTables.${index}.end_time`,
                                      time
                                    )
                                  }
                                />

                                {touched.timeTables &&
                                  touched.timeTables[index]?.end_time &&
                                  errors.timeTables &&
                                  errors.timeTables[index]?.end_time && (
                                    <Form.Control.Feedback
                                      type="invalid"
                                      style={{ display: "unset" }}
                                    >
                                      {errors.timeTables[index].end_time}
                                    </Form.Control.Feedback>
                                  )}
                              </Col>
                            </Row>
                            <hr></hr>

                            {index + 1 < values.timeTables.length ? (
                              <Button
                                variant="outline-secondary"
                                onClick={() => remove(index + 1)}
                              >
                                x
                              </Button>
                            ) : (
                              <Button
                                variant="outline-secondary"
                                onClick={() =>
                                  push({
                                    day_name: "",
                                    start_time: "",
                                    end_time: "",
                                  })
                                }
                              >
                                +
                              </Button>
                            )}
                          </>
                        ))}
                    </>
                  )}
                </FieldArray>
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

FormModalAddClassromSchedule.defaultProps = {
  onHide: () => {},
  show: false,
  type: "add",
  initialValues: null,
  editId: null,
  onSuccess: () => {},
};

export default FormModalAddClassromSchedule;
