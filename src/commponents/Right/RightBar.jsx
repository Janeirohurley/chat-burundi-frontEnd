import React, { useState, useEffect,useMemo,memo } from "react";
import { useSelector } from "react-redux";
import {useNavigate,Link} from"react-router-dom"
import { isEmpty ,isOnline,LongMessage} from "../Utils";
import { ChatState } from "../../context/ChatProvider"
import FollowHandle from "../profile/FollowHandle";
import { Avatar } from "@mui/material";
const RightBar = memo(() => {
  const usersData = useSelector((state) => state.getusers);
  const userData = useSelector((state) => state.userInfo);
  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setplayOnce] = useState(true);
  const [FreindHint, setFreindHint] = useState([]);
  const [lastet,setLatest] = useState([])
  const chats = useSelector((state)=>state.AllChat)
  const onLineusers = useSelector((state)=>state.OnlineUsers)
  const {setSelectedChat} = ChatState()
  const navigate = useNavigate()
  useEffect(()=>{
    if(!isEmpty(chats[0])){
     var chatsNoNull =  chats.filter((element)=>element.latestMessage)
    const Arraychats = Object.keys(chatsNoNull).map((i)=> chatsNoNull[i])
    let sortArray = Arraychats.sort((a,b)=>{
      return b.latestMessage?.createdAt - a.latestMessage?.createdAt 
    })
    sortArray.length = 3;
setLatest(sortArray)
}
  },[chats])
  useEffect(() => {
    const NotfreindList = () => {
      let array = [];
      // usersData.map((user) => {
      //   if (user._id !== userData._id && !user.followers.includes(userData._id))
      //     return array.push(user._id);
      // });
      for(var i =0;i<usersData.length;i++){
        if(usersData[i] !== userData._id && !usersData[i].followers.includes(userData._id)){
          array.push(usersData[i]._id)
        }
      }
      array.sort(() => 0.5 - Math.random());
      if (window.innerHeight > 70) {
        array.length = 5;
      }
      setFreindHint(array);
    };

    if (playOnce && !isEmpty(usersData[0]) && !isEmpty(userData._id)) {
      NotfreindList();
      setIsLoading(false);
      setplayOnce(false);
    }
  }, [usersData, userData, playOnce]);
  const handleSelectChat = (chat)=>{
    setSelectedChat(chat)
    navigate("/messenger")
  }
  return (
    <div>
      <div className="right">
        <div className="messages">
          <div className="heading">
            <h4>Latest Messages</h4>
          </div>
          {
          lastet && lastet.map((chat)=>{
            return <div className="message" key={chat._id} onClick={()=>handleSelectChat(chat)}>
            <div className="profile-picture">
              <Avatar src={chat.latestMessage?.sender.picture} alt="aa" />
              <div className={isOnline(chat.latestMessage?.sender._id,onLineusers) ? "active":""}></div>
            </div>
            <div className="messge-body">
              <h5>{chat.latestMessage?.sender.pseudo === userData.pseudo ? "You": chat.latestMessage?.sender.pseudo}</h5>
              <p className="text-muted">{LongMessage(chat.latestMessage?.message)} </p>
            </div>
          </div>
          })
          }
        </div>
            {
  useMemo(() => <div className="freind-requests">
          <h4>Suggestions</h4>

          {isLoading ? (
            <div className="feed">Loading.....</div>
          ) : (
            <>
              {FreindHint &&
                FreindHint.map((user) => {
                  for (var i = 0; i < usersData.length; i++) {
                    if (user === usersData[i]._id && user !== userData._id) {
                      return (
                        <div className="request" key={Math.random()}>
                          <div className="info">
                            <div className="profile-picture">
                              <Avatar src={usersData[i].picture} alt="aa" />
                            </div>
                            <div>
                              <Link className="linkProfile" to={`/profile/${usersData[i]._id}`}><h5 className="noum">{usersData[i].pseudo}</h5></Link>
                              <p className="text-muted">
                                {usersData[i].following.length} following
                              </p>
                            </div>
                          </div>
                          <div className="action">
                            <FollowHandle
                              idTofollow={user}
                              type={"suggestion"}
                            />
                            <button className=" btn-new">gretting</button>
                          </div>
                        </div>
                      );
                    }
                  }
                })}
              <div className="request">
                <div className="profile-picture-ab">
                  For Looking others......
                </div>
              </div>
            </>
          )}
        </div>,[FreindHint,usersData,isLoading,userData._id])
      }
      </div>
    </div>
  );
});

export default RightBar;
