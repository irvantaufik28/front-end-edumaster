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
import { courseSelector, list } from "../../../../features/courseSlice";
import { staffSelector } from "../../../../features/staffSlice";

const FormModalAddTeacherCourse = (props) => {
  const dispacth = useDispatch();
  const course = useSelector(courseSelector.selectAll);
  const staff = useSelector(staffSelector.getById);
  useEffect(() => {
    dispacth(list());
  }, [dispacth]);

  let courses_list = course

  if (staff?.teacher_course?.length) {
    const associatedCourseIds = staff?.teacher_course?.map(
      (course) => course.course_id
    );
    const availableCourses = course?.filter(
      (course) => !associatedCourseIds.includes(course.id)
    );

    courses_list = availableCourses
  }

  const defaultValues = useMemo(
    () => ({
      staff_id: "",
      course_id: null,
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
      const payload = _.pick(values, ["staff_id", "course_id"]);
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
        payload.course_id = parseInt(payload.course_id);
        await axios.post(config.apiUrl + `/teacher/course`, payload, {
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
                      name="course_id" // Change the name attribute to "course_id"
                      value={values.course_id}
                      isInvalid={touched.course_id && errors.course_id} // Update the field names here as well
                      onChange={handleChange}
                    >
                      <option value="">Select Course</option>
                      {courses_list?.map((item) => (
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

FormModalAddTeacherCourse.defaultProps = {
  onHide: () => {},
  show: false,
  type: "add",
  initialValues: null,
  editId: null,
  onSuccess: () => {},
};

export default FormModalAddTeacherCourse;
