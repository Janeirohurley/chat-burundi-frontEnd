// import { IconButton } from "@mui/material";
import { Image, VideoCamera, YoutubeLogo } from "phosphor-react";
import React, { useContext ,useState,useEffect} from "react";
import { uidContext } from "../AppContext";
import {dateParser} from "../Utils"
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchAllPostsAction } from "../../redux/slices/Posts";
import { SERVER_URL } from "../../Domain";
import { Avatar } from "@mui/material";


import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import MuiAlert from '@mui/material/Alert';
import CardText from "../Posts/CardText";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const Craetepost = ({ user,socket }) => {


  const uid = useContext(uidContext);
  const [isLoading,setIsLoading] = useState(true)
  const [message,setMessage] = useState("")
  const [postPicture,setPostpicture] = useState(null)
  const [video,setVideo] = useState("")
  const [file,SetFile] = useState("")
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [colorsChoosed,setcolorsChoosed] = useState()
  const defaultColor = "radial-gradient(circle, #5c0067 0%, #00d4ff 100%)";
  const [color,setColor] = useState()
const handlePicture = (e)=>{
  if(e){
  setPostpicture(URL.createObjectURL(e.target.files[0]))
  }
  setVideo("")
  SetFile(e.target.files[0])
}

useEffect(() => {
const handleVideo = ()=>{
let findLink = message.split(" ")
for(var i = 0 ; i< findLink.length;i++){
  if(findLink[i].includes("https://www.youtube.com") || findLink[i].includes("https://youtube.com")){
   let embed = findLink[i].replace("watch?v=","embed/")
   setVideo(embed.split("&")[0])
   findLink.splice(i,1)
   setMessage(findLink.join(" "))
   setPostpicture("")
  }else{
     if(findLink[i].includes("https://youtu.be/")){
    let embed = findLink[i].replace("youtu.be/","www.youtube.com/embed/")
    setVideo(embed)
    findLink.splice(i,1)
    setMessage(findLink.join(" "))
   setPostpicture("")
  } 
  }

}
}

  
   if(uid){
    setIsLoading(false)
     }
handleVideo()
  }, [uid,message,video])



   const cancelPost=()=>{
    setMessage("")
    setVideo("")
    setPostpicture("")
   }
    const deleteVideo=()=>{
    setVideo("")
   }
       const deletePicture=()=>{
    setPostpicture("")
   }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        
      </IconButton>
    </>
  );





   const handlePost = async(e)=>{
    e.preventDefault()
    if(message || file || video){
      const data = new FormData()
      data.append("file",file)
      data.append("posterId",uid)
      data.append("message",message)
      data.append("video",video)
      data.append("color",color ? color : defaultColor)
        await axios({
      method: "post",
      url: `${SERVER_URL}/api/post/`,
      withCredentials: true,
      data,
      onUploadProgress:(progressEvent)=>{
        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        setUploadProgress(progress)
      }
    })
    .then(({data})=>{
      cancelPost()
      const fetchData = async () => {
        await axios({
          method: "GET",
          url: SERVER_URL+"/api/post/",
          withCredentials: true,
        })
          .then(({ data }) => {
            const Array = data.slice(0, 5);
            dispatch(fetchAllPostsAction.fetchAllPosts(Array));
            console.log("fetch again from create post")
            socket.emit("NewPost",{
               data
            })
            //send notification to my followers peoples in database
            if(user.followers.length !==0){

          for(var i=0;i< user.followers.length;i++){

             axios({
    method: "patch",
    url: `${SERVER_URL}/api/post/notification/${user.followers[i]}`,
    data :{
          notifieId:user._id,
          notifiePseudo: user.pseudo,
          notification: "post a new post",
          status:"pending",
          pictureNotifie:user.picture
    },
    withCredentials : true
   }).then(({data})=>{
    // send real time notifications to everyone who follow me
    socket.emit("sendNotification",{
          senderName:user._id,
          resverName:data._id, 
          timeNot: new Date()
        })
   }).catch((err)=>console.log(err))

          }
            }



          })
          .catch((err) => {
            console.log(err);
          });
      };
      fetchData();
    }).catch((err)=>console.log(err))


    }else{
    setOpen(true)
    }
    
   }
