import React, { useState, useContext } from "react";
import Logo from "./logo.svg";
import { Facebook, Twitter, GitHub } from "@material-ui/icons";
import "./login.css";
import Bounce from "react-reveal/Bounce";
import FacebookLogin from "react-facebook-login"
import { Formik, Form, Field } from "formik";
import LoopIcon from "@material-ui/icons/Loop";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../App";
// import axios from 'axios'
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
const Login = () => {
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
  const facebookFunction =(res) =>{

      fetch("http://localhost:1000/user/facebookLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: res.name,
          email: res.email,
          password:res.accessToken,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          setInStorage("the_main_app", {
            token: json.accesstoken,
            name: json.username,
            userid: json.id,
          });
          localStorage.setItem(
            "login",
            JSON.stringify({
              login: true,
              token: json.accesstoken,
            })
          );
          history.push(`/home/:${json.username}`)
        });



    
  }
  const githubApis =() =>{
   history.push('https://github.com/login/oauth/authorize?client_id=827f7914e8d2bfd6bb89')
  }
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
      <Bounce top>
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
              <h3 id="signintotalk">Sign in to Talk.com</h3>
              <div id="iconsfrom">
                <div id="icons">
                <FacebookLogin
          appId="227276745186069"
          autoLoad={true}
          fields="name,email,picture"
          cssClass="kep-login-facebook kep-login-facebook-[button-size]"
          callback={facebookFunction}
          textButton={<Facebook/>}
          // callback={this.responseFacebook}
        />
                </div>
                <div id="icons">
                  <Twitter />
                </div>
                <div id="icons">
                  <GitHub  onClick={githubApis}/>
                </div>
                <div id="icons">
                  <LoopIcon
                    style={{ cursor: "pointer" }}
                    onClick={pageChange}
                  />
                </div>
                <p id="formwords">but if you have account:</p>
                <div>
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
                          id="email"
                          className="formnnana"
                        />
                        <br />
                        {errors.email && touched.email && errors.email}

                        <Field
                          name="password"
                          type="password"
                          placeholder={`Password`}
                          validate={validatePassword}
                          id="password"
                          className="formnnana"
                        />
                        <br />
                        {errors.password && touched.password && errors.password}
                        <br />

                        <p id="forgot">Forgot your password?</p>
                        <hr id="underline" />
                        <button type="submit" id="sumbit" className="btn btn">
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
                onClick={() => history.push("/SignupOne")}
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </Bounce>
    </div>
  );
};
export default Login;
