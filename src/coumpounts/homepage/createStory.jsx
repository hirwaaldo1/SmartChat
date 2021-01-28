import React, { useEffect, useState, useContext } from "react";
import "./createStory.css";
import { Close } from "@material-ui/icons";
import CameraEnhanceIcon from "@material-ui/icons/CameraEnhance";
import Flash from "react-reveal/Flash";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import { getFromStorage } from "../storoge";
import axios from "axios";
import { IconButton, Avatar } from "@material-ui/core";
import TextFieldsIcon from "@material-ui/icons/TextFields";
const userid = getFromStorage("the_main_app").token;
const nameh = getFromStorage("the_main_app").name;
const CreateStory = () => {
  const history = useHistory();
  const [username, setUsername] = useState();
  const [user] = useContext(UserContext);
  useEffect(() => {
    axios
      .get(
        "http://localhost:1000/user/login/" +
          getFromStorage("the_main_app").userid
      )
      .then((res) => {
        setUsername(res.data.username);
      });
  }, [user]);
  useEffect(() => {
    document.body.style.overflow = "hidden";
  });
  if (!userid) {
    history.push("/");
    }
  return (
    <div>
      <Flash>
        <div className="row">
          <div className="col-3" id="borstort">
            <nav id="alldsdnm">
              <IconButton
                id="backgroundcolorsd"
                onClick={() => {
                  history.push(`/home/${nameh}`);
                }}
              >
                <Close />
              </IconButton>
              <IconButton
                onClick={() => {
                  history.push(`/Account/${nameh}`);
                }}
              >
                <Avatar />
              </IconButton>
            </nav>
            <hr id="linehsdl" />
            <div className=" row">
              <div className="col">
                {" "}
                <p id="wordstory">Stories</p>
              </div>
              <div className="col">
                {" "}
                <p
                  id="wordstory22"
                  onClick={() => {
                    history.push(`/setting/${nameh}`);
                  }}
                >
                  Archive.Setting
                </p>
              </div>
            </div>
            <p id="Your_Story">Your CreateStory</p>
            <div className="row" id="lskdm">
              <div className="col-2">
                <Avatar />
              </div>
              <div className="col-10">
                <p id="Create_a_Story">{username} </p>
                <p id="Share_a_photo">Share a photo or write something</p>
              </div>
            </div>
          </div>
          <div className="col-9" id="seestory">
            <div className="row " id="msdosad">
              <div id="sdnjsahdj1">
                <IconButton id="trtyuiqw">
                  <CameraEnhanceIcon />
                </IconButton>{" "}
                Create a Photo Story
              </div>
              <div id="sdnjsahdj2">
                <IconButton id="trtyasduiqw">
                  <TextFieldsIcon />
                </IconButton>
                Create a Text Story
              </div>
            </div>
          </div>
        </div>
      </Flash>
    </div>
  );
};
export default CreateStory;
