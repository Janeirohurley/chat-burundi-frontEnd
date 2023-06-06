import React ,{useEffect,useContext,useState} from "react";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux"
import { fetchAllPostsAction } from "../../redux/slices/Posts";
import { SERVER_URL } from "../../Domain";
import { uidContext } from "../AppContext";
import { Avatar } from "@mui/material";
import axios from "axios"
import { isEmpty } from "../Utils";
import { actions } from "../../redux/slices/Auth";
import { useDispatch } from "react-redux";
const Leftbar = ({ user,setcustomizeTheme,socket }) => {
const [Notificatios,setNotifications] = useState([])
const [OpenNot ,setOpenNot] = useState(false)
const [count, setCount] = useState(5);
const usersData = useSelector((state)=>state.getusers)
const [NewPost,setNewPost] = useState([])
  const uid = useContext(uidContext);
    const dispatch = useDispatch();
    //============useeffet avec socket io to get a real time notification============================
  useEffect(()=>{
    socket?.on("getNotification",res=>{
      if(uid){
         axios({
          method: "get",
          url: `${SERVER_URL}/api/user/${uid}`,
          withCredentials: true,
        })
          .then(({data}) => {
            var countNotification = data.notifications.filter((noti)=>noti.status ==="pending" && noti.notifieId !== uid)
             setNotifications(countNotification)
          })
          .catch((err) =>   console.log(err))
    }

    })
  },[socket,uid,usersData])
//==============================================================================================
//affiche la notification lorsque il ya en new post posted======================================
    useEffect(()=>{
    socket?.on("getNewpost",data=>{
   setNewPost((prev)=>[...prev,data])
    })
  },[socket])
//====================================================================================
//===============change status to viewed to reset all notification count to zero as readed=========
    useEffect(()=>{
      if(OpenNot && uid){
         setNotifications([])
          axios({
          method: "get",
          url: `${SERVER_URL}/api/user/notification/${uid}`,
          withCredentials: true,
        })
          .then(({data}) => {
             
          
          })
          .catch((err) =>   console.log(err))

      }
  
   dispatch(actions.open(OpenNot))

    },[OpenNot,dispatch,uid])
//=====================================================================================================
//=====================fetch les notificaction envoyer lorsque tu etais offline ====================
    useEffect(()=>{
  if(uid){
         axios({
          method: "get",
          url: `${SERVER_URL}/api/user/${uid}`,
          withCredentials: true,
        })
          .then(({data}) => {
            var countNotification = data.notifications.filter((noti)=>noti.status ==="pending" && noti.notifieId !== uid)
             setNotifications(countNotification)
          })
          .catch((err) =>   console.log(err))
    }
    },[uid])
    //=============================================================================================

const fetchData = async () => {
        await axios({
          method: "GET",
          url: SERVER_URL+"/api/post/",
          withCredentials: true,
        })
          .then(({ data }) => {
            const Array = data.slice(0, count);
            // Array.sort(()=> 0.5 - Math.random())
            dispatch(fetchAllPostsAction.fetchAllPosts(Array));
            console.log("fetch again from leftbar")
            setCount(count + 5);
            setNewPost([])
          })
          .catch((err) => {
            console.log(err);
          });
      };

  return (
    <div>
      <div className="left">
        <Link to="/profile" className="profile">
          <div className="profile-picture">
            <Avatar src={user.picture} alt="profile1" srcSet="" />
          </div>
          <div className="handle">
            <h4>{user.pseudo}</h4>
            <p className="text-muted">${user.pseudo}</p>
          </div>
        </Link>
        {/* side bar */}

        <div className="sidebar">
          <Link to="/" className="menu-item active">
            <span>
              <i
                onClick={()=>fetchData()}
               className="ri-home-2-line">
                 <small className={NewPost && NewPost.length !== 0 ? "notifications-count" :""}>{NewPost && NewPost.length !== 0 ? NewPost.length : "" }</small>
              </i>
            </span>{" "}
            <h3>Home</h3>
          </Link>
          <Link
            to="/messenger"
            className="menu-item"
            id="messeges-notification"
          >
            <span>
              <i className="ri-mail-line">
                <small className="notifications-coun"></small>
              </i>
            </span>{" "}
            <h3>Messages</h3>
          </Link>

          <Link to="#" className="menu-item" id="notifications">
            <span >
            <i onClick={()=>setOpenNot((ab)=>!ab)}
            className="ri-notification-3-line">
            <small 
            className={Notificatios.length !== 0 ? "notifications-count":""}
            >{Notificatios.length !== 0 && (Notificatios.length > 9 ? "9+": Notificatios.length)}
            </small></i>
            </span>
            <h3>Notificatios</h3>
          </Link>

          <Link to="#" className="menu-item">
            <span>
              <i className=" ri-bookmark-3-line">
                <small
                  className={!isEmpty(user.saved) ? "notifications-count": undefined}
                >
                  {!isEmpty(user.saved) &&
                    (user.saved.length > 9 ? "9+" : user.saved.length)}
                </small>
              </i>
            </span>{" "}
            <h3>Bookmarks</h3>
          </Link>
          <Link to="#" className="menu-item">
            <span>
              <i className="ri-bar-chart-grouped-line"></i>
            </span>{" "}
            <h3>Analystics</h3>
          </Link>
          <Link to="#" className="menu-item" onClick={()=>setcustomizeTheme(true)}>
            <span>
              <i className="ri-palette-line"></i>
            </span>{" "}
            <h3>Theme</h3>
          </Link>
          <Link to="#" className="menu-item">
            <span>
              <i className="ri-settings-3-line"></i>
            </span>{" "}
            <h3>Settings</h3>
          </Link>
        </div>
        {/* end of side left bar */}
        <label htmlFor="create-post" className="btn btn-primary">
          Create post
        </label>
      </div>
    </div>
  );
};

export default Leftbar;
