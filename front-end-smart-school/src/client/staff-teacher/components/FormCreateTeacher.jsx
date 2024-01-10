/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from "react";
import _, { values } from "lodash";
import axios from "axios";
import config from "../../../config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Card, Col, Form, ListGroup, Row } from "react-bootstrap";
import { FieldArray, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import default_person from "../../../assets/default/default_person.jpg";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import ButtonSuccess from "../../../components/ui/button/ButtonSuccess";
import ButtonDanger from "../../../components/ui/button/ButtonDanger";
// import { courseSelector, list } from "../../../features/courseSlice";

const FormCreateTeacher = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(list());
  // }, [dispatch]);

  const navigate = useNavigate();
  const dataInitialValues = useSelector((state) => state.student.data);
  const defaultValues = useMemo(
    () => ({
      nik: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      religion: "",
      birth_place: "",
      birth_date: "",
      gender: "",
      email: "",
      phone: "",
      foto_url: "",
      address: "",
      roles: [
        {
          role_id:3,
        },
      ],
      // courses: [{ id: null }],
    }),
    []
  );
  const [initialValues, setInitialValues] = useState(defaultValues);
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/s;

  const validationSchema = Yup.object().shape({
    nik: Yup.string().required("nik number is required"),
    first_name: Yup.string().required("first name is required"),
    last_name: Yup.string().required("last name is required"),
    religion: Yup.string().required("religion is required"),
    birth_place: Yup.string().required("birth place is required"),
    birth_date: Yup.string().required("birth date is required"),
    gender: Yup.string().required("gender is required"),
    email: Yup.string().required("email is required"),
    phone: Yup.string().required("phone year is required"),
    address: Yup.string().required("origin academy is required"),
    roles: Yup.array()
      .of(
        Yup.object().shape({
          id: Yup.string().required(" role is Required"),
        })
      )
      .min(1, "min 1"),
    courses: Yup.array()
      .of(
        Yup.object().shape({
          id: Yup.string().required(" Courses is Required"),
        })
      )
      .min(1, "min 1"),
  });

  const [previewSource, setPreviewSource] = useState(null);
  const [image, setImage] = useState(null);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setImage(e.target.files[0]);
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  useEffect(() => {
    const newValues = { ...defaultValues, ...dataInitialValues.initialValues };
    if (dataInitialValues.initialValues?.foto_url) {
      setPreviewSource(dataInitialValues.initialValues.foto_url);
    }
    if (newValues.birth_date)
      newValues.birth_date = new Date(newValues.birth_date);
    if (newValues.salary) newValues.salary = newValues.salary.toLocaleString();
    setInitialValues(newValues);
  }, [dataInitialValues, defaultValues]);
  const handleSubmit = async (values) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const payload = _.pick(values, [
        "nik",
        "first_name",
        "middle_name",
        "last_name",
        "religion",
        "birth_place",
        "birth_date",
        "gender",
        "phone",
        "email",
        "address",
        "foto_url",
        "roles",
        // "courses",
      ]);
     

      if (payload.birth_date)
        payload.birth_date = moment(payload.birth_date).format("YYYY-MM-DD");

      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("type", "image");
        formData.append("folder", "student_foto");

  
        const response = await axios.post(config.apiUrl + `/upload`, formData, {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        payload.foto_url = response.data.url;
      }

      await axios.post(config.apiUrl + `/staff`, payload, {
        headers: {
          authorization: token,
        },
      });

      navigate("/staff/teacher");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    navigate("/staff/teacher");
  };

  // const courseList = useSelector(courseSelector.selectAll);


  // const [selectedObject, setSelectedObject] = useState({
  //   id: "",
  // });
  // const [suggestedOptions, setSuggestedOptions] = useState([]);

  // const handleInputChange = (e) => {
  //   const value = e.target.value;

  //   // Filter options based on input
  //   const filteredOptions = courseList.filter((option) =>
  //     option.name.toLowerCase().includes(value.toLowerCase())
  //   );

  //   // Update filtered options to include both name and level in the format "name kelas level"
  //   const formattedOptions = filteredOptions.map((option) => ({
  //     id: option.id,
  //     displayText: `${option.name} kelas ${option.level}`,
  //   }));

  //   setSuggestedOptions(formattedOptions);
  // };
  // const handleOptionClick = (id, name, setFieldValue, index) => {
  //   setSelectedObject({
  //     id: id,
  //     name: name,
  //   });
  //   setFieldValue(`courses.${index}.id`, id);
  //   setSuggestedOptions([]);
  // };

  return (
    <Formik
      initialValues={initialValues}
      //   validationSchema={validationSchema}
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
              <div className="title-form-student">Form Teacher</div>
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
                      <h4>Teacher Information</h4>
                    </div>
                    <Row className="row mb-3">
                      <Col md={6}>
                        <Form.Label>NIK</Form.Label>
                        <Form.Control
                          type="text"
                          name="nik"
                          placeholder="Enter NIK"
                          isInvalid={touched.nik && errors.nik}
                          value={values.nik}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        {touched.nik && errors.nik && (
                          <Form.Control.Feedback type="invalid">
                            {errors.nik}
                          </Form.Control.Feedback>
                        )}
                      </Col>
                      <Col md={6}>
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                          type="text"
                          name="phone"
                          placeholder="Enter phone"
                          isInvalid={touched.phone && errors.phone_no}
                          value={values.phone_no}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        {touched.phone_no && errors.phone_no && (
                          <Form.Control.Feedback type="invalid">
                            {errors.phone_no}
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
                          name="middle_name"
                          placeholder="Enter First Name"
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
                            {touched.religion && errors.religion}
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
                                isInvalid={touched.gender && errors.gender}
                              />
                            </Col>
                            <Col md={6}>
                              <Form.Check
                                type="radio"
                                label="Female"
                                name="gender"
                                value="female"
                                checked={values.gender === "female"}
                                onChange={handleChange}
                                isInvalid={touched.gender && errors.gender}
                              />
                            </Col>
                          </Row>
                          {touched.gender && errors.gender && (
                            <Form.Control.Feedback type="invalid">
                              {errors.gender}
                            </Form.Control.Feedback>
                          )}
                        </Form.Group>
                      </Col>

                      <Col md={4}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="text"
                          name="email"
                          placeholder="Enter email"
                          isInvalid={touched.email && errors.email}
                          value={values.email}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        {touched.email && errors.email && (
                          <Form.Control.Feedback type="invalid">
                            {errors.email}
                          </Form.Control.Feedback>
                        )}
                      </Col>
                      <Col md={4}>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          type="text"
                          name="address"
                          placeholder="Enter Address"
                          isInvalid={touched.address && errors.address}
                          value={values.address}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        {touched.address && errors.address && (
                          <Form.Control.Feedback type="invalid">
                            {errors.address}
                          </Form.Control.Feedback>
                        )}
                      </Col>
                    </Row>
                  </Col>
                </Row>
                {/* <div className="student-parents-information">
                  <h4>Courses Information</h4>
                </div>
                <hr></hr> */}
                {/* <FieldArray name="courses">
                  {({ insert, remove, push }) => (
                    <>
                      {values.courses.length > 0 &&
                        values.courses.map((parent, index) => (
                          <div key={index}>
                            <Row>
                              <Col md={4}>
                                <Form.Label className="col-sm-4">
                                  Courses {index + 1} :
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  className="input-form-parent-student mb-3"
                                  name={`courses.${index}.id`}
                                  value={selectedObject.name || ""}
                                  isInvalid={
                                    touched.courses &&
                                    touched.courses[index]?.id &&
                                    errors.courses &&
                                    errors.courses[index]?.id
                                  }
                                  onChange={handleInputChange}
                                  placeholder="Type to Search..."
                                />
                                <ListGroup>
                                  {suggestedOptions.map((option) => (
                                    <ListGroup.Item
                                      key={option.id}
                                      active={option.id === selectedObject.id}
                                      onClick={() =>
                                        handleOptionClick(
                                          option.id,
                                          option.displayText,
                                          setFieldValue,
                                          index
                                        )
                                      }
                                    >
                                      {option.displayText}
                                    </ListGroup.Item>
                                  ))}
                                </ListGroup>
                                <p>Selected ID: {selectedObject.id}</p>

                                {touched.courses &&
                                  touched.courses[index]?.id &&
                                  errors.courses &&
                                  errors.courses[index]?.id && (
                                    <Form.Control.Feedback
                                      type="invalid"
                                      style={{ display: "unset" }}
                                    >
                                      {errors.courses[index].id}
                                    </Form.Control.Feedback>
                                  )}
                              </Col>
                            </Row>

                            <hr />

                            {index + 1 < values.courses.length ? (
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
                                    id: "", // or set a default value
                                  })
                                }
                              >
                                +
                              </Button>
                            )}
                          </div>
                        ))}
                    </>
                  )}
                </FieldArray> */}
              </Form>
            </Card.Body>
          </Card>

          <div className="form-button-student">
            <ButtonDanger title="cancel" onClick={handleCancel} />
            <ButtonSuccess title="save" onClick={handleSubmit} />
          </div>
        </>
      )}
    </Formik>
  );
};

FormCreateTeacher.defaultProps = {
  type: "add",
  initialValues: null,
  editId: null,
};

export default FormCreateTeacher;
