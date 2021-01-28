import React, { useState, useContext } from "react";
import "./loginFour.css";
import Logo from "../formOne/logo.svg";
import LoopIcon from "@material-ui/icons/Loop";
import { Facebook, Twitter, GitHub, Instagram } from "@material-ui/icons";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import { Formik, Form, Field } from "formik";
import SubdirectoryArrowRightIcon from "@material-ui/icons/SubdirectoryArrowRight";
import { useHistory } from "react-router-dom";
import Flash from "react-reveal/Flash";
import { UserContext } from "../../App";
import { useToasts } from "react-toast-notifications";
import { getFromStorage, setInStorage } from "../storoge";
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
  if (value === "admin") {
    error = "Nice try!";
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
const LoginFour = () => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [showremb, setShowremb] = useState(true);
  const { addToast } = useToasts();
  const [user, setUser] = useContext(UserContext);
  const [page, setPage] = useState();
  const onSubmit = (values) => {
    fetch("http://localhost:1000/user/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (!json.success) {
          setInStorage("the_main_app", {
            token: json.accesstoken,
            name: json.username,
            userid: json.id,
          });
        } else {
          addToast(json.messages, {
            appearance: "error",
            autoDismiss: true,
          });
        }
        if (json.accesstoken) {
          setUser({
            accesstoken: json.accesstoken,
          });
          history.push(`/home/:${json.username}`);
          if (showremb === true) {
            fetch("http://localhost:1000/user/signin", {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email2: values.email,
                password2: values.password,
              }),
            })
              .then((res) => res.json())
              .then((json) => {
                localStorage.setItem(
                  "login",
                  JSON.stringify({
                    login: true,
                    token: json.accesstoken,
                  })
                );
              });
          }
        } else {
          addToast(json.messages, {
            appearance: "error",
            autoDismiss: true,
          });
          setShow(false);
          setShowremb(true);
          console.log(user, show);
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
      <Flash>
        <div class="row">
          <div class="col-2" id="fristdiv">
            <img src={Logo} alt="logo of svg" id="imageoflogo123" />
            <br />
            <span id="title1">Talk.com</span>
            <ul id="listnav">
              <li id="PersonPinIcon">
                <PersonPinIcon />
                <br />
                LOGIN
              </li>
              <li
                id="PersonPinIcon1"
                onClick={() => history.push("/signupFour")}
              >
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
                <b id="bold12">Login </b> to you account browse through <br />{" "}
                project and explore our tools:
              </p>
              <Formik
                initialValues={{
                  password: "",
                  email: "",
                }}
                onSubmit={onSubmit}
              >
                {({ errors, touched }) => (
                  <Form>
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
                      type="password"
                      placeholder={`Password`}
                      validate={validateUsername}
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
                  Don't have an account?{" "}
                  <b id="signup123" onClick={() => history.push("/signupFour")}>
                    Sign up
                  </b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Flash>
    </div>
  );
};
export default LoginFour;
