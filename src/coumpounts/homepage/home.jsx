import React, { useEffect, useState, useContext } from "react";
import "./home.css";
import Capture from "./Capture.PNG";
import Logo from "../formOne/logo.svg";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import ChatIcon from "@material-ui/icons/Chat";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import CommentIcon from "@material-ui/icons/Comment";
import SendIcon from "@material-ui/icons/Send";
import Bounce from "react-reveal/Bounce";
import { useHistory } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import axios from "axios";
import { Avatar } from "@material-ui/core";
import { UserContext } from "../../App";
import { getFromStorage,setInStorage } from "../storoge";
const userid = getFromStorage("the_main_app").token;
const nameh = getFromStorage("the_main_app").name;
const Home = () => {
  const history = useHistory();
  const [username, setUsername] = useState();
  const [image,setImage]=useState()
  const iduser=getFromStorage("the_main_app").userid
  const [news, setNews] = useState([]);
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
      axios.get('http://localhost:1000/user/suggestion/'+iduser)
      .then(res =>{
          setNews(res.data)
      })
      
  }, [iduser,user]);
  let Usersuggetion = props => {
    let { username} = props;
    let {image} =props
    let {_id}=props
  
    return (
      <>
       
       <div
                className="row"
                id="nasdjl"
                style={{ padding: "0", margin: "12px" }}
                onClick={() => {
                  history.push(`/userpost/${nameh}/:`+username);
                  setInStorage('users',{user:_id})
                }}
              >
                <div className="col-2">
                  <img src={image} alt="you" id="imagepost1" />
                </div>
                <div className="col-7">
              <p id="nameof">{username}</p>
                </div>
                <div className="col-3" id="buttonofungf">
                  <button onClick={()=>{Usertest(props)}} className="btn btn" id="buttonasdsc">
                    follow
                  </button>
                </div>
              </div>

{/* <span className="dot8"
onClick={()=>(history.push(`/userpost/${_id}/
:`+tokenuser)
,setInStorage('users',{user:_id}))}> 
 <img src={image} id="image88"/> <p
  className="Your9">
 {username}<br /><p id="down">{email}</p></p>
 </span><p id="follow" 
onClick={()=>{Usertest(props)}}>Follow</p> */}

      </>
    );
  }; 
  let Usertest =props=>{
    let { email} = props;
    const aldo={
      following:props._id,
      email:email
    }
    console.log(aldo,email)
    axios.post(`http://localhost:1000/user/login/follow-user/${iduser}`,aldo)
    .then(res=>console.log(res.data))
    console.log(aldo)
  }
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  if (!userid) {
    history.push("/");
    }
  // if (!user.accesstoken) {
  //   history.push("/");
  // } else {
    return (
      <div style={{ fontFamily: "Helvetica" }}>
        <Bounce top>
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
                  <HomeIcon id="HomeIcon" />

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
                    Profile
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
        </Bounce>
        <div className="row" id="alldivsa">
          <Bounce left>
            <div className="col-3" id="left1">
              <div
                id="profilewhole"
                onClick={() => {
                  history.push(`/Account/${nameh}`);
                }}
              >
                <img src={image} alt="Capture" id="Capture" />
                <div id="profileinto">
                  <img src={image} alt="imageksd" id="imagecyr" />
                  <p id="nameofuser">{username}</p>
                  <div className="row">
                    <div className="col" id="follower">
                      0 Following
                    </div>
                    <div className="col" id="follower1">
                      0 Followers
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <p id="wordSponsored">Sponsored</p>
                <div className="row" id="wholeSponsored">
                  <div className="col" id="Sponsored">
                    <img src={Capture} alt="showtime" id="showtime" />
                  </div>
                  <div className="col" id="Sponsored1">
                    <p id="nana">Up To 54% OFF</p>
                    <span id="nana1">Newchic.com</span>
                  </div>
                </div>
                <div className="row" id="wholeSponsored">
                  <div className="col" id="Sponsored">
                    <img src={Capture} alt="showtime" id="showtime" />
                  </div>
                  <div className="col" id="Sponsored1">
                    <p id="nana">Up To 54% OFF</p>
                    <span id="nana1">Newchic.com</span>
                  </div>
                </div>
                <div className="row" id="wholeSponsored">
                  <div className="col" id="Sponsored">
                    <img src={Capture} alt="showtime" id="showtime" />
                  </div>
                  <div className="col" id="Sponsored1">
                    <p id="nana">Up To 54% OFF</p>
                    <span id="nana1">Newchic.com</span>
                  </div>
                </div>
              </div>
              {/* <p id="webword">
            The web’s community of communities Disqus © 2020 Company Jobs Help
            Terms Privacy Add Disqus to your site
          </p> */}
            </div>
          </Bounce>

          <div className="col-6" id="centre1">
            <div className="container" id="homecontainer">
              <div className="row" id="size">
                <div className="col-sm" style={{ width: "100%" }}>
                  <div
                    id="storyme"
                    onClick={() => {
                      history.push(`/CreateStory/${nameh}`);
                    }}
                  >
                    <div className="row" id="showstory1">
                      <div className="col-12">
                        {" "}
                        <img src={image} alt="showtime" id="showtime1" />
                      </div>
                      <div className="col-12" id="secondtime">
                        <AddCircleIcon id="AddCircleIcon" />
                        <p id="CreateaStory">Create a Story</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm">
                  <div
                    id="storyme"
                    onClick={() => {
                      history.push(`/story/${nameh}`);
                    }}
                  >
                    <div className="row" id="size">
                      <div className="col-12" id="click">
                        <img src={Capture} alt="showtime" id="showtime11" />
                        <div className="dot1">
                          <img src={Capture} alt="showtime" id="showtime11a" />
                        </div>
                        <p id="nameinstory">Hirwa Aldo</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm">
                  {" "}
                  <div
                    id="storyme"
                    onClick={() => {
                      history.push(`/story/${nameh}`);
                    }}
                  >
                    <div className="row" id="size">
                      <div className="col-12" id="click">
                        <img src={Capture} alt="showtime" id="showtime11" />
                        <div className="dot1">
                          <img src={Capture} alt="showtime" id="showtime11a" />
                        </div>
                        <p id="nameinstory">Hirwa Aldo</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm">
                  {" "}
                  <div
                    id="storyme"
                    onClick={() => {
                      history.push(`/story/${nameh}`);
                    }}
                  >
                    <div className="row" id="size">
                      <div className="col-12" id="click">
                        <img src={Capture} alt="showtime" id="showtime11" />
                        <div className="dot1">
                          <img src={Capture} alt="showtime" id="showtime11a" />
                        </div>
                        <p id="nameinstory">Hirwa Aldo</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm">
                  {" "}
                  <div
                    id="storyme"
                    onClick={() => {
                      history.push(`/story/${nameh}`);
                    }}
                  >
                    <div className="row" id="size">
                      <div className="col-12" id="click">
                        <img src={Capture} alt="showtime" id="showtime11" />
                        <div className="dot1">
                          <img src={Capture} alt="showtime" id="showtime11a" />
                        </div>
                        <p id="nameinstory">Hirwa Aldo</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="wholemind">
                <div className="row" id="mindrow">
                  <div className="col-1" id="mindimage">
                    <img src={image} alt="you" id="mindimage1" />
                  </div>
                  <div className="col-11" id="minddiv" onClick={handleOpen}>
                    <div id="wordmind">What's on your mind {username} ?</div>
                  </div>
                </div>
              </div>
              <div id="wholepost">
                <div
                  className="row"
                  style={{ padding: "0", margin: "0", borderRadius: "12px" }}
                >
                  <div
                    className="col-1"
                    id="imagepost"
                    onClick={() => {
                      history.push(`/Account/${nameh}`);
                    }}
                  >
                    <img src={Capture} alt="you" id="imagepost1" />
                  </div>
                  <div
                    className="col-9"
                    id="namepost"
                    onClick={() => {
                      history.push(`/Account/${nameh}`);
                    }}
                  >
                    <p id="namepost1"> Hirwa Aldo</p>
                  </div>
                  <div className="col-2" id="unfollowpost">
                    <button id="unfollowpost1" className="btn btn">
                      Unfollow
                    </button>
                  </div>
                </div>

                <img src={Capture} alt="post" id="longpost" />
                <FavoriteBorderIcon id="FavoriteBorderIcon" />
                <CommentIcon
                  id="CommentIcon"
                  onClick={() => {
                    history.push(`/Comment/${nameh}`);
                  }}
                />
                <SendIcon
                  id="SendIcon"
                  onClick={() => {
                    history.push(`/Messages/${nameh}`);
                  }}
                />
                <div id="footerpost">
                  <p id="inputpost">Show my comments</p>
                </div>
              </div>
            </div>
          </div>
          <Bounce right>
            <div className="col-3" id="right1">
              <p id="Contacts">Contacts</p>
  
              {news.map((user,id) =>{
            return (
            <>
            
            <Usersuggetion key={user._id} {...user}/>
            </>
              )})}


            </div>
          </Bounce>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
            id="sjdmsdalo"
          >
            <Fade in={open} id="modelsadasa">
              <div>
                <h4 id="lkasldkm">Create Post</h4>
                <hr />
                <div id="mndashu" className="media">
                  <Avatar className="mr-3" />
                  <span className="mt-0">Hirwa Aldo</span>
                </div>
                <textarea
                  rows="4"
                  cols="50"
                  name="comment"
                  form="usrform"
                  id="lsdasdcds"
                  placeholder="What's on your mind hirwa ?"
                />
                <button className="btn btn" id="posthksd">
                  Post
                </button>
              </div>
            </Fade>
          </Modal>
        </div>
      </div>
    );
  
};
export default Home;
