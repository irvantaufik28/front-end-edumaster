/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from "react";
import _ from "lodash";
import axios from "axios";
import config from "../../../config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { FieldArray, Formik } from "formik";
import * as Yup from "yup";
import ConfirmationEdit from "../../../components/modals/ConfirmationEdit";
import { useDispatch, useSelector } from "react-redux";
import { classMajorSelector, getAll } from "../../../features/classMajorSlice";
import "../styles/fromstudent.css";
import default_person from "../../../assets/default/default_person.jpg";
import moment from "moment";

const FormStudent = (props) => {
  const dataInitialValues = useSelector((state) => state.student.data);
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
  console.log(dataInitialValues);
  const [initialValues, setInitialValues] = useState(defaultValues);

  // const validationSchema = Yup.object().shape({
  //   code: Yup.string().required("code is required"),
  //   level: Yup.string().required("level is required"),
  //   status: Yup.string().required("status is required"),
  //   year_group: Yup.string().required("year is required"),
  //   class_major_id: Yup.number().required("class major is required"),
  // });
  let title = "Add Classroom";
  if (dataInitialValues.type === "edit") title = "student";

  useEffect(() => {
    const newValues = { ...defaultValues, ...dataInitialValues };
    setInitialValues(newValues);
  }, [dataInitialValues, defaultValues]);
  const handleSubmit = async (values, { setSubmitting }) => {
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

      console.log(payload);

      if (dataInitialValues.type === "add") {
        // await axios.post(config.apiUrl + `/classroom`, payload);
        console.log(payload);
      } else {
        // const url = config.apiUrl + `/classroom/` + props.editId;
        // await ConfirmationEdit(url, payload);
        // await axios.put(config.apiUrl + `/classroom/` + props.editId, payload);
      }

      props.onSuccess(dataInitialValues.type);
    } catch (error) {
      console.log(error);
    }
    setSubmitting(false);
  };

  const [previewSource, setPreviewSource] = useState(null);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  // const [selectedGender, setSelectedGender] = useState(null);
  // const handleGenderChange = (event) => {
  //   setSelectedGender(event.target.value);
  // };
  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={validationSchema}
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
          <Card style={{ width: "100%", height: "auto" }}>
            <Card.Body>
              <div className="title-form-student">Form Student</div>
              <hr></hr>
              <Form>
                <Row>
                  <Col md={3}>
                    <div className="dropzone">
                      {previewSource ? (
                        <img
                          src={previewSource}
                          alt="Preview"
                          style={{
                            width: "200px",
                            height: "200px",
                            border: "1px solid #ccc",
                          }}
                        />
                      ) : (
                        <img
                          src={default_person}
                          alt="Preview"
                          style={{
                            width: "200px",
                            height: "200px",
                            border: "1px solid #ccc",
                          }}
                        ></img>
                      )}
                    </div>
                    <div className="input-file-upload">
                      <input type="file" onChange={handleFileInputChange} />
                    </div>
                  </Col>
                  <Col md={9}>
                    <div className="student-information">
                      <h4>Student Information</h4>
                    </div>
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
                            touched.family_identity_no &&
                            errors.family_identity_no
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
                          name="midde_name"
                          placeholder="Enter middle name"
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
                            {touched.level && errors.level}
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
                        <DatePicker
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
                              />
                            </Col>
                            <Form.Check
                              type="radio"
                              label="Female"
                              name="gender"
                              value="female"
                              checked={values.gender === "female"}
                              onChange={handleChange}
                            />
                          </Row>
                        </Form.Group>
                      </Col>

                      <Col md={4}>
                        <Form.Label>Register Year</Form.Label>
                        <Form.Control
                          type="text"
                          name="register_year"
                          placeholder="Enter register_year"
                          isInvalid={
                            touched.register_year && errors.register_year
                          }
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
                  </Col>
                </Row>
                <div className="student-parents-information">
                  <h4>Student Parents Information</h4>
                </div>
                <hr></hr>
                <Row className="mb-3">
                  <Col>
                    <FieldArray name="student_parents">
                      {({ insert, remove, push }) => (
                        <>
                          {values.student_parents.length > 0 &&
                            values.student_parents.map((parent, index) => (
                              <>
                                <InputGroup>
                                  <Col md={4} className="student-parent-label">
                                    <Form.Label className="col-sm-4">
                                      NIK {index + 1} :
                                    </Form.Label>
                                  </Col>
                                  <Col md={8}>
                                    <Form.Control
                                      className="input-form-parent-student mb-3"
                                      name={`student_parents.${index}.nik`}
                                      value={values.student_parents[index].nik}
                                      placeholder={`Enter Job ${index + 1}`}
                                      isInvalid={
                                        touched.student_parents &&
                                        touched.student_parents[index]?.nik &&
                                        errors.student_parents &&
                                        errors.student_parents[index]?.nik
                                      }
                                      onChange={handleChange}
                                    />
                                  </Col>

                                  <Col md={4} className="student-parent-label">
                                    <Form.Label className="col-sm-4">
                                      First Name {index + 1} :
                                    </Form.Label>
                                  </Col>
                                  <Col md={8}>
                                    <Form.Control
                                      className="input-form-parent-student mb-3"
                                      name={`student_parents.${index}.first_name`}
                                      value={
                                        values.student_parents[index].first_name
                                      }
                                      placeholder={`Enter First Name ${
                                        index + 1
                                      }`}
                                      isInvalid={
                                        touched.student_parents &&
                                        touched.student_parents[index]
                                          ?.first_name &&
                                        errors.student_parents &&
                                        errors.student_parents[index]
                                          ?.first_name
                                      }
                                      onChange={handleChange}
                                    />
                                  </Col>

                                  <Col md={4} className="student-parent-label">
                                    <Form.Label className="col-sm-4">
                                      Last Name {index + 1} :
                                    </Form.Label>
                                  </Col>
                                  <Col md={8}>
                                    <Form.Control
                                      className="input-form-parent-student mb-3"
                                      name={`student_parents.${index}.last_name`}
                                      value={
                                        values.student_parents[index].last_name
                                      }
                                      placeholder={`Enter Last Name ${
                                        index + 1
                                      }`}
                                      isInvalid={
                                        touched.student_parents &&
                                        touched.student_parents[index]
                                          ?.last_name &&
                                        errors.last_name &&
                                        errors.student_parents[index]?.last_name
                                      }
                                      onChange={handleChange}
                                    />
                                  </Col>

                                  <Col md={4} className="student-parent-label">
                                    <Form.Label className="col-sm-4">
                                      Relationship {index + 1} :
                                    </Form.Label>
                                  </Col>
                                  <Col md={8}>
                                    <Form.Control
                                      as="select"
                                      className="input-form-parent-student mb-3"
                                      name={`student_parents.${index}.relationship`}
                                      value={
                                        values.student_parents[index]
                                          .relationship
                                      }
                                      isInvalid={
                                        touched.student_parents &&
                                        touched.student_parents[index]
                                          ?.relationship &&
                                        errors.relationship &&
                                        errors.student_parents[index]
                                          ?.relationship
                                      }
                                      onChange={handleChange}
                                    >
                                      <option value="">
                                        Select Relationship
                                      </option>
                                      <option value="ayah">Ayah</option>
                                      <option value="ibu">Ibu</option>
                                      <option value="tante">Tante</option>
                                    </Form.Control>
                                  </Col>
                                  <Col md={4} className="student-parent-label">
                                    <Form.Label className="col-sm-4">
                                      Phone {index + 1} :
                                    </Form.Label>
                                  </Col>
                                  <Col md={8}>
                                    <Form.Control
                                      className="input-form-parent-student mb-3"
                                      name={`student_parents.${index}.phone`}
                                      value={
                                        values.student_parents[index].phone
                                      }
                                      placeholder={`Enter Phone ${index + 1}`}
                                      isInvalid={
                                        touched.student_parents &&
                                        touched.student_parents[index]?.phone &&
                                        errors.student_parents &&
                                        errors.student_parents[index]?.phone
                                      }
                                      onChange={handleChange}
                                    />
                                  </Col>

                                  <Col md={4} className="student-parent-label">
                                    <Form.Label className="col-sm-4">
                                      Email {index + 1} :
                                    </Form.Label>
                                  </Col>
                                  <Col md={8}>
                                    <Form.Control
                                      className="input-form-parent-student mb-3"
                                      name={`student_parents.${index}.email`}
                                      value={
                                        values.student_parents[index].email
                                      }
                                      placeholder={`Enter Email ${index + 1}`}
                                      isInvalid={
                                        touched.student_parents &&
                                        touched.student_parents[index]?.email &&
                                        errors.student_parents &&
                                        errors.student_parents[index]?.email
                                      }
                                      onChange={handleChange}
                                    />
                                  </Col>

                                  <Col md={4} className="student-parent-label">
                                    <Form.Label className="col-sm-4">
                                      Job {index + 1} :
                                    </Form.Label>
                                  </Col>
                                  <Col md={8}>
                                    <Form.Control
                                      className="input-form-parent-student mb-3"
                                      name={`student_parents.${index}.job`}
                                      value={values.student_parents[index].job}
                                      placeholder={`Enter Job ${index + 1}`}
                                      isInvalid={
                                        touched.student_parents &&
                                        touched.student_parents[index]?.job &&
                                        errors.student_parents &&
                                        errors.student_parents[index]?.job
                                      }
                                      onChange={handleChange}
                                    />
                                  </Col>

                                  <Col md={4} className="student-parent-label">
                                    <Form.Label className="col-sm-4">
                                      Salary {index + 1} :
                                    </Form.Label>
                                  </Col>
                                  <Col md={8}>
                                    <Form.Control
                                      className="input-form-parent-student mb-3"
                                      name={`student_parents.${index}.salary`}
                                      value={
                                        values.student_parents[index].salary
                                      }
                                      placeholder={`Enter Salary ${index + 1}`}
                                      isInvalid={
                                        touched.student_parents &&
                                        touched.student_parents[index]
                                          ?.salary &&
                                        errors.student_parents &&
                                        errors.student_parents[index]?.salary
                                      }
                                      onChange={handleChange}
                                    />
                                  </Col>

                                  <Col md={4} className="student-parent-label">
                                    <Form.Label className="col-sm-4">
                                      Address {index + 1} :
                                    </Form.Label>
                                  </Col>
                                  <Col md={8}>
                                    <Form.Control
                                      className="input-form-parent-student mb-3"
                                      name={`student_parents.${index}.address`}
                                      value={
                                        values.student_parents[index].address
                                      }
                                      placeholder={`Enter Job ${index + 1}`}
                                      isInvalid={
                                        touched.student_parents &&
                                        touched.student_parents[index]
                                          ?.address &&
                                        errors.student_parents &&
                                        errors.student_parents[index]?.address
                                      }
                                      onChange={handleChange}
                                    />
                                  </Col>
                                  <hr></hr>

                                  {index + 1 < values.student_parents.length ? (
                                    <Button
                                      variant="outline-secondary"
                                      onClick={() => remove(index)}
                                    >
                                      x
                                    </Button>
                                  ) : (
                                    <Button
                                      variant="outline-secondary"
                                      onClick={() =>
                                        push({
                                          nik: "",
                                          first_name: "",
                                          last_name: "",
                                          relationship: "",
                                          phone: "",
                                          email: "",
                                          job: "",
                                          salary: "",
                                          address: "",
                                        })
                                      }
                                    >
                                      +
                                    </Button>
                                  )}
                                </InputGroup>

                                {touched.student_parents &&
                                  touched.student_parents[index]?.nik &&
                                  errors.student_parents &&
                                  errors.student_parents[index]?.nik && (
                                    <Form.Control.Feedback
                                      type="invalid"
                                      style={{ display: "unset" }}
                                    >
                                      {errors.student_parents[index].nik}
                                    </Form.Control.Feedback>
                                  )}

                                {touched.student_parents &&
                                  touched.student_parents[index]?.first_name &&
                                  errors.student_parents &&
                                  errors.student_parents[index]?.first_name && (
                                    <Form.Control.Feedback
                                      type="invalid"
                                      style={{ display: "unset" }}
                                    >
                                      {errors.student_parents[index].first_name}
                                    </Form.Control.Feedback>
                                  )}

                                {touched.student_parents &&
                                  touched.student_parents[index]?.last_name &&
                                  errors.student_parents &&
                                  errors.student_parents[index]?.last_name && (
                                    <Form.Control.Feedback
                                      type="invalid"
                                      style={{ display: "unset" }}
                                    >
                                      {errors.student_parents[index].last_name}
                                    </Form.Control.Feedback>
                                  )}

                                {touched.student_parents &&
                                  touched.student_parents[index]
                                    ?.relationship &&
                                  errors.student_parents &&
                                  errors.student_parents[index]
                                    ?.relationship && (
                                    <Form.Control.Feedback
                                      type="invalid"
                                      style={{ display: "unset" }}
                                    >
                                      {
                                        errors.student_parents[index]
                                          .relationship
                                      }
                                    </Form.Control.Feedback>
                                  )}

                                {touched.student_parents &&
                                  touched.student_parents[index]?.phone &&
                                  errors.student_parents &&
                                  errors.student_parents[index]?.phone && (
                                    <Form.Control.Feedback
                                      type="invalid"
                                      style={{ display: "unset" }}
                                    >
                                      {errors.student_parents[index].phone}
                                    </Form.Control.Feedback>
                                  )}

                                {touched.student_parents &&
                                  touched.student_parents[index]?.email &&
                                  errors.student_parents &&
                                  errors.student_parents[index]?.email && (
                                    <Form.Control.Feedback
                                      type="invalid"
                                      style={{ display: "unset" }}
                                    >
                                      {errors.student_parents[index].email}
                                    </Form.Control.Feedback>
                                  )}

                                {touched.student_parents &&
                                  touched.student_parents[index]?.job &&
                                  errors.student_parents &&
                                  errors.student_parents[index]?.job && (
                                    <Form.Control.Feedback
                                      type="invalid"
                                      style={{ display: "unset" }}
                                    >
                                      {errors.student_parents[index].job}
                                    </Form.Control.Feedback>
                                  )}

                                {touched.student_parents &&
                                  touched.student_parents[index]?.salary &&
                                  errors.student_parents &&
                                  errors.student_parents[index]?.salary && (
                                    <Form.Control.Feedback
                                      type="invalid"
                                      style={{ display: "unset" }}
                                    >
                                      {errors.student_parents[index].salary}
                                    </Form.Control.Feedback>
                                  )}

                                {touched.student_parents &&
                                  touched.student_parents[index]?.address &&
                                  errors.student_parents &&
                                  errors.student_parents[index]?.address && (
                                    <Form.Control.Feedback
                                      type="invalid"
                                      style={{ display: "unset" }}
                                    >
                                      {errors.student_parents[index].address}
                                    </Form.Control.Feedback>
                                  )}
                              </>
                            ))}
                        </>
                      )}
                    </FieldArray>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>

          <div>
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
          </div>
        </>
      )}
    </Formik>
  );
};

FormStudent.defaultProps = {
  onHide: () => {},
  show: false,
  type: "add",
  initialValues: null,
  editId: null,
  onSuccess: () => {},
};

export default FormStudent;
