import React, { useEffect, useState, useContext } from "react";
import HomeIcon from "@material-ui/icons/Home";
import ChatIcon from "@material-ui/icons/Chat";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Logo from "../formOne/logo.svg";
import "./setting.css";
import SearchIcon from "@material-ui/icons/Search";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Switch from "@material-ui/core/Switch";
import Jello from "react-reveal/Jello";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import { getFromStorage,setInStorage } from "../storoge";
import axios from "axios";
const userid = getFromStorage("the_main_app").token;
const iduser=getFromStorage("the_main_app").userid
const nameh = getFromStorage("the_main_app").name;
const Setting = () => {
  const [expanded, setExpanded] = React.useState(false);
  const history = useHistory();
  const [theme,setTheme] = useState(false)
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [email1,setEmail1]=useState()
  const [username1,setUsername1]=useState()
  const [image,setImage] = useState()
  const [password1,setPassword]=useState()
  const [user] = useContext(UserContext);

  const themea = getFromStorage("theme")
  useEffect(() => {
    axios
      .get(
        "http://localhost:1000/user/login/" +
          getFromStorage("the_main_app").userid
      )
      .then((res) => {
        setUsername(res.data.username);
        setEmail(res.data.email);
        setImage(res.data.image)
      });
  }, [user]);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const themeFunction = () =>{
    if(theme === false){
      setTheme(true)
    }else{
      setTheme(false)
    }
    setInStorage('theme',{theme})
  }
  const sdvonSumbit1 = () =>{
      if(username1 ===''){
        setUsername1(username1)
      }
      if(email1 ===''){
      setEmail1(email1)
      }
      if(password1===''){
      setPassword(password1)
  }
  console.log(username1)
const aldo = {
  email:email1,
  username:username1,
  password:password1,
}
axios.post('http://localhost:1000/user/data/update/'+iduser,aldo)
.then(res=>console.log(res.data))
  }
  if (!userid) {
    history.push("/");
    }
  return (
    <div style={{
      background: themea === true ? '#000' : '#fff',
      color: themea === true ? '#fff' : '#000',
    }}>
      <Jello>
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
        <div id="wholedivg" className="col-8">
          <h3 id="GeneralAccount">General Account Settings</h3>
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
              <Typography id="header1a">Name:</Typography>
                <Typography id="header2a">{username}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <p>
                  You can make whatever changes you'd like, like fix spelling
                  <br />
                  mistakes or make annotations. When you close out of it, you'll
                  be asked if you'd like to save your changes to the message.
                </p>
                
                  <input id="emailedits" placeholder="Name"value={username1} onChange={e => setUsername1(e.target.value)} />
                  <br />
                  <button id="editsd" onClick={sdvonSumbit1} className="btn btn">
                    Edit
                  </button>
            
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
              <Typography id="header1a">Email:</Typography>
              <Typography id="header2a">{email}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <p>
                  You can make whatever changes you'd like, like fix spelling
                  <br />
                  mistakes or make annotations. When you close out of it, you'll
                  be asked if you'd like to save your changes to the message.
                </p>
                <form>
                  <input id="emailedits" placeholder="Email"
                  value={email1} onChange={e => setEmail1(e.target.value)} />
                  <br />
                  <button id="editsd"  onClick={sdvonSumbit1} className="btn btn">
                    Edit
                  </button>
                </form>
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
              <Typography id="header1a">Password:</Typography>
              <Typography id="header2a">************</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <p>
                  You can make whatever changes you'd like, like fix spelling
                  <br />
                  mistakes or make annotations. When you close out of it, you'll
                  be asked if you'd like to save your changes to the message.
                </p>
                <form>
                  <input
                    id="emailedits"
                    type="password"
                    placeholder="Password"
                  />
                  <br />
                  <button id="editsd"  className="btn btn">
                    Edit
                  </button>
                </form>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel4"}
            id="boderone"
            onChange={handleChange("panel4")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography id="header1a">Location:</Typography>
              <Typography id="header2a">Kigali</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <p>
                  You can make whatever changes you'd like, like fix spelling
                  <br />
                  mistakes or make annotations. When you close out of it, you'll
                  be asked if you'd like to save your changes to the message.
                </p>
                <form>
                  <input id="emailedits" type="text"   placeholder="Location" />
                  <br />
                  <button id="editsd"  className="btn btn">
                    Edit
                  </button>
                </form>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
        <Grid id="aldogreat" item xs={12} sm={3}>
          <Paper id="padding">
            <p id="Theme">Theme</p>
            <FormControl component="fieldset">
              <FormControlLabel
                value="start"
                control={<Switch color="primary" />}
                label=" Dark mode"
                labelPlacement="start"
                onChange={themeFunction}
              />
            </FormControl>
            <p id="Theme">Notifications</p>
            <FormControl component="fieldset">
              <FormControlLabel
                value="start"
                control={<Switch color="primary" />}
                label="Disble"
                labelPlacement="start"
              />
            </FormControl>
          </Paper>
        </Grid>
        <footer className="page-footer font-small blue">
          <div className="footer-copyright text-center py-3">
            © 2020 Copyright:
            <a href="https://mdbootstrap.com/"> MDBootstrap.com</a>
          </div>
        </footer>
      </Jello>
    </div>
  );
};
export default Setting;
