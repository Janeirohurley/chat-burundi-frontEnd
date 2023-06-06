import React,{useContext,memo}from "react";
import { isEmpty } from "../Utils";
import { useSelector } from "react-redux";
import { uidContext } from "../AppContext"
import {Avatar,Typography} from "@mui/material"
import { Link } from "react-router-dom";
const LikedBy = memo(({ post }) => {
  const usersData = useSelector((state) => state.getusers);
    const uid = useContext(uidContext);
  var likersFilted = [];
  const limit = 2;
  for (let i = 0; i <= limit; i++) {
    for (let j = 0; j < usersData.length; j++) {
      if (post.likers[i] === usersData[j]._id) {
        likersFilted.push(usersData[j]);
      }
    }
  }
  return (
    <>
      <div className="liked_by">
        <>
          {likersFilted.length === 3 &&
            likersFilted.map((el) => (
              <span key={Math.random()}>
                <Avatar src={!isEmpty(likersFilted) && el.picture} alt="assa" sx={{width:"100%",height:"100%",zoom:"50%"}} />
              </span>
            ))}
        </>
        <p>
          liked by <b>{!isEmpty(likersFilted) && likersFilted[0].pseudo}</b> ,
          <b>{likersFilted.length === 3 && likersFilted[1].pseudo}</b>{" "}
        </p>
      </div>
      <div className="caption">
        <Typography variant="caption">
          <b>{!isEmpty(post.comments) &&
          <> {post.comments[0].commenterId === uid ? "You" : post.comments[0].commenterPseudo}</>} </b>{" "}
          {!isEmpty(post.comments) && post.comments[0].text}
        </Typography>
      </div>
      <div className=" comments text-muted">
        <Link to={`/single/post/${post._id}`}>
          <small>
            {" "}
            view all {!isEmpty(post.comments) && post.comments.length} comments
          </small>
        </Link>
      </div>
    </>
  );
});
export default LikedBy;
