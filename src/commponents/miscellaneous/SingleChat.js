import React, { useEffect, useState } from "react"
import { Text, Box } from "@chakra-ui/layout"
import { IconButton, FormControl } from "@chakra-ui/react"
import {whoSelected,isOnline,dateParser} from "../Utils"
import UpdateGroupChat from "./UpdateGroupChat"
import ProfileModal from "./ProfileModal"
import { useSelector } from "react-redux"
import ScrollableChat from "./ScrollableChat"
import { ChatState } from "../../context/ChatProvider"
import { SERVER_URL } from '../../Domain';
import { Spinner, Input, useToast,Button} from "@chakra-ui/react"
import {Avatar} from "@chakra-ui/react"
import {GetAllChat} from "../../redux/slices/AllChat";
import axios from "axios"
import {useDispatch} from "react-redux"
var selectedChatCompre
const SingleChat = ({ fetchAgain, setfetchAgain,socket }) => {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [newmessage, setnewmessage] = useState()
    const [istyping,setIstyping]=useState(false)
    const [typinginfo,settypinginfo]=useState()
    const dispatch = useDispatch()
    const onLineusers = useSelector((state)=>state.OnlineUsers)
    const toast = useToast()
    const { setSelectedChat, selectedChat, user,setChats } = ChatState()
    const fetchMessages = async () => {
        if (!selectedChat) return;
        setLoading(true)
        await axios({
            method: "get",
            url: `${SERVER_URL}/api/message/${selectedChat._id}`,
            withCredentials: true
        })
            .then(({ data }) => {
                setMessages(data)
                setLoading(false)

                socket.emit("join chat",selectedChat._id,user._id)
            })
            .catch((error) => {
                setLoading(false)
                toast({
                    title: "error occured",
                    description: "fail to load the messages from load messages",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                    position: "bottom-left",
                });
            })
    }
    //updates all chats========================================================================
const fetchChats = async () => {
      await axios({
        method: "get",
        url: `${SERVER_URL}/api/chat`,
        withCredentials: true,
      })
        .then(({ data }) => {
        dispatch(GetAllChat.GetAll(data))
          setChats(data)
        })
        .catch((error) => {
          toast({
            title: "something went wrang try again from fetchChats",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });
        })
  }
  //==================================================================
    useEffect(() => {
        fetchMessages()
        selectedChatCompre = selectedChat
        settypinginfo({
            user,
            selectedChatCompre
        })
    }, [selectedChat])

    useEffect(()=>{
        socket.on("message received",(data)=>{
            fetchChats()
             if(!selectedChatCompre || selectedChatCompre._id !== data.chat._id){

                
             }else{
                if(data.sender._id !== user._id){
                  setMessages([...messages,data])
                }
             }
        })
    })

    useEffect(()=>{
        socket.on("istyping",(data)=>{
            if(data.user._id === user._id) return
            if(data.selectedChatCompre._id === selectedChatCompre?._id) {
             setIstyping(true)   
            } 
        })
        socket.on("isnottyping",(data)=>{
          setIstyping(false)
        })
    })

    const sendMessage = async (e) => {
        if (e.key === "Enter" && newmessage) {
            socket.emit("notyping",typinginfo)
            setnewmessage("")
            await axios({
                method: "post",
                url: `${SERVER_URL}/api/message`,
                withCredentials: true,
                data: {
                    message: newmessage,
                    chatId: selectedChat._id,
                    type: "msg",
                    incomming: false
                }
            })
                .then(({ data }) => {
                    socket.emit("new message",data)
                    setMessages([...messages, data])
                    fetchChats()
                })
                .catch((error) => {
                    toast({
                        title: "error occured",
                        description: "fail to send the message",
                        status: "error",
                        duration: 2000,
                        isClosable: true,
                        position: "bottom-left",
                    });
                })

        }
    }
const sendMessageButton = async (e) => {
            setnewmessage("")
            socket.emit("notyping",typinginfo)
            await axios({
                method: "post",
                url: `${SERVER_URL}/api/message`,
                withCredentials: true,
                data: {
                    message: newmessage,
                    chatId: selectedChat._id,
                    type: "msg",
                    incomming: false
                }
            })
                .then(({ data }) => {
                    socket.emit("new message",data)
                    setMessages([...messages, data])
                    fetchChats()
                })
                .catch((error) => {
                    toast({
                        title: "warning",
                        description: "can't send empty message ",
                        status: "warning",
                        duration: 2000,
                        isClosable: true,
                        position: "bottom-left",
                    });
                })
    }
    const typingHindler = (e) => {
        setnewmessage(e.target.value)
        //set status if user is typing
        socket.emit("typing",typinginfo)
      //wait 3 second if user is not typing
        setTimeout(() => {
         socket.emit("notyping",typinginfo)
        }, 3000)
    }
    return <>
        {
            selectedChat ? (<>

                <Text
                    fontSize={{ base: "28px", md: "30px" }}
                    pb={3}
                    px={2}
                    width="100%"
                    display="flex"
                    justifyContent={{ base: "space-between" }}
                    alignItems="center"
                >
                    <IconButton
                        display={{ base: "flex", md: "none" }}
                        icon={<i className="ri ri-arrow-left-line"></i>}
                        onClick={() => setSelectedChat("")}
                        color="var(--color-name)"
                        background="var(--color-white)"
                        _hover={{
                        background: "var(--color-light)",
                        color: "white",
                        cursor: "pointer"
                  }}
                    />
                    {
                        !selectedChat.isGroupChat ? (
                            <>  
                                <div style={{display:"flex",gap:"1rem"}}>
                                <Avatar src={whoSelected(user?._id, selectedChat?.users).picture}/>
                                <div>
                                <Text fontSize="1rem" color="var(--color-name)">{whoSelected(user?._id, selectedChat?.users).pseudo}</Text>
                                {isOnline(whoSelected(user?._id, selectedChat?.users)._id,onLineusers) && !istyping && <Text fontSize="0.7rem" color="var(--color-name)">Online</Text>}
                                {istyping && <Text fontSize="0.7rem" color="blue">Typing...</Text>}
                                {!istyping && !isOnline(whoSelected(user?._id, selectedChat?.users)._id,onLineusers) && <Text fontSize="0.7rem" color="var(--color-name)">{dateParser(selectedChat?.updatedAt)}</Text>}
                                </div>
                                </div>
                                <ProfileModal user={whoSelected(user?._id, selectedChat?.users)} />
                            </>
                        ) :
                            (<>
                                {selectedChat.chatName.toUpperCase()}
                                {
                                    <UpdateGroupChat
                                        fetchAgain={fetchAgain}
                                        setfetchAgain={setfetchAgain}
                                        fetchMessages={fetchMessages}
                                    />
                                }

                            </>)
                    }
                </Text>
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-end"
                    padding={3}
                    background="var(--color-light)"
                    width="100%"
                    height="100%"
                    overflowY="hidden"
                >
                    {
                        loading ? <Spinner
                            size={"xl"}
                            alignSelf="center"
                            h={20}
                            w={20}
                            margin="auto"
                        /> :
                            (
                                <div className="messagesbody">
                                    <ScrollableChat messages={messages}/>
                                </div>
                            )
                    }
                    { !loading &&
                    <FormControl onKeyDown={sendMessage} isRequired mt={3} display="flex" gap={2}>
                        <Input variant="filled"
                         background="var(--color-white)"
                         id="input"
                          placeholder="enter a message .... " 
                          onChange={typingHindler} 
                          value={newmessage}
                          color="var(--color-name)"
                          _hover={{
                           background: "var(--color-white)",
                           color:"var(--color-name)",
                           
                               }} 
                        />
                        <Button colorScheme="blue" onClick={()=> sendMessageButton()}>Send</Button>
                    </FormControl>
                }
                </Box>
            </>)
                :
                (<Box
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Text fontSize="2xl" pb={3}>select chat to start chatting</Text>
                </Box>)
        }
    </>
}

export default SingleChat;