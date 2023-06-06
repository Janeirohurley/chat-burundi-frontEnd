import React, { Suspense, lazy, useEffect, useState } from "react";
import axios from "axios";
import { fetchAllPostsAction } from "../../redux/slices/Posts";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty, filterpost } from "../Utils";
import { SERVER_URL } from "../../Domain";
import CardSkeleton from "../Skeleton/CardSkeleton";
// import Card from "./Card";
const fakeDalay = async (promise) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
  return promise;
}
const Card = lazy(() => fakeDalay(import("./Card")))
const Posts = ({ socket,type}) => {
  const dispatch = useDispatch();
  const [loadPost, setLoadpost] = useState(true);
  const [count, setCount] = useState(5);
  const posts = useSelector((state) => state.posts);
  const userData = useSelector((state) => state.userInfo)
  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight - 50
    ) {
      setLoadpost(true);
    }
  };
  //============================================================================/


  //==============================================================================
  useEffect(() => {
    if (loadPost || type) {
      const fetchData = async () => {
        await axios({
          method: "GET",
          url: SERVER_URL + "/api/post/",
          withCredentials: true,
        })
          .then(({ data }) => {
            console.log("fetch again from posts")
            const Array = filterpost(data, userData.following, userData._id).slice(0, count);
            for (var i = 0; i < Array.length; i++) {
              Array[i].comments.reverse()
            }
            dispatch(fetchAllPostsAction.fetchAllPosts(Array));
            setLoadpost(false);
            setCount(c=>c + 5);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      fetchData();
    }
    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, [loadPost,type]);
  return (
    <div className="feeds">
      {type === "home" && !isEmpty(posts[0]) &&
        posts.map((post) => {
          return <Suspense fallback={<CardSkeleton key={Math.random()} />}>
            <Card
              post={post} key={post._id}
              count={count}
              socket={socket}
            /></Suspense>;
        })}
      {type === "profile" && !isEmpty(posts[0]) &&
        posts.map((post) => {
          return <Suspense fallback={<CardSkeleton key={Math.random()} />}>
          {
            post.posterId === userData._id &&
            <Card
              post={post} key={post._id}
              count={count}
              socket={socket}
            />
          }
            </Suspense>;
        })}
    </div>
  );
};

export default Posts;
