import React, { useEffect, useState, useContext } from "react";
import "./messages.css";
import { Avatar } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { UserContext } from "../../App";
import { getFromStorage } from "../storoge";
import { useHistory } from "react-router-dom";

import axios from "axios";
const userid = getFromStorage("the_main_app").token;
const nameh = getFromStorage("the_main_app").name;
const Chat = () => {
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
  if (!userid) {
    history.push("/");
    }
  return (
    <div className="Chat">
      <div className="chat_header">
        <Avatar />
        <div
          className="chat-headerInfo"
          style={{ cursor: "pointer" }}
          onClick={() => {
            history.push(`/Account/${nameh}`);
          }}
        >
          <h5>Room name</h5>
          <p>Last seen at....</p>
        </div>
      </div>
      <div className="chat__body">
        <p className="chat__messae">
          <span className="chat__name">{username}</span>
          This the messages
          <span className="chat__timestamp">{new Date().toUTCString()}</span>
        </p>
        <p className="chat__messae">
          <span className="chat__name">{username}</span>
          This the messages
          <span className="chat__timestamp">{new Date().toUTCString()}</span>
        </p>
        <p className="chat__messae chat__sender">
          <span className="chat__name">aldo</span>
          This the messages
          <span className="chat__timestamp">{new Date().toUTCString()}</span>
        </p>
      </div>
      <div className="chat__footer">
        <form>
          <input placeholder="Type a message" type="text" />
        </form>
        <button type="submit" id="SendIcon123d">
          <SendIcon id="SendIcon123" />
        </button>
      </div>
    </div>
  );
};
export default Chat;
