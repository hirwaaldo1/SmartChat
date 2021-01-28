import React, { useEffect } from "react";
import "./story.css";
import { Close } from "@material-ui/icons";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import Capture from "./Capture.PNG";
import { useHistory } from "react-router-dom";
import Flash from "react-reveal/Flash";
import { IconButton, Avatar } from "@material-ui/core";
const Story = () => {
  const history = useHistory();
  useEffect(() => {
    document.body.style.overflow = "hidden";
  });
  return (
    <div>
      <Flash>
        <div className="row">
          <div className="col-3" id="borstort">
            <nav id="alldsdnm">
              <IconButton
                id="backgroundcolorsd"
                onClick={() => {
                  history.push("/home");
                }}
              >
                <Close />
              </IconButton>
              <IconButton
                onClick={() => {
                  history.push("/Acount");
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
                    history.push("/setting");
                  }}
                >
                  Archive.Setting
                </p>
              </div>
            </div>
            <p id="Your_Story">Your Story</p>
            <div className="row" id="lskdm">
              <div className="col-2">
                <Avatar />
              </div>
              <div
                className="col-10"
                onClick={() => {
                  history.push("/CreateStory");
                }}
              >
                <p id="Create_a_Story">Create a Story </p>
                <p id="Share_a_photo">Share a photo or write something</p>
              </div>
            </div>
            <p id="Your_Story">All Stories</p>
            <div className="row" id="lskdm">
              <div className="col-2">
                <Avatar />
              </div>
              <div
                className="col-10"
                onClick={() => {
                  history.push("/AccountUser");
                }}
              >
                <p id="Create_a_Story">Create a Story </p>
                <p id="Share_a_photo">50m</p>
              </div>
            </div>
            <div className="row" id="lskdm">
              <div className="col-2">
                <Avatar />
              </div>
              <div
                className="col-10"
                onClick={() => {
                  history.push("/AccountUser");
                }}
              >
                <p id="Create_a_Story">Create a Story </p>
                <p id="Share_a_photo">50m</p>
              </div>
            </div>
            <div className="row" id="lskdm">
              <div className="col-2">
                <Avatar />
              </div>
              <div
                className="col-10"
                onClick={() => {
                  history.push("/AccountUser");
                }}
              >
                <p id="Create_a_Story">Create a Story </p>
                <p id="Share_a_photo">50m</p>
              </div>
            </div>
          </div>
          <div className="col-9" id="seestory">
            <img src={Capture} alt="j,ksda" width="100%" />
            <IconButton id="Navigate1">
              <NavigateBeforeIcon />
            </IconButton>
            <IconButton id="Navigate2">
              <NavigateNextIcon />
            </IconButton>
          </div>
        </div>
      </Flash>
    </div>
  );
};
export default Story;
