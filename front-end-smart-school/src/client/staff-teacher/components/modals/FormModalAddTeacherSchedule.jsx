/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from "react";
import _ from "lodash";
import axios from "axios";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Formik } from "formik";
import config from "../../../../config";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import TimePicker from "react-time-picker";
import {
  listByStaffId,
  teacherCourseSelector,
} from "../../../../features/teacherCourse";
import { useParams } from "react-router-dom";
import {
  classroomList,
  classroomSelector,
} from "../../../../features/classroomSlice";
import * as Yup from "yup";

const FormModalAddTeacherSchedule = (props) => {
  const { id } = useParams();

  const dispacth = useDispatch();
  
  const availableClassroom = useSelector(classroomSelector.selectAll);
  const teacherCourse = useSelector(teacherCourseSelector.selectAll);
  useEffect(() => {
    dispacth(listByStaffId(id));
    // todo fik filter available classroom 
    dispacth(classroomList({ level: 1, status: "active" }));
  }, [dispacth, id]);

  const defaultValues = useMemo(
    () => ({
      classroom_id: null,
      day_name: "",
      start_time: "",
      end_time: "",
      type: "",
      semester: "",
      teacher_course_id: null,
    }),
    []
  );
  const [initialValues, setInitialValues] = useState(defaultValues);


  const validationSchema = Yup.object().shape({
    classroom_id: Yup.string().required("classroom is required"),
    day_name: Yup.string().required("day is required"),
    start_time: Yup.string().required("start time is required"),
    end_time: Yup.string().required("end time is required"),
    teacher_course_id: Yup.string().required("teacher course is required"),
  });


  let title = "Add Teacher Schedule";
  if (props.type === "edit") title = "Teacher Schedule";

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
      const payload = _.pick(values, [
        "classroom_id",
        "day_name",
        "start_time",
        "end_time",
        "type",
        "semester",
        "teacher_course_id",
        
      ]);
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
        confirmButtonText: "Yes, update it!",
      });

      if (confirmation.isConfirmed) {
        await axios.post(config.apiUrl + `/classroom-schedule`, payload, {
          headers: {
            authorization: token,
          },
        });

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
                <Row className="mb-3">
                  <Form.Label className="col-sm-4">Teacher Course</Form.Label>
                  <Col md={8}>
                    <Form.Control
                      as="select"
                      className="input-form-parent-student mb-3"
                      name="teacher_course_id"
                      value={values.teacher_course_id}
                      isInvalid={
                        touched.teacher_course_id && errors.teacher_course_id
                      }
                      onChange={handleChange}
                    >
                      <option value="">Select Course</option>
                      {teacherCourse?.map((item) => (
                        <option key={item?.id} value={item?.id}>
                          {item?.courses?.name} Kelas {item?.courses?.level} 
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
                <Row className="mb-3">
                  <Form.Label className="col-sm-4">Classroom</Form.Label>
                  <Col md={8}>
                    <Form.Control
                      as="select"
                      className="input-form-parent-student mb-3"
                      name="classroom_id"
                      value={values.classroom_id}
                      isInvalid={touched.classroom_id && errors.classroom_id}
                      onChange={handleChange}
                    >
                      <option value="">Select Classroom</option>
                      {availableClassroom?.map((item) => (
                        <option key={item?.id} value={item?.id}>
                          {item?.classMajor?.name} Kelas {item?.level}
                          {item?.code}  {item?.year_group}
                        </option>
                      ))}
                    </Form.Control>

                    {touched.classroom_id && errors.classroom_id && (
                      <Form.Control.Feedback
                        type="invalid"
                        style={{ display: "unset" }}
                      >
                        {errors.classroom_id}
                      </Form.Control.Feedback>
                    )}
                  </Col>
                </Row>


                <Row className="mb-3">
                  <Form.Label className="col-sm-4">Type</Form.Label>
                  <Col md={8}>
                    <Form.Control
                      as="select"
                      className="input-form-parent-student mb-3"
                      name="type"
                      value={values.type}
                      isInvalid={touched.type && errors.type}
                      onChange={handleChange}
                    >
                      <option value="">Select Type</option>
                      <option value="MUATAN NASIONAL">Muatan Nasional</option>
                      <option value="MUATAN KEWILAYAHAN">Muatan Kewilayahan</option>
                      <option value="DASAR BIDANG KEAHLIAN">Dasar Bidang Keahlian</option>
                      <option value="DASAR PROGRAM KEAHLIAN">Dasar Program Keahlian</option>
                      <option value="KOMPETENSI KEAHLIAN">Kompetensi Keahlian</option>
                    </Form.Control>

                    {touched.type && errors.type && (
                      <Form.Control.Feedback
                        type="invalid"
                        style={{ display: "unset" }}
                      >
                        {errors.type}
                      </Form.Control.Feedback>
                    )}
                  </Col>
                </Row>
                
                <Row className="mb-3">
                  <Form.Label className="col-sm-4">Semester</Form.Label>
                  <Col md={8}>
                    <Form.Control
                      as="select"
                      className="input-form-parent-student mb-3"
                      name="semester"
                      value={values.semester}
                      isInvalid={touched.semester && errors.semester}
                      onChange={handleChange}
                    >
                      <option value="">Select Semester</option>
                      <option value="1">Semester 1</option>
                      <option value="2">Semester 2</option>
                      </Form.Control>

                    {touched.semester && errors.semester && (
                      <Form.Control.Feedback
                        type="invalid"
                        style={{ display: "unset" }}
                      >
                        {errors.semester}
                      </Form.Control.Feedback>
                    )}
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Form.Label className="col-sm-4">Day</Form.Label>
                  <Col md={8}>
                    <Form.Control
                      as="select"
                      className="input-form-parent-student mb-3"
                      name="day_name"
                      value={values.day_name}
                      isInvalid={touched.day_name && errors.day_name}
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

                    {touched.day_name && errors.day_name && (
                      <Form.Control.Feedback
                        type="invalid"
                        style={{ display: "unset" }}
                      >
                        {errors.day_name}
                      </Form.Control.Feedback>
                    )}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Form.Label className="col-sm-4">Start Time</Form.Label>
                  <Col md={8}>
                    <TimePicker
                      className={`form-control ${
                        touched.start_time && errors.start_time
                          ? "is-invalid"
                          : ""
                      }`}
                      onChange={(time) => setFieldValue("start_time", time)}
                      value={values.start_time}
                    />
                    {touched.start_time && errors.start_time && (
                      <Form.Control.Feedback
                        type="invalid"
                        style={{ display: "unset" }}
                      >
                        {errors.start_time}
                      </Form.Control.Feedback>
                    )}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Form.Label className="col-sm-4">End Time</Form.Label>
                  <Col md={8}>
                    <TimePicker
                      className={`form-control ${
                        touched.end_time && errors.end_time ? "is-invalid" : ""
                      }`}
                      onChange={(time) => setFieldValue("end_time", time)}
                      value={values.end_time}
                    />
                    {touched.end_time && errors.end_time && (
                      <Form.Control.Feedback
                        type="invalid"
                        style={{ display: "unset" }}
                      >
                        {errors.end_time}
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

FormModalAddTeacherSchedule.defaultProps = {
  onHide: () => {},
  show: false,
  type: "add",
  initialValues: null,
  editId: null,
  onSuccess: () => {},
};

export default FormModalAddTeacherSchedule;
