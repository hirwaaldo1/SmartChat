import React, { useState } from "react";
import "./loginFour.css";
import Logo from "../formOne/logo.svg";
import LoopIcon from "@material-ui/icons/Loop";
import { Facebook, Twitter, GitHub, Instagram } from "@material-ui/icons";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import { Formik, Form, Field } from "formik";
import { getFromStorage, setInStorage } from "../storoge";
import SubdirectoryArrowRightIcon from "@material-ui/icons/SubdirectoryArrowRight";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import Spin from "react-reveal/Spin";
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
const validateUsername = (value) => {
  let error;
  if (!value) {
    error = <p style={{ color: "red", marginBlockStart: "1px" }}>Required*</p>;
  }
  return error;
};
const validatePassword = (value) => {
  let error;
  if (!value) {
    error = <p style={{ color: "red", marginBlockStart: "1px" }}>Required*</p>;
  }
  return error;
};
if (getFromStorage("login") === null) {
  setInStorage("the_main_app", { userid: "" });
  localStorage.setItem(
    "login",
    JSON.stringify({
      login: false,
    })
  );
}
const userid = getFromStorage("the_main_app").name;
const SignupFour = () => {
  const { addToast } = useToasts();
  // const [errors, setErrors] = useState();
  // const [see, setSee] = useState();
  const history = useHistory();
  const [page, setPage] = useState();
  const onSubmit = (values) => {
    fetch("http://localhost:1000/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          // setSee(true);
          history.push("/");
        } else {
          addToast(json.messages, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
  };
  let obj = getFromStorage("login");
  let obj1 = obj.login;
  if (obj1 === true) {
    history.push(`/Home/:${userid}`);
  }
  const pageChange = () => {
    setPage(Math.floor(Math.random() * 4));
    switch (page) {
      case 1:
        history.push("/logintwo");
        break;
      case 2:
        history.push("/LoginThree");
        break;
      case 3:
        history.push("/LoginFour");
        break;
      case 0:
        history.push("/");
        break;
      default:
        console.log("try again");
        break;
    }
    console.log(page);
  };
  return (
    <div class="container" id="container123">
      <Spin>
        <div class="row">
          <div class="col-2" id="fristdiv">
            <img src={Logo} alt="logo of svg" id="imageoflogo123" />
            <br />
            <span id="title1">Talk.com</span>
            <ul id="listnav">
              <li
                id="PersonPinIcons"
                onClick={() => history.push("/LoginFour")}
              >
                <PersonPinIcon />
                <br />
                LOGIN
              </li>
              <li id="PersonPinIcon11">
                <PersonPinIcon />
                <br />
                SIGN UP
              </li>
              <li id="LoopIcon">
                <LoopIcon onClick={pageChange} /> <br />
                CHANGE
              </li>
            </ul>
          </div>
          <div class="col-5" id="twodiv">
            <div id="allword">
              <h3 id="welcomeW">Welcome to Talk.</h3>
              <p id="wword">
                Chat In Real Time <br /> Made By Hirwa Aldo{" "}
              </p>
            </div>
            <footer id="footer">
              <Facebook id="footer1" />
              <Twitter id="footer1" />
              <GitHub id="footer1" />
              <Instagram id="footer1" />
            </footer>
          </div>
          <div class="col-4" id="threediv">
            <div id="divnav21">
              <p>
                <b id="bold12">Sign up </b> to you account browse through <br />{" "}
                project and explore our tools:
              </p>
              <Formik
                initialValues={{
                  username: "",
                  email: "",
                  password: "",
                }}
                onSubmit={onSubmit}
              >
                {({ errors, touched }) => (
                  <Form>
                    <Field
                      name="username"
                      validate={validateUsername}
                      placeholder="username"
                      id="email11"
                      className="formnnana"
                    />
                    <br />
                    {errors.username && touched.username && errors.username}

                    <Field
                      name="email"
                      validate={validateEmail}
                      placeholder="email"
                      id="email11"
                      className="formnnana"
                    />
                    <br />
                    {errors.email && touched.email && errors.email}

                    <Field
                      name="password"
                      placeholder={`Password`}
                      type="password"
                      validate={validatePassword}
                      id="password11"
                      className="formnnana"
                    />
                    <br />
                    {errors.password && touched.password && errors.password}
                    <br />

                    <button type="submit" id="sumbit1233" className="btn btn">
                      <SubdirectoryArrowRightIcon />
                    </button>
                  </Form>
                )}
              </Formik>
              <div id="undewater">
                <p>
                  have an account?{" "}
                  <b id="signup123" onClick={() => history.push("/LoginFour")}>
                    Sign in
                  </b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Spin>
    </div>
  );
};
export default SignupFour;