function ProgressBar({ progress }) {
  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${progress}%`,backgroundColor:"red" }}>{progress} %</div>
    </div>
  );
}
function generateRandomColors() {
  var colors =[] ;
  for (var i = 0; i < 8; i++) {
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    var colorPallete = ["yellow","white","gray","gold","blue","silver","turquoise","cyan","brown","pink","purple","green"]
    var lastcolor = Math.floor(Math.random() * colorPallete.length);
  var color = "rgb(" + red + "," + green + "," + blue + ")";
  var backgroundImage = "linear-gradient(to bottom right, " + color + ", " + colorPallete[lastcolor] +")";
  colors.push(backgroundImage)

  }
  return setcolorsChoosed(colors)
}
useEffect(()=>{
  generateRandomColors()
},[])

useEffect(()=>{
var span = document.querySelectorAll(".colorPallete span")
span.forEach((item)=>{
item.addEventListener("click",(e)=>{
  setColor(e.target.id)
})
})
})
  return (
    <div>
      {
        isLoading ?
         (<h5>loading..........</h5>) :
      (
        <form onSubmit={(e)=>handlePost(e)} >
          <div className="create-post">
            <div className="profile-picturem">
              <Avatar src={user.picture} alt="asa" />
            </div>
            <input
              type="text"
              name=""
              id="create-post"
              placeholder="whats something new "
              onChange={(e)=>setMessage(e.target.value)}
              value={message}
            />
            <input type="submit"  value="Post" className="btn btn-primary" />
          </div>

          <div className="vidoe_yt_img">
            <i>
              <IconButton>
                <VideoCamera />
              </IconButton>
            </i>
            <span>video</span>
            <i  className="fileSelecter">
              <IconButton>
                <Image />
                <input type="file" className="inputPicture" name="file" onChange={(e)=>handlePicture(e)} accept=".jpg,.jpeg,.png"/>
              </IconButton>
            </i>
            <span>picture</span>
            <i>
              <IconButton>
                <YoutubeLogo />
              </IconButton>
            </i>
            <span>youtube</span>
          </div>
            <ProgressBar progress={uploadProgress} />

        </form>
        )
    }
    <>
        {
          (message || postPicture || video) && 
           <>
           <div className="feeds">
            <div className="feed">
              <div className="head">
                <div className="user">
                  <div className="profile-picture">
                    <Avatar src={user.picture} alt={user.pseudo}/>
                  </div>
                  <div className="ingo">
                    <span><h4>{user.pseudo}</h4></span>
                    <small>{dateParser(Date.now())}</small>
                  </div>
                </div>
                <span className="edit "> 
                </span>
              </div>
              {!video && !postPicture && <div className="news ">
              <CardText type="posts" text={message} color={color}/>
              <div className="colorPallete">
              {
                colorsChoosed && 
                colorsChoosed.map((color,index)=>(
                 <span 
                 key={index} id={color} style={{backgroundImage:color}}
                 ></span>
                  ))
              }
              <span><input type="color"/></span>
              </div>
              </div>}
              {(video || postPicture) && <div className="news "><b>{message}</b></div>}
              {video &&
                  <div className="photo ">
                  <iframe height="250" width="400" src={video} title={Math.random()}></iframe>
                  </div>
               }
               {postPicture &&
                  <div className="photo ">
                  <img src={postPicture} alt="abc"/>
                  </div>
               }
               
            </div>
          </div>
          { postPicture || message || video.length > 20  ? <button className="btn-new" onClick={cancelPost}>annuler</button> : null}
          {video ? <button className="btn-new" onClick={deleteVideo}>delete video</button> : null}
          {postPicture ? <button className="btn-new" onClick={deletePicture}>delete picture</button> : null}
          </>
        }

        <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        action={action}
      >
      <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
        veuillez entrer un message pour poster
        </Alert>
      </Snackbar>
    </>
    </div>
  );
};

export default Craetepost;
