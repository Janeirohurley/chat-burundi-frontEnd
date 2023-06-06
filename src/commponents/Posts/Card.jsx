import React, { useState, useEffect ,memo} from "react";
import { fetchAllPostsAction } from "../../redux/slices/Posts";
import { useDispatch } from "react-redux";
import EditDelete from "./EditDelete"
import { PostOptions } from "./DotsTree";
import CardSkeleton from "../Skeleton/CardSkeleton";
import { useSelector } from "react-redux";
import { dateParser, isEmpty, timestampParser, filterpost } from "../Utils";
import FollowHandle from "../profile/FollowHandle";
import LikeButton from "./LikeButton";
import Savepost from "./Savepost";
import { Avatar, Stack, Typography, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import LikedBy from "./LikedBy";
import axios from "axios";
import { SERVER_URL } from "../../Domain";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import MuiAlert from '@mui/material/Alert';
import LazyImage from "../LazyImage/LazyImage";
import CardText from "./CardText";
import {Link} from "react-router-dom"

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Card = memo(({ post, socket, count }) => {
  const [loading, setLoading] = useState(true);
  const [openComment, setOpenComment] = useState(false)
  const [comment, setComment] = useState("")
  const [open, setOpen] = useState(false);
  const [isUpdating, SetisUpdating] = useState(false);
  const [isUpdated, setUpdated] = useState(false);
  const [iscommenting, setiscommenting] = useState(false);
  const [textUpdeted, settextUpdeted] = useState(null);
  const usersData = useSelector((state) => state.getusers);
  const userData = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const [colorsChoosed,setcolorsChoosed] = useState()
  const [color,setColor] = useState()
  useEffect(() => {
    !isEmpty(usersData[0]) && setLoading(false);
  }, [usersData]);

  const unpdateItem = async (postId, message) => {
    if (textUpdeted) {
      SetisUpdating(true);
      await axios({
        method: "put",
        url: `${SERVER_URL}/api/post/${postId}`,
        data: {
         message: textUpdeted,
         color:color
         },
        withCredentials: true,
      })
        .then((res) => {
          setTimeout(() => {
            dispatch(fetchAllPostsAction.UpdatePost({ postId, message }));
            setOpen(true)
            setUpdated(false);
            SetisUpdating(false);
            setColor("")
          }, 2000);
        })
        .catch((err) => console.log(err));
    }
  };
  const handleComment = async (postId, posterId) => {
    if (comment) {
      setiscommenting(true)
      await axios({
        method: "patch",
        url: `${SERVER_URL}/api/post/comment-post/${postId}`,
        withCredentials: true,
        data: {
          commenterId: userData._id,
          commenterPseudo: userData.pseudo,
          text: comment,
        },
      })
        .then(({ data }) => {
          setiscommenting(false)
          setComment("")
          // dispatch(fetchAllPostsAction.CommentPost({ postId, data }));
          //=================notication==================== 

          axios({
            method: "patch",
            url: `${SERVER_URL}/api/post/notification/${posterId}`,
            data: {
              notifieId: userData._id,
              notifiePseudo: userData.pseudo,
              notification: "comment to ur post",
              post: postId,
              status: "pending",
              pictureNotifie: userData.picture
            },
            withCredentials: true
          }).then((res) => {
            console.log(res)
            socket.emit("sendNotification", {
              senderName: userData._id,
              resverName: posterId,
              timeNot: new Date()
            })
          }).catch((err) => console.log(err))
          //======================notication==================================
          const fetchData = async () => {
            await axios({
              method: "GET",
              url: SERVER_URL + "/api/post/",
              withCredentials: true,
            })
              .then(({ data }) => {
                const Array = data.slice(0, count);
                console.log("fetch again from card")

                for (var i = 0; i < Array.length; i++) {
                  Array[i].comments.reverse()
                }


                dispatch(fetchAllPostsAction.fetchAllPosts(filterpost(Array, userData.following, userData._id)));
              })
              .catch((err) => {
                console.log(err);
              });
          };
          fetchData();
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      alert("can't comment empty fill a field")
    }
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
    <div className="feed" key={post._id}>
      {loading ? (
        <CardSkeleton />
      ) : (
        <>
          <div className="head">
            <div className="user">
              <div className="profile-picture ">
                <Avatar
                  src={
                    !isEmpty(usersData[0]) &&
                    usersData
                      .map((user) => {
                        if (user._id === post.posterId) return user.picture;
                        else return null;
                      })
                      .join("")
                  }
                  alt="ss"
                />
              </div>

              <div className="ingo">
                <span>
                  <h5 className="noum">
                     <Link className="linkProfile" to={`/profile/${post.posterId}`}>
                     {
                      !isEmpty(usersData[0]) &&
                      usersData
                        .map((user) => {
                          if (user._id === post.posterId) return user.pseudo;
                          else return null;
                        })
                        .join("")
                      }
                        </Link>
                        {" "}
                    {
                      post.posterId !== userData._id && (
                      <FollowHandle idTofollow={post.posterId} type={"card"} socket={socket} />
                      )
                    }
                  </h5>
                </span>
                <Typography variant="caption">{dateParser(post.createdAt)}</Typography>
              </div>
            </div>

            <span className="edit">
              {post.posterId === userData._id && (
                <PostOptions
                  post={post}
                  setUpdated={setUpdated}
                  isUpdated={isUpdated}
                />
              )}
            </span>
          </div>
          <div className="news">
            {isUpdated && (
              <>
                <textarea
                  defaultValue={post.message}
                  onChange={(e) => settextUpdeted(e.target.value)}
                />
                <button
                  className="btn-new"
                  onClick={() => unpdateItem(post._id, textUpdeted)}
                >
                  <LoadingButton
                    loading={isUpdating}
                    sx={{
                      padding: "0px",
                      height: "10px",
                      color: "white",
                      textTransform: "lowercase",
                    }}
                  >
                    update
                  </LoadingButton>
                </button>
                <button className="btn-new" onClick={() => setUpdated(false)}>
                  discard
                </button>
              </>
            )}
          {isUpdated === false && !post.video && !post.picture && <CardText type="posts" text={post.message} color={post.color} /> } 
          {isUpdated === true && !post.video && !post.picture && <CardText type="posts" text={post.message} color={color ? color : post.color} /> } 
          {isUpdated === false && (post.video || post.picture) && <b>{post.message}</b>}
          </div>
          <div className="photo">
            {post.picture &&
              // <img src={post.picture} alt={"post-pict"}/>
              <LazyImage id={post._id} key={post._id} src={post.picture} />
            }
            {post.video && (
              <iframe
                width="400"
                height="250"
                src={post.video}
                title={Math.random()}
              />
            )}
          </div>
          <div className="action-buttons">
            <div className="interaction-buttons">
              <LikeButton post={post} socket={socket} />
              {"  "}
              <i onClick={() => setOpenComment((ab) => !ab)} className="ri-chat-3-line">
                <small>{post.comments.length}</small>
              </i>
              {"  "}
              <i className="ri-share-line"></i>
            </div>
            {post.posterId !== userData._id && (
              <Savepost post={post} userData={userData} />
            )}
          </div>
          {post.likers.length > 2 && <LikedBy post={post} />}
          {openComment &&
            <>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Avatar
                  src={userData.picture}
                  sx={{ width: "25px", height: "25px" }}
                />
                <Typography width="95%">
                  <input className="commentInput" placeholder="give ur idea...."
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                  />
                </Typography>
                <button onClick={() => handleComment(post._id, post.posterId)} className={iscommenting ? "disableButton btn-new" : "btn-new"}>
                  {iscommenting ? "waiting.." : "send"}
                </button>
              </Box>
              <>
                {
                  post.comments.map((commentaire) => {
                    return (
                      <Stack className="commentBox" direction="column" spacing={1} p={1} key={commentaire._id}>
                        <Box sx={{ display: "flex", gap: 2 }}>
                          <Avatar
                            src={
                              !isEmpty(usersData[0]) &&
                              usersData
                                .map((user) => {
                                  if (user._id === commentaire.commenterId)
                                    return user.picture;
                                  else return null;
                                })
                                .join("")
                            }
                            alt="ss"
                            sx={{ width: "25px", height: "25px" }}
                          />
                          <Box sx={{ display: "inline-block", gap: 2 }}>
                          <Link className="linkProfile" to={`/profile/${commentaire?.commenterId}`}>
                           <Typography variant="caption">
                            {!isEmpty(post.comments) && commentaire.commenterPseudo}
                            </Typography>
                            </Link>
                            {" "}
                            {userData._id !== commentaire.commenterId &&
                              <FollowHandle idTofollow={commentaire.commenterId} type={"card"} />}
                            <Typography
                              variant="body2"
                              sx={{
                                padding: "3px 4px",
                                background: "#888",
                                fontSize: "0.8rem",
                                borderRadius: "10px",
                                minWidth: "100px",
                                maxWidth: "300px",
                                minHeight:"40px",
                                wordWrap: "break-word",
                                position:"relative",
                                "'&:before'":{
                                  width:"30px",
                                  height:"30px",
                                  background:"red",
                                  position:"absolute"

                                }
                              }}
                            >
                              {!isEmpty(post.comments) && commentaire.text}
                            </Typography>
                            <EditDelete
                              userData={userData}
                              commentaire={commentaire}
                              postId={post._id}
                            />

                            <Typography variant="caption">{timestampParser(commentaire.timestamp)}</Typography>
                          </Box>
                        </Box>
                      </Stack>
                    )
                  })
                }
              </>
            </>

          }
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            action={action}
          >
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              post has been updated succussifull
            </Alert>
          </Snackbar>
        </>
      )}
      {
        isUpdated && !post.video && !post.picture &&
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
      }
    </div>
  );
});

export default Card;
