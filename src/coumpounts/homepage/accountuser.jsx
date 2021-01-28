import React, { useState,useEffect,useContext } from 'react'
import "./account.css";
import Logo from "../formOne/logo.svg";

import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import ChatIcon from "@material-ui/icons/Chat";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Avatar } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import NotificationsIcon from "@material-ui/icons/Notifications";
import RubberBand from "react-reveal/RubberBand";
import { useHistory } from "react-router-dom";
import { getFromStorage } from "../storoge";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import axios from 'axios'
import {UserContext} from '../../App'
const nameh = getFromStorage("the_main_app").name;
const Accountuser = () => {
  const [expanded, setExpanded] = React.useState(false);
  const history = useHistory();
  const [iduser]=useState(getFromStorage('users').user)
  const [username,setUsername]=useState()
  const [username1,setUsername1]=useState()
  const [email,setEmail]=useState()
  const [image,setImage]=useState()
  const [post,setPost]=useState([])
  // const [hirwa,setHirwa]=useState()
  const [user]=useContext(UserContext)
  useEffect(() => {
    axios.get('http://localhost:1000/user/login/'+iduser)
    .then(res =>{
    setEmail(res.data.email)
    setUsername(res.data.username)
    setImage(res.data.image)
    setPost(res.data.post)
    // setHirwa(res.data.post)
    // setFollowing(res.data.followers)
    // setFollowing(res.data.following)
    })
    return () => {
    console.log('clean')
    }
}, [user,iduser])
useEffect(() => {
  axios
    .get(
      "http://localhost:1000/user/login/" +
        getFromStorage("the_main_app").userid
    )
    .then((res) => {
      setUsername1(res.data.image)
    });
}, [user]);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div>
      <RubberBand>
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
                    history.push(`/home/${nameh}`);
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
                  <img src={username1} alt="person" id="person" />
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

        <div className="col-12 container" id="containerAccont">
          <div id="backgroundimage">
            <img src={image} id="backgroundimage123" alt="backgroundimage" />

            <Avatar src={image} id="AvatarI" />
          </div>
          <div className=" container" id="aldosjad">
            <p id="nameod">{username}</p>
            <hr />
            <div className="About">About</div>
            <div className="Friends">Friends</div>
            <div id="Photos">Photos</div>
          </div>
        </div>

        <div className="container" id="allnavsa">
          <div className="row">
            <div className="col-3" id="Aboutdiv">
              <p id="headerAbout">About</p>
              <Accordion
                expanded={expanded === "panel1"}
                id="boderone"
                onChange={handleChange("panel1")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography id="header1a">Name</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <p id="oaoaoaa">{username}</p>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel2"}
                id="boderone"
                onChange={handleChange("panel2")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography id="header1a">Emali</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                <p id="oaoaoaa">{email}</p>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel3"}
                id="boderone"
                onChange={handleChange("panel3")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography id="header1a">Location</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <p id="oaoaoaa">Kigali</p>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
            <div className="col-6" id="Photesdiv">
              <p id="headerAbout">Photos</p>
                      
            <GridList cellHeight={160}  cols={3} className="nsidcx">
  {post.map((post12) => {
    return <GridListTile className="gridList" key={post12} cols={post12}>
      <img src={post12} style={{width:"100%"}} alt={post12} />
    </GridListTile>
})}
</GridList>
            </div>
            <div className="col-3" id="Friendsdiv">
              <p id="headerAbout">Friends</p>
              <div className="row" id="nasdjl">
                <div className="col-2">
                  <Avatar id="imagepost1" />
                </div>
                <div className="col-10">
                  <p id="nameof">Hirwa aldo</p>
                </div>
              </div>
              <div className="row" id="nasdjl">
                <div className="col-2">
                  <Avatar id="imagepost1" />
                </div>
                <div className="col-10">
                  <p id="nameof">Hirwa aldo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RubberBand>
    </div>
  );
};
export default Accountuser;
