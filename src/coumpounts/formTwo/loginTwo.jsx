import React, { useEffect, useState, useContext } from "react";
import Logo from "../formOne/logo.svg";

import LoopIcon from "@material-ui/icons/Loop";
import "bootstrap/dist/css/bootstrap.css";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import { useToasts } from "react-toast-notifications";
import { getFromStorage, setInStorage } from "../storoge";
import "./loginTwo.css";
import Zoom from "react-reveal/Zoom";
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
const LoginTwo = () => {
  const [email, setEmail] = useState();
  const [show, setShow] = useState(false);
  const [showremb, setShowremb] = useState(true);
  const [password, setPassword] = useState();
  const { addToast } = useToasts();
  const [user, setUser] = useContext(UserContext);
  const history = useHistory();
  const { handleSubmit, register, errors } = useForm();
  const [page, setPage] = useState();

  const onSubmit = (values) => console.log(values);
  useEffect(() => {
    document.body.style.backgroundColor = "white";
  });
  const submitHomepage = () => {
    fetch("http://localhost:1000/user/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
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
                email2: email,
                password2: password,
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
    <div>
      <Zoom top cascade>
        <div className="container" id="container">
          <div className="row">
            <div
              className="col-6 col-sm-5"
              id="aldo"
              style={{ backgroundColor: "#55efc4" }}
            >
              <div
                id="aldo1"
                className="col-9"
                style={{ backgroundColor: "#55efc4", textAlign: "center" }}
              >
                <div id="divone">
                  <img src={Logo} id="imageoflogo" alt="svg logo" />
                  <h3>Talk.com</h3>
                  <p id="paragragh">
                    Mode in Rwanda by Hirwa Aldo <br />
                    Hello, Friend!{" "}
                  </p>
                </div>
                <LoopIcon onClick={pageChange} style={{ cursor: "pointer" }} />
              </div>
            </div>
            <div
              className="col-6 col-sm-7"
              style={{ backgroundColor: "white" }}
              id="aldo"
            >
              <div
                className="col-9"
                id="aldo2"
                style={{ backgroundColor: "white" }}
              >
                <p id="need" onClick={() => history.push("/signupTwo")}>
                  Sign up?
                </p>
                <p id="login1">
                  <b>Log in</b>
                </p>
                <form id="formwords1" onSubmit={handleSubmit(onSubmit)}>
                  <label>
                    <b>Email</b>
                  </label>
                  <br />
                  <input
                    name="email"
                    id="email1"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    ref={register({
                      required: (
                        <p style={{ color: "red", marginBlockStart: "1px" }}>
                          Required*
                        </p>
                      ),
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: (
                          <p style={{ color: "red", marginBlockStart: "1px" }}>
                            Invalid email address*
                          </p>
                        ),
                      },
                    })}
                  />
                  <br />
                  {errors.email && errors.email.message}
                  <br />
                  <label>
                    <b>Password</b>
                  </label>
                  <br />
                  <input
                    id="password1"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    type="password"
                    name="password"
                    ref={register({
                      required: (
                        <p style={{ color: "red", marginBlockStart: "1px" }}>
                          Required*
                        </p>
                      ),
                    })}
                  />
                  <br />
                  {errors.password && errors.password.message}
                  <br />

                  <button
                    type="submit"
                    id="sumbit4"
                    onClick={submitHomepage}
                    className="btn btn"
                  >
                    Submit
                  </button>
                </form>
                <p id="forgot1">forgot password?</p>
              </div>
            </div>
          </div>
        </div>
      </Zoom>
    </div>
  );
};
export default LoginTwo;
