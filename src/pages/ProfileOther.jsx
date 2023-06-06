import React,{useEffect,useState} from "react"
import Helmet from "../commponents/Helmet/Helmet";
import RightBar from "../commponents/Right/RightBar";
import { useParams } from 'react-router-dom';
import FollowHandle from "../commponents/profile/FollowHandle";
import { Avatar } from "@mui/material";
import { GetAllposts } from '../redux/slices/Allposts';
import { getusersAction } from '../redux/slices/Getusers';
import {Link} from "react-router-dom";
import {SERVER_URL} from "../Domain"
import axios from "axios"
import { useDispatch } from "react-redux";
import {useSelector} from "react-redux"
const ProfileOther = ()=>{
	  const user = useSelector((state) => state.userInfo)
    const usersData = useSelector((state) => state.getusers)
	  const Allpost = useSelector((state) => state.Allpost)
     const [hisFollowers ,setHisFollowers] =useState()
     const [hisLikes ,setHisLikes] =useState()
     const [hisPosts ,sethisPosts] =useState()
	  const [userinfo,setUser]=useState()
     const dispatch = useDispatch()
	      const params = useParams()
  useEffect(()=>{
    if(hisFollowers?.length > 0){
   const carousel = document.querySelector(".carousel");
const arrowsBtns = document.querySelectorAll(".himfollowers i");
arrowsBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    console.log(e.target.id);
    if (e.target.id === "left") {
      carousel.scrollLeft -= 10;
    } else {
      carousel.scrollLeft += 10;
    }
  });
});
let isDragging = false,
  startX,
  startScrollLeft;
