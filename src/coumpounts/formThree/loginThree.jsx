import React, { useEffect, useState } from "react";
import Logo from "./undraw_filter_4kje.svg";
import "bootstrap/dist/css/bootstrap.css";
import LoopIcon from "@material-ui/icons/Loop";
import { Formik, Form, Field } from "formik";
import { getFromStorage, setInStorage } from "../storoge";
import "./loginThree.css";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import RubberBand from "react-reveal/RubberBand";
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
const validateUsername = (value) => {
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
const LoginThree = () => {
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
  useEffect(() => {
    document.body.style.backgroundColor = "rgb(235, 235, 235)";
  });

  return (
    <div>
      <RubberBand>
        <div id="container1">
          <div className="row" style={{ margin: "0", height: "80vh" }}>
            <div
              className="col"
              style={{ backgroundColor: "rgba(0, 191, 165,1.0)" }}
              id="divgood"
            >
              <LoopIcon onClick={pageChange} style={{ cursor: "pointer" }} />
              <p id="planyour">
                Plan your activities and control your <br /> progress online
              </p>
              <img src={Logo} alt="aldo svg" id="imageofrok" />
            </div>
            <div className="col" style={{ backgroundColor: "#34495e" }}>
              <div
                className="btn-group float-right btn-group-sm"
                role="group"
                aria-label="Basic example"
                id="groupofbottom"
              >
                <button type="button" className="btn btn" id="button1">
                  Sign Up
                </button>
                <button
                  type="button"
                  className="btn btn"
                  id="button2"
                  onClick={() => history.push("/signupThree")}
                >
                  Sign In
                </button>
              </div>
              <div id="signword">
                <p style={{ color: "#e4e4e465" }}>Sign In or </p>{" "}
                <p id="signword1"> Sign Up</p>
              </div>
              <Formik
                initialValues={{
                  password: "",
                  email: "",
                  name: "",
                }}
                onSubmit={onSubmit}
              >
                {({ errors, touched }) => (
                  <Form id="formofloginthree">
                    <label id="lablethree">
                      Username
                      <Field
                        name="name"
                        validate={validateName}
                        placeholder="name"
                        className="input"
                      />
                    </label>

                    {errors.name && touched.name && errors.name}

                    <label id="lablethree">
                      Your email
                      <Field
                        name="email"
                        validate={validateEmail}
                        placeholder="email"
                        className="input"
                      />
                    </label>

                    {errors.email && touched.email && errors.email}
                    <label id="lablethree">
                      Passwords
                      <Field
                        name="password"
                        type="password"
                        placeholder="Password"
                        validate={validateUsername}
                        className="input"
                      />
                    </label>

                    {errors.password && touched.password && errors.password}
                    <div className="col-6 col-sm-6">
                      <div className="switch">
                        <label>
                          <input type="checkbox" id="checkbox" />
                          <span className="lever"></span> Remember Me
                        </label>
                      </div>
                    </div>
                    <div className="col-6 col-sm-6">
                      <button type="submit" id="sumbitone1" className="btn btn">
                        Submit
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </RubberBand>
    </div>
  );
};
export default LoginThree;
