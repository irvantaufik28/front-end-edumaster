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
          navigate("/student/profile");
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
      {({ errors, touched, handleSubmit }) => (
        <>
          <div className="container">
            {/* Outer Row */}
            <div className="row justify-content-center">
              <div className="col-xl-10 col-lg-12 col-md-9">
                <div className="card o-hidden border-0 shadow-lg my-5">
                  <div className="card-body p-0">
                    {/* Nested Row within Card Body */}
                    <div className="row">
                      <div className="col-lg-6 d-none d-lg-block bg-login-image" />
                      <div className="col-lg-6">
                        <div className="p-5">
                          <div className="text-center">
                            <h1 className="h4 text-gray-900 mb-4">
                              Welcome Back!
                            </h1>
                          </div>
                          <FormikForm onSubmit={handleSubmit} className="user">
                            <Form.Group
                              className="form-group"
                              controlId="username"
                            >
                              {errorMessage && (
                                <div
                                  className="alert alert-danger"
                                  role="alert"
                                >
                                  {errorMessage?.errors}
                                </div>
                              )}
                              <Field
                                type="text"
                                id="exampleInputEmail"
                                aria-describedby="emailHelp"
                                placeholder="Enter Email Address..."
                                name="username"
                                className={`form-control form-control-user ${
                                  touched.username && errors.username
                                    ? "is-invalid"
                                    : ""
                                }`}
                              />
                              <Form.Control.Feedback type="invalid">
                                {touched.username &&
                                  errors.username &&
                                  errors.username}
                              </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group
                              className="form-group"
                              controlId="password"
                            >
                              <Field
                                type="password"
                                name="password"
                                placeholder="Password"
                                className={`form-control form-control-user ${
                                  touched.password && errors.password
                                    ? "is-invalid"
                                    : ""
                                }`}
                              />
                              <Form.Control.Feedback type="invalid">
                                {touched.password &&
                                  errors.password &&
                                  errors.password}
                              </Form.Control.Feedback>
                            </Form.Group>
                            <div className="form-group">
                              <div className="custom-control custom-checkbox small">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="customCheck"
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="customCheck"
                                >
                                  Remember Me
                                </label>
                              </div>
                            </div>
                            <button className="btn btn-primary btn-user btn-block">
                              Login
                            </button>
                            <hr />
                            <a
                              href="index.html"
                              className="btn btn-google btn-user btn-block"
                            >
                              <i className="fab fa-google fa-fw" /> Login with
                              Google
                            </a>
                            <a
                              href="index.html"
                              className="btn btn-facebook btn-user btn-block"
                            >
                              <i className="fab fa-facebook-f fa-fw" /> Login
                              with Facebook
                            </a>
                          </FormikForm>
                          <hr />
                          <div className="text-center">
                            <a className="small" href="forgot-password.html">
                              Forgot Password?
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Formik>
  );
};

export default SigninPage;
