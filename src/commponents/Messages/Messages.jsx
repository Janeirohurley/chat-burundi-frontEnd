import {
  Avatar,
  Badge,
  Box,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { styled} from "@mui/material/styles";
import { SimpleBarStyle } from "../Scrollbar";
import React,{useState,useEffect} from "react"
import { SERVER_URL } from "../../Domain";
import axios from 'axios'
import {useSelector} from "react-redux"
import { GetAllChat } from '../../redux/slices/AllChat';
import { GetAllMessages } from '../../redux/slices/AllMessages';
import { useDispatch } from "react-redux";
import {isOnline,dateParser} from "../Utils"

const Messages = () => {
const userInfo = useSelector((state)=>state.userInfo)
  const onLineusers = useSelector((state)=>state.OnlineUsers)
const Allchat = useSelector((state)=>state.AllChat)
const AllfollowersFollowing = useSelector((state)=>state.myfollowingFollowers)
const [followersFollowing,setAllfollowersFollowing] = useState(AllfollowersFollowing)
const [selectedChat,setSelectedChat] = useState([])
const [isSeaching,setIsSearching] = useState(false)
  const dispatch = useDispatch();
  const StyledBage = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.4)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));
  const fetchChat = ()=>{
    axios({
    method: "get",
    url: `${SERVER_URL}/api/chat`,
    withCredentials : true
   }).then(({data})=>{
      dispatch(GetAllChat.GetAll(data))
       alert("chat created successfull")
   }).catch((err)=>console.log(err))
  }
    const getSender = (logided,users)=>{
    return users[0]._id === logided ? users[1].pseudo :users[0].pseudo
  }
    const getSenderPicture = (logided,users)=>{
    return users[0]._id === logided ? users[1].picture :users[0].picture
  }
      const getSenderId = (logided,users)=>{
    return users[0]._id === logided ? users[1]._id :users[0]._id
  }
  const handleSearch = async (e)=>{
    setIsSearching(true)
    const searchValue = e.target.value
    if(searchValue !==" "){
       const filteredUser = AllfollowersFollowing?.filter((user)=>user.pseudo.toLowerCase().includes(searchValue.toLowerCase()))
        setAllfollowersFollowing(filteredUser)
        
  } 
  if(!searchValue){
    setIsSearching(false)
  }
  }
  const accessChat = async (userId)=>{
 await axios({
    method: "post",
    url: `${SERVER_URL}/api/chat`,
    data :{userId},
    withCredentials : true
   }).then(()=>{
      fetchChat()
   }).catch((err)=>console.log(err))
  }

  useEffect(()=>{
  const fetchAllMessages = async (chatId)=>{
  await axios({
    method: "get",
    url: `${SERVER_URL}/api/message/${chatId}`,
    withCredentials : true
   }).then(({data})=>{
      dispatch(GetAllMessages.GetAll({data,selectedChat}))
   }).catch((err)=>console.log(err))
  }  
    selectedChat.length !== 0 && fetchAllMessages(selectedChat._id)
  },[selectedChat,dispatch])
  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: "45vw",
          background: "var(--color-white)",
          boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
        }}
      >
        <Stack p={1} sx={{ height: "100vh" }}>
          <Stack>
            <Typography variant="h5" sx={{color:"var(--color-name)"}}>Messages</Typography>
          </Stack>
          <Stack sx={{ width: "100%", marginTop: "0.4rem" }}>
          <input type="text"
           placeholder="Search user to chat"
             onChange ={(e)=>handleSearch(e)}
             className="create search"
             />
          </Stack>
          <Stack>
            <Divider sx={{background:"var(--color-name)"}} />

          </Stack>
          {/* div qui contient les message historique des message */}
          <Divider />
          <Stack
            sx={{
              flexGrow: 1,
              overflowY: "scroll",
              height: "100%",
              padding: "10px 0",
              scrollbarWidth:'thin',
              '&::-webkit-scrollbar':{
                width:"0em"
              },
             '&::-webkit-scrollbar-track':{
                background:"#f1f1f1"
              },
              '&::-webkit-scrollbar-thumb':{
                backgroundColor:"#888"
              },
              '&::-webkit-scrollbar-thumb:hover':{
                 background:"#555",
                 width:"0.4em"
              },
            }}
          >
            <SimpleBarStyle timeout={500} clickOnTrack={false}>
            <>
              <Typography variant="body1" color="var(--color-name)">Chats</Typography>
            {
              !isSeaching && Allchat.map((chat)=>(
                    <Box
                    key={chat._id}
                sx={{
                  width: "100%",
                  borderRadius: 1,
                  backgroundColor:selectedChat?._id === chat._id ? "var(--color-light)":"var(--color-white)",
                  color:"var(--color-name)",
                  marginBottom: 1,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  "&:hover":{
                    backgroundColor:"var(--color-light)"
                  }
                }}
                p={1}
                onClick={()=>setSelectedChat(chat)}
              >
                {!chat.isGroupChat}<Stack
                  direction="row"
                  alignItems={"center"}
                  justifyContent="space-between"
                  spacing={2}
                >
                  <StyledBage
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant={isOnline(getSenderId(userInfo._id,chat.users),onLineusers) ? "dot":""}
                  >
                    <Avatar src={!chat.isGroupChat ? (getSenderPicture(userInfo._id,chat.users)):(" ")} />

                  </StyledBage>
                  <Stack>
                    <Typography variant="subtitle2">{!chat.isGroupChat ? (getSender(userInfo._id,chat.users)):(chat.chatName)}</Typography>
                    <Typography variant="caption">{chat.latestMessage?.message}</Typography>
                  </Stack>
                </Stack>
                <Stack
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography fontWeight={"700"} variant="caption">
                  {dateParser(chat.latestMessage?.createdAt)}
                  </Typography>
                  <Typography variant="button">
                    <Badge color="info" badgeContent={100}></Badge>
                  </Typography>
                </Stack>
              </Box>
                ))
            }
            </>
            <>
            <Divider sx={{background:"var(--color-name"} } />
            <Typography variant="caption" color="var(--color-name)">following and follower</Typography>
            {
              followersFollowing && (

              followersFollowing.map((user)=>(

                    <Box
                    key={user._id}
                sx={{
                  width: "100%",
                  borderRadius: 1,
                  backgroundColor:"var(--color-white)",
                  color:"var(--color-name)",
                  marginBottom: 1,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  "&:hover":{
                    backgroundColor:"var(--color-light)"
                  }
                }}
                p={1}
                onClick={()=>accessChat(user._id)}
              >
                <Stack
                  direction="row"
                  alignItems={"center"}
                  justifyContent="space-between"
                  spacing={2}
                >
                  <StyledBage
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant={isOnline(user._id,onLineusers) ? "dot":""}
                  >
                    <Avatar src={user.picture} />
                  </StyledBage>
                  <Stack>
                    <Typography variant="subtitle2">{user.pseudo}</Typography>
                    <Typography variant="caption">{user.email}</Typography>
                  </Stack>
                </Stack>
                <Stack
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography fontWeight={"700"} variant="caption">
                    3:33
                  </Typography>
                  <Typography variant="button">
                    <Badge color="info" badgeContent={100}></Badge>
                  </Typography>
                </Stack>
              </Box>
                  ))

                )
            }
            </>
              {
                followersFollowing.length === 0 && <div>No yet user avaible to chat</div>
              }
            </SimpleBarStyle>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};
export default Messages;
