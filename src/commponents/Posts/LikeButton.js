import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {useSelector} from "react-redux"
import { SERVER_URL } from "../../Domain";
import { fetchAllPostsAction } from "../../redux/slices/Posts";
import { uidContext } from "../AppContext";
const LikeButton = ({ post,socket}) => {
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();
  const uid = useContext(uidContext);
  const user = useSelector((state) => state.userInfo);
  const like = async (postId,posterId,userId) => {
    setLiked(true);
    dispatch(fetchAllPostsAction.LikePost({ postId, userId }));
    await axios({
      method: "patch",
      url: `${SERVER_URL}/api/post/like/${postId}`,
      data: { id: userId },
      withCredentials: true,
    })
      .then((res) => {
        //mgaha ngomba ndabe reponse ndonka inyuma y kurungika kumuy ya gize followers
        socket.emit("sendNotification",{
          senderName:userId,
          postLiked:postId,
          resverName:posterId, 
          timeNot: new Date()
        })

   //=================notication====================     
 axios({
    method: "patch",
    url: `${SERVER_URL}/api/post/notification/${posterId}`,
    data :{
          notifieId:user._id,
          notifiePseudo: user.pseudo,
          notification: "like your post",
          post:postId,
          status:"pending",
          pictureNotifie:user.picture
    },
    withCredentials : true
   }).then((res)=>{
    console.log(res)
   }).catch((err)=>console.log(err))
//======================notication==================================


      })
      .catch((res) => console.log(res));
  };
  const unlike = async (postId, userId) => {
    setLiked(false);
    dispatch(fetchAllPostsAction.UnlikePost({ postId, userId }));
    await axios({
      method: "patch",
      url: `${SERVER_URL}/api/post/unlike/${postId}`,
      data: { id: userId },
      withCredentials: true,
    })
      .then(({ data }) => {})
      .catch((res) => console.log(res));
  };
  useEffect(() => {
    if (post.likers.includes(uid)) setLiked(true);
  }, [uid, post.likers, liked]);

  return (
    <>
      {liked && (
        <i onClick={() => unlike(post._id, uid)} className="ri-heart-pulse-fill">
          <small>{post.likers.length}</small>
        </i>
      )}
      {liked === false && (
        <i onClick={() => like(post._id,post.posterId ,uid)} className="ri-heart-pulse-line">
          <small>{post.likers.length}</small>
        </i>
      )}
    </>
  );
};
export default LikeButton;