const dragstart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};
const dragstop = () => {

  isDragging = false;
  carousel.classList.remove("dragging");
};
const dragging = (e) => {
  if (!isDragging) return;
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};
carousel.addEventListener("mousedown", dragstart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragstop);
}
  },[hisFollowers?.length])

  //fetch all userdata from data base
  useEffect(()=>{
    if(params.id){
    const fetchUserData = async () => {
      if (params.id) {
        await axios({
          method: "get",
          url: `${SERVER_URL}/api/user/${params.id}`,
          withCredentials: true,
        })
          .then(({data}) => {
           setUser(data)
          })
          .catch(() => console.log("no data found"))
      }
    }
    fetchUserData()
    }
    //fetch all data's user
        const fetchUserAllData = async () => {
      if (params.id) {
        await axios({
          method: "get",
          url: `${SERVER_URL}/api/user`,
          withCredentials: true,
        })
          .then((res) => {
            dispatch(getusersAction.GetuAllsers(res.data))
          })
          .catch(() => dispatch(getusersAction.GetuAllsers({ message: "no user exist now" })))
      }
    }
    fetchUserAllData()
    //fetch all post data
        const fetchUserAllDataPost = async () => {
      if (params.id) {
        await axios({
          method: "get",
          url: `${SERVER_URL}/api/post`,
          withCredentials: true,
        })
          .then(({data}) => {
            dispatch(GetAllposts.GetAll(data))
            console.log("fetch again from profile outher ")
          })
          .catch(() => dispatch(GetAllposts.GetAll({ message: "no post exist now" })))
      }
    }
    fetchUserAllDataPost() 
  },[params.id])
         useEffect(()=>{
          if(params.id){
            
            var myFollowers = usersData.filter((user)=> user.following.includes(params.id))
            console.log(myFollowers)
            setHisFollowers(myFollowers)
            var myPosts  = Allpost.filter((post)=>post.posterId === params.id)
            sethisPosts(myPosts)
            console.log(myPosts)
          
          var count = 0;
          for (let index = 0; index < hisPosts?.length; index++) {
          count = count + hisPosts[index].likers.length
           }
           setHisLikes(count)
        }
       },[params.id,Allpost])
   return(
   	<Helmet title={"other profile"}>
   	<div className="container">
      <div className="wrapper">
        <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
      	<div className="profile">
      	  <div className="image">
      	  	<img src={userinfo?.picture} alt={userinfo && userinfo?._id}/>
      	  </div>
      	  <div className="wrapper-2">
      	  <div style={
          {
          width:"9rem",
          height:"9rem",
          overflow:"hidden",
          borderRadius:"50%",
          position:"relative",
          top:"-70px",
          left:"20px",
          border:"6px solid var(--color-white)"

          }
        }>
           <Avatar 
           style={{
            display:"absolute",
            top:"0",
            left:"0",
            width:"100%",
            height:"100%"
           }}
           src={userinfo?.picture} alt={userinfo?.pseudo}/>
         </div> 
         <div className="infos">
         	<h4>{userinfo?.pseudo}</h4>
         	<span>{"Étudiant(e) à univeriste polytechinique de gitega(UPG)"}</span>
         	<small>kinyinya,ruyigi,burundi</small>
         	<div className="followFollowing">
         	<span>{userinfo?.followers.length} followers</span> 
         	<span>{userinfo?.following.length} following</span> 
         	<span>{hisPosts?.length} Posts</span> 
         	<span>{hisLikes} Likes</span> 
         	</div>
         	<span>la vie est plus bon que tu le pense mais aussi est plud dur que bon buy jeneiro hurley</span>
            <div className="action">
		        <FollowHandle
		           idTofollow={params.id}
		           type={"suggestion"}
		                            />
		                            {" "}
		       <button className=" btn-new">gretting</button>
		    </div>
         </div>
      	  </div>
      	</div>
      	 {hisFollowers?.length > 0 && <div className="himfollowers">
         {hisFollowers?.length > 3 && <i className="ri-arrow-drop-left-line" id="left"></i>}
         <div className="carousel">
         {
            hisFollowers?.map((user,index)=>(
         <div className="request" key={index}>
            <div className="info">
               <div className="profile-picture">
               <Avatar src={user?.picture} alt="aa" />
               </div>
               <div>
              <Link className="linkProfile" to={`/profile/${user?._id}`}><h5 className="noum">{user?.pseudo}</h5></Link>
            <p className="text-muted">
               {user?.following.length} following
            </p>
            </div>
            </div>
            <div className="action">
            <FollowHandle
            idTofollow={user._id}
            type={"suggestion"}
                           />
            <button className=" btn-new">gretting</button>
           </div>
            </div>
         ))}
         </div>
         {hisFollowers?.length > 3 && <i className="ri-arrow-drop-right-line" id="right"></i>}
         </div>}
      	<div className="hisPosts">
         <div className="feed">
<div className="head">
    <div className="user">
        <div className="profile-picture">
            <img src={user.picture} alt="ss" />
        </div>

        <div className="ingo">
            <h3>{user.pseudo}</h3>
            <small>burundi, 15 min ago</small>
        </div>
    </div>

    <span className='edit'>
        <i className="ri-more-fill"></i>
    </span>
</div>
<div className="news">
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate, laboriosam!
</div>

<div className="action-buttons">
    <div className="interaction-buttons">
        <i className="ri-heart-line"></i>{"  "}
        <i className="ri-chat-3-line"></i>{"  "}
        <i className="ri-share-line"></i>
    </div>
    <div className="bookmark">
        <i className="ri-bookmark-line"></i>

    </div>
</div>
<div className="liked_by">
    <span><img src={user.picture} alt="assa" /></span>
    <span><img src={user.picture} alt="ddf" /></span>
    <span><img src={user.picture} alt="ee" /></span>
    <p>liked by <b>janeiro hurley</b> ,<b>jubu niyoko</b> </p>
</div>
<div className="caption">
    <p><b>Lorem </b> ipsum dolor sit amet consectetur adipisicing</p>
</div>
<div className=" comments text-muted">
    <small> view all 2k comments</small>
</div>
</div> 
        </div>

      	</div>
      	<div className="leftProfile">{user && <RightBar user={user}/>}</div>
      </div>
   	</div>
     </Helmet>
   	)
}

export default ProfileOther;