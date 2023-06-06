import React, { useEffect, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import ChatLoading from "../miscellaneous/ChatLoading"
import { useLocation,Link } from "react-router-dom";
import { actions } from "../../redux/slices/counter";
import { uidContext } from "../AppContext";
import axios from "axios"
import { Avatar } from "@mui/material";
import { SERVER_URL } from "../../Domain";
import {Typography} from "@mui/material";
import { useSelector } from "react-redux";
import {isEmpty,timestampParser} from "../Utils"
const Header = () => {
  const uid = useContext(uidContext);
  const user = useSelector((state) => state.userInfo);
    const opened = useSelector((state) => state.authentic.connected);
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading,setloading] = useState(true)
  const [ismessage, setIsmessage] = useState(true);
  const [NotificationList, setNotificationList] = useState([]);
  useEffect(() => {
    if (location.pathname === "/messenger"||
      location.pathname === "/login"||
      location.pathname === "/signup"||
      location.pathname === "/account-verification"||
      location.pathname.includes("/Change-password")||
       location.pathname.includes("settings/reset/")
      ) {
      setIsmessage(false);
    } else {
      setIsmessage(true);
    }
  }, [location.pathname]);
  const increment = () => {
    dispatch(actions.increment());
  };

  useEffect(()=>{
    if(opened){
        const fetchUserData = async () => {
      if (uid) {
        await axios({
          method: "get",
          url: `${SERVER_URL}/api/user/${uid}`,
          withCredentials: true,
        })
          .then(({data}) => {
            setloading(false)
          
          setNotificationList(data.notifications.reverse())
          })
          .catch((err) =>   console.log(err))
      }
    }
    fetchUserData()
  }

  },[opened,uid])

  return (
    <div>
      {ismessage ? (
        <nav>
          <div className="container">
            <h2 className="logo">
            <Link to="/">chat-burundi</Link>
            </h2>
            {uid !=="no token" && uid !==null ? (
              <>
                <div className="search-bar">
                  <i className="ri-search-line"></i>
                  <input type="search" placeholder="search something" />
                </div>
                <div className="create">
                  {location.pathname === "/" && 
                  <label
                    className="btn btn-primary"
                    htmlFor="create-post"
                    onClick={increment}
                  >
                    create
                  </label> }
                  {location.pathname !== "/" && 
                  <label
                    className="btn btn-primary disableButton"
                  >
                    create
                  </label> }
                  <div className="profile-picture">
                    <Avatar src={user.picture} alt="profile1" />
                  </div>
                </div>{" "}
              </>
            ) : (
              <div className="create"></div>
            )}
          </div>
          <div className="searchPopup"></div>
          <>
          {opened &&
          <div className="notifictions">
          <h1>Notifiction</h1>
          {!loading &&
            !isEmpty(NotificationList) &&
            NotificationList.map((notification) => {
              if (notification.notifieId !==uid) {
              return <div key={notification._id}>
                <div className="profile-picture">
                  <Avatar src={notification.pictureNotifie} alt="ass" />
                </div>
                <div className="notification-body">
                    <b>{notification.notifiePseudo} </b>  <Typography variant="caption">{notification.notification}</Typography> 
                  <small><Typography variant="caption">{timestampParser(notification.timestamp)}</Typography> </small>
                </div>
                </div> 
              }
            })
          }
          {
            loading && <ChatLoading/>
          }
              
          </div>
        }
          </>
        </nav>
      ) : (
        ""
      )}

    </div>
  );
};
export default Header;
