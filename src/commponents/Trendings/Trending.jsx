import React,{useEffect,useMemo} from "react";
import { Avatar} from "@mui/material";
import { isEmpty } from "../Utils";
import { GetTrendings } from "../../redux/slices/Trendings";
import {useSelector,useDispatch} from 'react-redux'
import { Link } from "react-router-dom";
import CardText from "../Posts/CardText";
const Trending = () => {
  const posts = useSelector((state)=>state.Allpost)
const usersData = useSelector((state)=>state.getusers)
const trendingList = useSelector((state)=>state.trending)
const dispatch = useDispatch()

  useEffect(()=>{
    if(!isEmpty(posts[0])){
    const Arraypost = Object.keys(posts).map((i)=> posts[i])
    let sortArray = Arraypost.sort((a,b)=>{
      return b.likers.length - a.likers.length
    })
    sortArray.length = 5;
dispatch(GetTrendings.getTrending(sortArray))
}
  },[posts,dispatch])
  return (
    useMemo(()=> <div>
      <h5 className="logo">Trendings posts this month</h5>
      <br/>
      <div className="stories">
      {
       !isEmpty(trendingList[0]) && trendingList.map((story)=>(
            <div className="story" key={Math.random()}>
          <div className="profile-picture">
                <Avatar
                  src={
                    !isEmpty(usersData[0]) &&
                    usersData
                      .map((user) => {
                        if (user._id === story.posterId) return user.picture;
                        else return null;
                      })
                      .join("")
                  }
                  alt="ss"
                />
          </div>
          <Link to="/trendings">
          {story.picture &&  <img src={story.picture} alt="aa" />}
          {story.video &&  <iframe
                width="100"
                height="250"
                src={story.video}
                title={Math.random()}
              /> }
          {isEmpty(story.picture) && isEmpty(story.video) && 
          // <img src={
          //   !isEmpty(usersData[0]) &&
          //             usersData
          //               .map((user) => {
          //                 if (user._id === story.posterId) return user.picture;
          //                 else return null;
          //               })
          //               .join("")
          // } alt="aa" />
          <CardText type="trending" text={story.message}/>
          }
          </Link>
          <p className="name">
                    {!isEmpty(usersData[0]) &&
                      usersData
                        .map((user) => {
                          if (user._id === story.posterId) return user.pseudo;
                          else return null;
                        })
                        .join("")
                      }
          </p>
        </div>
          ))

      }

        
       
      </div>
    </div>,[trendingList,usersData])
  );
};

export default Trending;
