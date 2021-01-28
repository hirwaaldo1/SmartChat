import React, { useEffect, useState, useContext } from "react";
import "./messages.css";

import { useHistory } from "react-router-dom";
import { getFromStorage } from "../storoge";
import axios from "axios";
import { UserContext } from "../../App";
import { DonutLarge, ChatBubble } from "@material-ui/icons";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar, IconButton } from "@material-ui/core";
const Sidebar = () => {
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
  return (
    <div className="Sidebar">
      <div className="Sidebar_header">
        <Avatar
          src={image}
          onClick={() => {
            history.push("/Account");
          }}
          style={{ cursor: "pointer" }}
        />
        <div className="iconsbuttoms">
          <IconButton
            onClick={() => {
              history.push("/story");
            }}
          >
            {" "}
            <DonutLarge />
          </IconButton>
          <IconButton>
            {" "}
            <ChatBubble />
          </IconButton>
        </div>
      </div>
      <div id="wholeSeacher1">
        <SearchIcon id="iconsSeacher" />
        <input type="text" id="seacherHome1" placeholder="Seacher talk" />
      </div>
      <div id="chatsds">
        <div className="sidebarchat">
          <Avatar/>
          <div className="sidebarchatinfo">
            <h5>Room name</h5>
            <p>This is the last messange</p>
          </div>
        </div>
        <div className="sidebarchat">
          <Avatar />
          <div className="sidebarchatinfo">
            <h5>Room name</h5>
            <p>This is the last messange</p>
          </div>
        </div>
        <div className="sidebarchat">
          <Avatar />
          <div className="sidebarchatinfo">
            <h5>Room name</h5>
            <p>This is the last messange</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
