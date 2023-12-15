/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import  { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import example from "../../../assets/img/example.webp";
import "../styles/FormSign.css";
import { useSelector } from "react-redux";
import { authSelector } from "../../../features/authSlice";

const FormSignin = (props) => {
  const errorMessage = useSelector(authSelector.errorMessage);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  return (
    <div className="row">
      <div className="col-md-9">
        <img src={example} alt={"hero"} width="100%" height="100%" />
      </div>
      <div className="col-md-3">
        <div className="form-login">
          <h5>Welcome</h5>

          <Form
            onSubmit={(e) => {
              e.preventDefault();
              props.onSubmit(formData);
            }}
          >
            <Form.Group className="mb-3" controlId="email">
              {errorMessage ? (
                <div className="alert alert-danger" role="alert">
                  {errorMessage.meta.message}
                </div>
              ) : null}
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                name="email"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ...{ username: e.target.value },
                  })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ...{ password: e.target.value },
                  })
                }
              />
            </Form.Group>

            <div className="d-grid gap-2 sign-button">
              <Button type="sumbit" variant="custome">
                sign in
              </Button>
            </div>
          </Form>
        </div>
        <div className="sign-up">
          <p>
            Don't Have account yet?
            <Link to="/register">
              <strong> Sign Up</strong>{" "}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormSignin;