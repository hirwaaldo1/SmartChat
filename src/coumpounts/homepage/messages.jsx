import React, { useEffect, useState, useContext } from "react";
import "./messages.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import Logo from "../formOne/logo.svg";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import ChatIcon from "@material-ui/icons/Chat";
import { UserContext } from "../../App";
import axios from "axios";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { getFromStorage } from "../storoge";
import { useHistory } from "react-router-dom";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Zoom from "react-reveal/Zoom";
import Rotate from "react-reveal/Rotate";
const userid = getFromStorage("the_main_app").token;
const nameh = getFromStorage("the_main_app").name;
const Message = () => {
  const history = useHistory();
  const [user] = useContext(UserContext);
  const [image,setImage] = useState()
  useEffect(() => {
    axios
      .get(
        "http://localhost:1000/user/login/" +
          getFromStorage("the_main_app").userid
      )
      .then((res) => {
        setImage(res.data.image)

      });
  }, [user]);
  if (!userid) {
    history.push("/");
    }
  return (
    <div>
      <Rotate bottom right>
        <nav id="homenav">
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
                    history.push(`/home/${nameh}`);
                  }}
                />

                <ChatIcon id="ChatIcon1" />

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
                <NotificationsIcon
                  id="NotificationsIcon"
                  onClick={() => {
                    history.push(`/Notifications/${nameh}`);
                  }}
                />
                <ExitToAppIcon id="ExitToAppIcon" />
              </div>
            </div>
          </div>
        </nav>
      </Rotate>
      <Zoom bottom>
        <div className="App">
          <div className="app__boby">
            <Sidebar />
            <Chat />
          </div>
        </div>
      </Zoom>
    </div>
  );
};
export default Message;
