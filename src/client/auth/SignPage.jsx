/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { Formik, Form as FormikForm, Field } from "formik";
import { Button, Col, Form, Row } from "react-bootstrap";
import example from "../../assets/img/example.webp";
import "./styles/FormSign.css";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, signin } from "../../features/authSlice";
import * as Yup from "yup";
import _ from "lodash";
import { useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const SigninPage = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token"]);
  const token = useSelector(authSelector.selectToken);
  const dispatch = useDispatch();
  const errorMessage = useSelector(authSelector.errorMessage);
  const defaultValues = useMemo(
    () => ({
      username: "",
      password: "",
    }),
    []
  );

  const [initialValues, setInitialValues] = useState(defaultValues);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  useEffect(() => {
    const newValues = { ...defaultValues };
    setInitialValues(newValues);
  }, [defaultValues]);

  const handleSubmit = async (values) => {
    try {
      const payload = _.pick(values, ["username", "password"]);
      dispatch(signin(payload));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      setCookie("token", token, { path: "/" });
      const user = jwtDecode(token);
      user.roles.map((role) => {
        if (role === "administrator") {
          navigate("/admin/dashboard");
        }

        if (role === "student") {
          navigate('/student/profile')
        }
      });
    }
  }, [token, cookies, setCookie, navigate]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({
        errors,
        touched,
        handleSubmit,
      }) => (
        <>
          <Row>
            <Col md={9}>
              <img src={example} alt={"hero"} width="100%" height="100%" />
            </Col>

            <Col md={3}>
              <div className="form-login">
                <h5>Welcome</h5>

                <FormikForm onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="username">
                    {errorMessage && (
                      <div className="alert alert-danger" role="alert">
                        {errorMessage?.erorrs}
                      </div>
                    )}
                    <Form.Label>Username</Form.Label>
                    <Field
                      type="text"
                      placeholder="Enter username"
                      name="username"
                      className={`form-control ${
                        touched.username && errors.username ? "is-invalid" : ""
                      }`}
                    />
                    <Form.Control.Feedback type="invalid">
                      {touched.username && errors.username && errors.username}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Field
                      type="password"
                      placeholder="Password"
                      name="password"
                      className={`form-control ${
                        touched.password && errors.password ? "is-invalid" : ""
                      }`}
                    />
                    <Form.Control.Feedback type="invalid">
                      {touched.password && errors.password && errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-grid gap-2 sign-button">
                    <Button type="submit" variant="success">
                      Sign In
                    </Button>
                  </div>
                </FormikForm>
              </div>
            </Col>
          </Row>
        </>
      )}
    </Formik>
  );
};

export default SigninPage;
