import React, { useState } from "react";
import Logo from "./logo.svg";
import { Facebook, Twitter, GitHub } from "@material-ui/icons";
import "./login.css";
import { Formik, Form, Field } from "formik";
import { useHistory } from "react-router-dom";
import Roll from "react-reveal/Roll";
import { getFromStorage, setInStorage } from "../storoge";
import { useToasts } from "react-toast-notifications";
import LoopIcon from "@material-ui/icons/Loop";
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
const validateName = (value) => {
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
const Signup = () => {
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
    <div>
      <Roll top>
        <div className="align-items-center" id="divform">
          <div className="row" id="divformtype">
            <div className="col-sm-7" id="divform2">
              <div id="logodiv">
                <img
                  src={Logo}
                  className="rounded float-left"
                  id="logoform"
                  width="35px"
                  alt="svg logo"
                />
                <span>Talk.com</span>
              </div>
              <h3 id="signintotalk">Sign up to Talk.com</h3>
              <div id="iconsfrom">
                <div id="icons">
                  <Facebook />
                </div>
                <div id="icons">
                  <Twitter />
                </div>
                <div id="icons">
                  <GitHub />
                </div>
                <div id="icons">
                  <LoopIcon
                    style={{ cursor: "pointer" }}
                    onClick={pageChange}
                  />
                </div>
                <p id="formwords">or use your email account</p>
                <div>
                  <Formik
                    initialValues={{
                      password: "",
                      email: "",
                      username: "",
                    }}
                    onSubmit={onSubmit}
                  >
                    {({ errors, touched }) => (
                      <Form>
                        <Field
                          name="username"
                          validate={validateName}
                          placeholder="username"
                          id="name"
                          className="formnnana"
                        />
                        <br />
                        {errors.username && touched.username && errors.username}

                        <Field
                          name="email"
                          type="email"
                          validate={validateEmail}
                          placeholder="email"
                          id="email"
                          className="formnnana"
                        />
                        <br />
                        {errors.email && touched.email && errors.email}

                        <Field
                          name="password"
                          type="password"
                          placeholder={`Password`}
                          className="formnnana"
                          validate={validatePassword}
                          id="password"
                        />
                        <br />
                        {errors.password && touched.password && errors.password}
                        <br />

                        <p id="forgotone">Forgot your password?</p>
                        <hr id="underline" />
                        <button
                          type="submit"
                          id="sumbitone"
                          className="btn btn"
                        >
                          Submit
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
            <div
              className="col-sm-5"
              style={{ backgroundColor: "#38ada9", color: "white" }}
              id="divform1"
            >
              <p id="Hello">
                <b>Hello, Friend!</b>
              </p>
              <p id="Enteryour">
                Enter your person details <br /> and start joumey with us
              </p>
              <button
                type="submit"
                id="sumbit1"
                onClick={() => history.push("/")}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </Roll>
    </div>
  );
};
export default Signup;
