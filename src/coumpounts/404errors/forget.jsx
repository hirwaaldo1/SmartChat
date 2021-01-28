import React, { useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import "./forget.css";
import "bootstrap/dist/css/bootstrap.css";
import { ArrowBack } from "@material-ui/icons";
import { Formik, Form, Field } from "formik";
import Fade from "react-reveal/Fade";
import { useHistory } from "react-router-dom";
const validateEmail = (value) => {
  let error;

  if (!value) {
    error = <p style={{ color: "red", marginBlockStart: "1px" }}>Required*</p>;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
    error = (
      <p style={{ color: "red", marginBlockStart: "1px" }}>
        Invalid email address*
      </p>
    );
  }

  return error;
};
const ForgetPassword = () => {
  const history = useHistory();
  const { addToast } = useToasts();
  const onSubmit = (values) => {
    fetch("http://localhost:1000/user/forget", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success === false) {
          addToast(json.messages, {
            appearance: "error",
            autoDismiss: true,
          });
        } else if (json.success === true) {
          addToast(json.messages, {
            appearance: "success",
            autoDismiss: true,
          });
        }
      });
  };
  useEffect(() => {
    document.body.style.backgroundColor = "#0984e3";
  });

  return (
    <div>
      <Fade left cascade>
        <nav id="forgotwhole" class="navbar navbar-expand-lg ">
          <div
            id="forgotwhole1"
            onClick={() => {
              history.push("/");
            }}
          >
            <ArrowBack /> Back
          </div>
        </nav>
        <div className="container" id="containerb">
          <h3 id="Reset">
            <b>Reset Password Form</b>
          </h3>
          <div id="pageReset">
            <h3 style={{ fontSize: "35px" }} id="headerone">
              <b>Forgot Password</b>
            </h3>
            <p id="wordsu">
              An email will be sent immediately to your registered email address
              and you can reenter the game immediately
            </p>
            <Formik
              initialValues={{
                email: "",
              }}
              onSubmit={onSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <Field
                    name="email"
                    validate={validateEmail}
                    placeholder=" Your e-mail address"
                    id="emailgg"
                  />
                  <br />
                  {errors.email && touched.email && errors.email}
                  <button type="submit" id="sumbitnnn" className="btn btn">
                    Reset my Password
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Fade>
    </div>
  );
};
export default ForgetPassword;
