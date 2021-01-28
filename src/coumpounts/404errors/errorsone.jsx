import React from "react";
import "./errorsone.css";
import Logo from "../formOne/logo.svg";
import Image from "./undraw_page_not_found_su7k.svg";
const Errorone = () => {
  return (
    <div id="wholepage">
      <nav class="navbar navbar-expand-lg ">
        <div class="row" style={{ width: "100%" }}>
          <div class="col-sm-10">
            {" "}
            <div id="wholepage12">
              <img src={Logo} alt="the page not found" id="imageoflogo1" />
              <span>Talk.com</span>
            </div>
          </div>
          <div class="col-sm-2">
            {" "}
            <div id="rightdiv">hirwaaldo1@gmail.com</div>
          </div>
        </div>
      </nav>
      <div className="container" id="inwhole">
        <h3 id="fristh3">404</h3>
        <p id="pagenotfount">Page not found</p>
        <p id="Sorry">
          Sorry,we con't find the page you are looking for <br /> Click
          <b id="here"> here </b>to come back to home page.
        </p>
        <img src={Image} alt="the page nots found" id="imageoflogo1e" />
      </div>
    </div>
  );
};
export default Errorone;
