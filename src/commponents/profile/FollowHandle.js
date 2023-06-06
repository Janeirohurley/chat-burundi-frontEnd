import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UserinfoAction } from "../../redux/slices/Userinfo";
import { useSelector } from "react-redux";
import { isEmpty } from "../Utils";
import { SERVER_URL } from "../../Domain";
const FollowHandle = ({ idTofollow, type,socket }) => {
  const [isFollowed, setisFollowed] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userInfo);
  const handleFollow = async (FollowerId, idTofollow) => {
    setisFollowed(true);
    await axios({
      method: "patch",
      url: `${SERVER_URL}/api/user/follow/${FollowerId}`,
      withCredentials: true,
      data: { idToFollow: idTofollow },
    })
      .then((res) => {
        dispatch(UserinfoAction.Follow(idTofollow));
       //=================notication====================     
 axios({
    method: "patch",
    url: `${SERVER_URL}/api/post/notification/${idTofollow}`,
    data :{
          notifieId:userData._id,
          notifiePseudo: userData.pseudo,
          notification: "start following  u",
          status:"pending",
          pictureNotifie:userData.picture
    },
    withCredentials : true
   }).then((res)=>{
    console.log(res)
            socket.emit("sendNotification",{
          senderName:userData._id,
          resverName:idTofollow, 
          timeNot: new Date()
        })
   }).catch((err)=>console.log(err))
//======================notication==================================



      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const handleunFollow = async (FollowerId, idToUnFollow) => {
    setisFollowed(false);
    await axios({
      method: "patch",
      url: `${SERVER_URL}/api/user/unfollow/${FollowerId}`,
      withCredentials: true,
      data: { idToUnFollow },
    })
      .then((res) => {
        dispatch(UserinfoAction.UnFollow(idTofollow));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    if (!isEmpty(userData.following)) {
      if (userData.following.includes(idTofollow)) {
        setisFollowed(true);
      } else {
        setisFollowed(false);
      }
    }
  }, [userData, idTofollow]);
  return (
    <>
      {isFollowed === true && (
        <span onClick={() => handleunFollow(userData._id, idTofollow)}>
          {type === "suggestion" && (
            <button className="btn btn-primary">UnFollow</button>
          )}
          {type === "card" && <i className="ri-checkbox-circle-fill"></i>}
        </span>
      )}

      {isFollowed === false && idTofollow !== userData._id && (
        <span onClick={() => handleFollow(userData._id, idTofollow)}>
          {type === "suggestion" && (
            <button className={"btn btn-primary"}>follow</button>
          )}
          {type === "card" && <i className="ri-checkbox-circle-line"></i>}
        </span>
      )}
        {isFollowed === false && idTofollow === userData._id && (
        <span>
          {type === "suggestion" && (
            <button className={"btn btn-primary disableButton"}>follow</button>
          )}
          {type === "card" && <i className="ri-checkbox-circle-line"></i>}
        </span>
      )}
    </>
  );
};

export default FollowHandle;
