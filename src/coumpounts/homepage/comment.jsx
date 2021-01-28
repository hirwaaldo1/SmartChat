import React, { useEffect,useContext } from "react";
import "./story.css";
import { Close } from "@material-ui/icons";
import Capture from "./Capture.PNG";
import Flash from "react-reveal/Flash";
import { IconButton, Avatar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { getFromStorage } from "../storoge";
import { UserContext } from "../../App";
import axios from "axios";
const userid = getFromStorage("the_main_app").token;
const nameh = getFromStorage("the_main_app").name;
const Comment = () => {
  const history = useHistory();
  const [user] = useContext(UserContext);
  useEffect(() => {
    document.body.style.overflow = "hidden";
  });
  useEffect(() => {
    axios
      .get(
        "http://localhost:1000/user/login/" +
          getFromStorage("the_main_app").userid
      )
  }, [user]);
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
                <p id="wordstory">Comment</p>
              </div>
            </div>
            <p id="Your_Story">All Comment</p>
            <div
              className="row"
              id="lskdm"
              onClick={() => {
                history.push(`/AccountUser/${nameh}`);
              }}
            >
              <div className="col-2">
                <Avatar />
              </div>
              <div className="col-10">
                <p id="Create_a_Story">Create a Story </p>
                <p id="Share_a_photo">50m</p>
              </div>
            </div>
            <div
              className="row"
              id="lskdm"
              onClick={() => {
                history.push(`/AccountUser/${nameh}`);
              }}
            >
              <div className="col-2">
                <Avatar />
              </div>
              <div className="col-10">
                <p id="Create_a_Story">Create a Story </p>
                <p id="Share_a_photo">50m</p>
              </div>
            </div>
            <div
              className="row"
              id="lskdm"
              onClick={() => {
                history.push(`/AccountUser/${nameh}`);
              }}
            >
              <div className="col-2">
                <Avatar />
              </div>
              <div className="col-10">
                <p id="Create_a_Story">Create a Story </p>
                <p id="Share_a_photo">50m</p>
              </div>
            </div>
          </div>
          <div className="col-9" id="seestory">
            <img src={Capture} alt="j,ksda" width="100%" />
          </div>
        </div>
      </Flash>
    </div>
  );
};
export default Comment;
