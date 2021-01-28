import React, { useEffect, useState, useContext } from "react";
import "./Notifications.css";
import Logo from "../formOne/logo.svg";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import ChatIcon from "@material-ui/icons/Chat";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { useHistory } from "react-router-dom";
import SendIcon from "@material-ui/icons/Send";
import { Avatar } from "@material-ui/core";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import GradeIcon from "@material-ui/icons/Grade";
import axios from "axios";
import { UserContext } from "../../App";
import { getFromStorage } from "../storoge";
const userid = getFromStorage("the_main_app").token;
const nameh = getFromStorage("the_main_app").name;
const Notifications = () => {
  const history = useHistory();
  const [username, setUsername] = useState();
  const [image,setImage]= useState()
  const [user] = useContext(UserContext);
  useEffect(() => {
    axios
      .get(
        "http://localhost:1000/user/login/" +
          getFromStorage("the_main_app").userid
      )
      .then((res) => {
        setUsername(res.data.username);
        setImage(res.data.image)
      });
  }, [user]);
  if (!userid) {
    history.push("/");
    }
  return (
    <div>
      <nav id="homenav123">
        <div className="row" style={{ width: "100%" }}>
          <div className="col-3">
            <div>
              <img src={Logo} alt="home logo" id="homelog" />
              <div id="wholeSeacher">
                <SearchIcon id="iconsSeacher" />
                <input
                  type="text"
                  id="seacherHome"
                  placeholder="Seacher talk"
                />
              </div>
            </div>
          </div>
          <div className="col-6" id="navcentre">
            <div id="iconsc">
              <HomeIcon
                id="HomeIcon1"
                onClick={() => {
                  history.push(`/Home/${nameh}`);
                }}
              />

              <ChatIcon
                id="ChatIcon"
                onClick={() => {
                  history.push(`/Messages/${nameh}`);
                }}
              />

              <SettingsIcon
                id="SettingsIcon"
                onClick={() => {
                  history.push(`/setting/${nameh}`);
                }}
              />
            </div>
          </div>
          <div className="col-3" id="rightnav">
            <div>
              <div
                className="btn btn"
                id="image121"
                onClick={() => {
                  history.push(`/Account/${nameh}`);
                }}
              >
                <img src={image} alt="person" id="person" />
                Hirwa
              </div>
              <NotificationsIcon id="NotificationsIcon1" />
              <ExitToAppIcon id="ExitToAppIcon" />
            </div>
          </div>
        </div>
      </nav>
      <div className="container" id="Notificationswholef">
        <div id="Notificationsfull">
          {/* 
          <Avatar /> post image */}
          <div className="row" style={{ margin: "0", paddingLeft: "16px" }}>
            <div className="col-1" id="SendIconsda">
              <SendIcon id="snuaisd" />
            </div>
            <div className="col-2" id="namedasa">
              {" "}
             {username}
            </div>
            <div className="col-1" id="avatarfas">
              {" "}
              <Avatar src={image} />
            </div>
            <div className="col-8" id="postcimas">
              {" "}
              post image{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="container" id="Notificationswholef">
        <div id="Notificationsfull">
          {/* 
          <Avatar src={image} /> post image */}
          <div className="row" style={{ margin: "0", paddingLeft: "16px" }}>
            <div className="col-1" id="SendIconsda">
              <AddAPhotoIcon id="snuaisd" />
            </div>
            <div className="col-2" id="namedasa">
              {" "}
             {username}
            </div>
            <div className="col-1" id="avatarfas">
              {" "}
              <Avatar src={image} />
            </div>
            <div className="col-8" id="postcimas">
              {" "}
              post image{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="container" id="Notificationswholef">
        <div id="Notificationsfull">
          {/* 
          <Avatar src={image} /> post image */}
          <div className="row" style={{ margin: "0", paddingLeft: "16px" }}>
            <div className="col-1" id="SendIconsda">
              <GradeIcon id="snuaisd" />
            </div>
            <div className="col-2" id="namedasa">
              {" "}
             {username}
            </div>
            <div className="col-1" id="avatarfas">
              {" "}
              <Avatar src={image} />
            </div>
            <div className="col-8" id="postcimas">
              {" "}
              post image{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Notifications;
