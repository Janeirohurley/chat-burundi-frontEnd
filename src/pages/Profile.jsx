import React from "react";
import Posts from "../commponents/Posts/Posts";
import { useSelector } from "react-redux";
import RightBar from "../commponents/Right/RightBar";
import Leftbar from "../commponents/LeftBar/Leftbar";
import Helmet from "../commponents/Helmet/Helmet";

const Profile = ({socket}) => {
  const user = useSelector((state) => state.userInfo);
function capitalizeFirstLetter(str) {
  return str?.charAt(0).toUpperCase() + str?.slice(1);
}
console.log("commponents rerendered or changed")
  return (
    <Helmet title={"Profile"}>
    <main>
       <div className="container">
       <Leftbar user={user} socket={socket}/>
       <div className="middle">
       <div
        style={{
          width:"100%",
          display:"flex",
          height:"10rem",
          gap:"10px",
          background:"var(--color-white)",
          padding:"15px 10px",
          borderRadius:"var(--card-border-radius-3)"
        }}
       >
         <div style={
          {
          width:"7rem",
          height:"7rem",
          overflow:"hidden",
          borderRadius:"50%",
          position:"relative"

          }
        }>
           <img 
           style={{
            display:"absolute",
            top:"0",
            left:"0",
            width:"100%",
            height:"100%"
           }}
           src={user.picture} alt={user.pseudo}/>
         </div> 
          <div
           style={{
          display:"flex",
          gap:"10px",
          flexDirection:"column"
        }}
          >
            <h1>{capitalizeFirstLetter(user?.pseudo)}</h1>
            {user.bio && <h5>{user?.bio}</h5>}
            <p>put ur bio here</p>
            <button className="btn-new btn-primary">Edit your profile</button>
          </div>
          </div>
          <div
          style={{
          width:"100%",
          marginTop:"1rem",
          background:"var(--color-white)",
          padding:"var(--card-padding)",
          borderRadius:"var(--card-border-radius-3)"
        }}
          >
          <div 
           style={{
          width:"100%",
          display:"flex",
          gap:"20px",
        }}
          >
            <p><b>{user.followers.length}</b> followers</p>
            <p><b>{user.following.length}</b> followings</p>
            <p><b>{user.likes.length}</b> likes</p>

          </div>
          <div
          style={{
          width:"100%",
          display:"flex",
          gap:"5px",
          flexDirection:"column",
          marginTop:"10px"
        }}
          >
          <span> Country : {capitalizeFirstLetter("burundi")}</span>
          <span>Bio : {user.bio ? capitalizeFirstLetter(user.bio) : "update here your biography"}</span>
          </div>
          </div>
              <Posts socket={socket} type={"profile"}/>
       </div>
       <RightBar user={user}/>
       </div>
    </main>
    </Helmet >
  );
};
export default Profile;