import React, { useEffect, useState } from "react";
import Logo from "../formOne/logo.svg";
import "bootstrap/dist/css/bootstrap.css";
import LoopIcon from "@material-ui/icons/Loop";
import Flip from "react-reveal/Flip";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";
import "./loginTwo.css";
const SignupTwo = () => {
  const history = useHistory();
  const [username, setUsername] = useState();
  const { addToast } = useToasts();
  const [page, setPage] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const onSubmit = (values) => console.log(values);
  const validitionfromDb = () => {
    fetch("http://localhost:1000/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setEmail();
          setUsername();
          setPassword();
          // setSee(true);
          history.push("/");
        } else {
          // setErrors(json.messages);
          // setSee(false);
          addToast(json.messages, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
  };
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
  const { handleSubmit, register, errors } = useForm();
  useEffect(() => {
    document.body.style.backgroundColor = "white";
  });
  return (
    <div>
      <Flip top cascade>
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
                <p id="need" onClick={() => history.push("/logintwo")}>
                  Login?
                </p>
                <p id="login1">
                  <b>Sign up</b>
                </p>
                <form id="formwords1" onSubmit={handleSubmit(onSubmit)}>
                  <label>
                    <b>Username</b>
                  </label>
                  <br />
                  <input
                    id="password1"
                    placeholder="Password"
                    onChange={(e) => setUsername(e.target.value)}
                    name="username"
                    ref={register({
                      required: (
                        <p style={{ color: "red", marginBlockStart: "1px" }}>
                          Required*
                        </p>
                      ),
                    })}
                  />
                  <br />
                  {errors.username && errors.username.message}
                  <br />
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
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    name="username"
                    ref={register({
                      required: (
                        <p style={{ color: "red", marginBlockStart: "1px" }}>
                          Required*
                        </p>
                      ),
                    })}
                  />
                  <br />
                  {errors.username && errors.username.message}
                  <br />

                  <button
                    type="submit"
                    id="sumbit4"
                    onClick={validitionfromDb}
                    className="btn btn"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Flip>
    </div>
  );
};
export default SignupTwo;
