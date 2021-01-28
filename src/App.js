import React, { useState, useEffect } from "react";
import { ToastProvider } from "react-toast-notifications";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Login from "./coumpounts/formOne/login";
import Signup from "./coumpounts/formOne/signup";
import LoginTwo from "./coumpounts/formTwo/loginTwo";
import SignupTwo from "./coumpounts/formTwo/signuptwo";
import LoginThree from "./coumpounts/formThree/loginThree";
import LoginThreeg from "./coumpounts/formThree/signin";
import LoginFour from "./coumpounts/formFour/loginFour";
import SignupFour from "./coumpounts/formFour/signupFour";
import ErrorOne from "./coumpounts/404errors/errorsone";
import Forget from "./coumpounts/404errors/forget";
import Homepage from "./coumpounts/homepage/home";
import Messages from "./coumpounts/homepage/messages";
import Setting from "./coumpounts/homepage/setting";
import Account from "./coumpounts/homepage/account";
import Story from "./coumpounts/homepage/story";
import Notifications from "./coumpounts/homepage/Notifications";
import CreateStory from "./coumpounts/homepage/createStory";
import Accounuser from "./coumpounts/homepage/accountuser";
import Comment from "./coumpounts/homepage/comment";
export const UserContext = React.createContext([]);
function App() {
  const [user, setUser] = useState({});
  // const logOutCallback = async () => {
  //   await fetch("http://localhost:1000/users/logout", {
  //     method: "POST",
  //     credentials: "include",
  //   });
  //   setUser({});
  // };
  useEffect(() => {
    async function checkRefreshToken() {
      const result = await (
        await fetch("http://localhost:1000/user/refresh_token", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json();
      setUser({
        accesstoken: result.accesstoken,
      });
    }
    checkRefreshToken();
  }, []);
  return (
    <ToastProvider>
      <UserContext.Provider value={[user, setUser]}>
        <Router>
          <Switch>
            <Route exact path="/" component={Login}></Route>
            <Route exact path="/SignupOne" component={Signup}></Route>
            <Route exact path="/logintwo" component={LoginTwo}></Route>
            <Route exact path="/signupTwo" component={SignupTwo}></Route>
            <Route exact path="/LoginThree" component={LoginThree}></Route>
            <Route exact path="/signupThree" component={LoginThreeg}></Route>
            <Route exact path="/LoginFour" component={LoginFour}></Route>
            <Route exact path="/signupFour" component={SignupFour}></Route>
            <Route exact path="/Forget" component={Forget}></Route>
            <Route exact path="/Home/:id" component={Homepage}></Route>
            <Route exact path="/Messages/:id" component={Messages}></Route>
            <Route exact path="/setting/:id" component={Setting}></Route>
            <Route exact path="/Account/:id" component={Account}></Route>
            <Route exact path="/story/:id" component={Story}></Route>
            <Route
              exact
              path="/Notifications/:id"
              component={Notifications}
            ></Route>
            <Route exact path="/CreateStory/:id" component={CreateStory}></Route>
            <Route exact  path="/userpost/:id/:name" component={Accounuser}></Route>
            <Route exact path="/Comment/:id" component={Comment}></Route>
            <Route exact path="/404" component={ErrorOne}></Route>
            <Redirect to="/404" />
          </Switch>
        </Router>
      </UserContext.Provider>
    </ToastProvider>
  );
}

export default App;
