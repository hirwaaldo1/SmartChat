import React, { useEffect, useState, useContext,useRef   } from "react";
import "./account.css";
import Logo from "../formOne/logo.svg";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import ChatIcon from "@material-ui/icons/Chat";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Avatar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Accordion from "@material-ui/core/Accordion";
import AddIcon from '@material-ui/icons/Add'
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { UserContext } from "../../App";
import axios from "axios";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { getFromStorage } from "../storoge";
import RubberBand from "react-reveal/RubberBand";
const userid = getFromStorage("the_main_app").token;
const nameh = getFromStorage("the_main_app").name;
const iduser=getFromStorage("the_main_app").userid
const Account = () => {
  const [expanded, setExpanded] = React.useState(false);
  const history = useHistory();
  const fileInput =useRef('')
  const [username, setUsername] = useState();
  const postInput =useRef('')
  const [selectfile,setSelectfile]=useState('')
  const [selectpost,setSelectpost]=useState('')
  const [news, setNews] = useState([]);
  const [aldo, setAldo] = useState([]);
  const [tests13,setTests13]=useState(false)
  const [image,setImage]=useState()
  const [post,setPost]=useState([])
  const [email, setEmail] = useState();
  const [user] = useContext(UserContext);
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
            setPost(res.data.post)
      });
  }, [user]);
  useEffect(() => {
    const hirwaaldo= {
        id:news
    }
    // console.log(hirwaaldo.id)
    axios.post(`http://localhost:1000/user/userverfuiy/${iduser}`,hirwaaldo)
    .then(res=>{
        setAldo(res.data)
    }) 
    return () => {
       console.log('aldas')
    }
}, [news])
useEffect(() => {
    const hirwaaldo= {
        id:news
    }
    // console.log(hirwaaldo.id)
    axios.post(`http://localhost:1000/user/userverfuiy/${iduser}`,hirwaaldo)
    .then(res=>{
        setAldo(res.data)
    }) 
    console.log(aldo)
    axios.get('http://localhost:1000/user/love/'+iduser)
    .then(res =>{
        var arrayOfStrings = res.data.map(function(obj) {
        return obj.user;
        });
        setNews(arrayOfStrings)
    }
)
    return () => {
        const hirwaaldo= {
            id:news
        }
        // console.log(hirwaaldo.id)
        axios.post(`http://localhost:1000/user/userverfuiy/${iduser}`,hirwaaldo)
        .then(res=>{
            setAldo(res.data)
        }) 
    console.log('clean')
    }
}, [user])
let Usertest =props=>{
  let { email} = props;
  const aldo={
    following:props._id,
    email:email
  }
  console.log(aldo,email)
  axios.post(`http://localhost:1000/user/login/unfollow-user/${iduser}`,aldo)
  .then(res=>console.log(res.data))
  console.log(aldo)
}
let Usersuggetion =props => {
  let { username} = props;
  let { image} = props;
  return (
  <>
     <div className="row" id="nasdjl">
                <div className="col-2">
                  <Avatar id="imagepost1" src={image} />
                </div>
                <div className="col-6">
  <p id="nameof">{username}</p>
                </div>
                <div className="col-4" >
                  <button  className="btn btn" onClick={()=>{Usertest(props)}} id="buttonasdscsd1">
                    Unfollow
                  </button>
                </div>
              </div>
  </>
  );
}; 
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  }
  if (!userid) {
    history.push("/");
    }
    const  fileSelected =event =>{
      setSelectfile(event.target.files[0])
      setTests13(true)
  }
  const  fileUploadImage =(e)=>{
      e.preventDefault()
      const formData = new FormData()
      formData.append('avatar',selectfile)
      axios.post(`http://localhost:1000/user/uploadImage/${iduser}`,formData, {
      }).then(res => {
          console.log(res)
      history.push(`/Account/${nameh}`)
      })
  history.push(`/Account/${nameh}`)
  }
  const  postSelected =event =>{
      setSelectpost(event.target.files[0])
  }
  const  postUploadImage =(e)=>{
      e.preventDefault()
      const formData = new FormData()
      formData.append('post',selectpost)
      console.log(tests13)
      axios.post(`http://localhost:1000/user/uploadPosts/${iduser}`,formData, {
      }).then(res => {
          console.log(res)
      history.push(`/Account/${nameh}`)
      })
  history.push(`/Account/${nameh}`)
  }
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

        <div className="col-12 container" id="containerAccont">
          <div id="backgroundimage">
            <img src={image} id="backgroundimage123" alt="backgroundimage" />
            <Avatar id="AvatarI" src={image}  onClick={()=>{fileInput.current.click()}}/>
            <input type="file" style={{display:'none'}} ref={fileInput} onChange={fileSelected} name="avatar"/>
            {image==='' ?
            <button onClick={fileUploadImage} id="Uploads" className="btn btn">Uploads</button> :null
             }
          </div>
          <div className=" container" id="aldosjad">
                <p id="nameod">{username}</p>
            <hr />
            <div className="About">About</div>
            <div className="Friends">Friends</div>
            <div id="Photos">Photos</div>
            <div
              id="edisda"
              onClick={() => {
                history.push(`/setting/${nameh}`);
              }}
            >
              .Edits
            </div>
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
              <AddIcon className="plus121"onClick={()=>{postInput.current.click()}}></AddIcon>
              <button onClick={postUploadImage} id="Uploads1" className="btn btn">Uploads</button>
                
            <input type="file" style={{display:'none'}} ref={postInput} onChange={postSelected} name="post"/>
           
            <GridList cellHeight={160}  cols={3} className="nsidcx">
  {post.map((post12) => {
    return <GridListTile className="gridList" key={post12} cols={post12}>
      <img src={post12} className="gridList" style={{width:"100%"}} alt={post12} />
    </GridListTile>
})}
</GridList>
           
            </div>
            <div className="col-3" id="Friendsdiv">
              <p id="headerAbout">Friends</p>
           

              {aldo.map((aldo, id) =>{
        return <Usersuggetion key={aldo._id} {...aldo}/>
    })}

           
            </div>
          </div>
        </div>
      </RubberBand>
    </div>
  );
};
export default Account;
