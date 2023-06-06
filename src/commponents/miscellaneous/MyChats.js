import React, { useState, useEffect } from "react"
import { ChatState } from "../../context/ChatProvider"
import { useToast, Button, Text, Stack, Avatar,AvatarBadge} from "@chakra-ui/react"
import { Box } from "@chakra-ui/layout"
import { useSelector } from "react-redux"
import { SERVER_URL } from '../../Domain';
import ChatLoading from "./ChatLoading"
import GroupchatModal from "./GroupchatModal"
import axios from "axios"
import { whoSelected,LongMessage,isOnline,dateParser } from "../Utils"
const MyChats = ({ fetchAgain }) => {
  const userInfo = useSelector((state) => state.userInfo)
  const [loggedUser, setLogedUser] = useState()
  const { setSelectedChat, chats, setChats, selectedChat } = ChatState()
    const onLineusers = useSelector((state)=>state.OnlineUsers)
  const toast = useToast()

  const fetchChats = async () => {
    try {
      await axios({
        method: "get",
        url: `${SERVER_URL}/api/chat`,
        withCredentials: true,
      })
        .then(({ data }) => {
          setChats(data)
        })
        .catch((error) => {
          toast({
            title: "something went wrang try again from my chats",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });
        })

    } catch (error) {
      toast({
        title: "something went wrang try again",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  }
  useEffect(() => {
    setLogedUser(userInfo)
    fetchChats()
  }, [fetchAgain])
  return <Box
    display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
    flexDirection="column"
    alignItems="center"
    paddind={3}
    background="var(--color-white)"
    width={{ base: "100%", md: "31%" }}
    overflowY="hidden"
  >
    <Box
      px={3}
      pb={2}
      fontSize={{ base: "20px", md: "25px" }}
      display="flex"
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      color="var(--color-name)"
      borderBottom="1px solid var(--color-light)"
      >
      Chats
      <GroupchatModal>
        <Button
          h="1.5rem"
          width="0.5rem"
          fontSize={{ base: "1rem", md: "1rem", lg: "1rem" }}
          background="var(--color-light)"
          _hover={{
          background: "var(--color-primary)",
          color: "white",
          cursor: "pointer"
          }}
        ><i className="ri ri-add-line"></i></Button>
      </GroupchatModal>
    </Box>
    <Box
      display="flex"
      flexDirection="column"
      paddind={3}
      width="100%"
      height="90%"
      borderRadius="lg"
      overflowY="hidden"
    >
      {
        chats ? (
          <Stack
            overflowY="scroll"
            className="MyChats"
            padding="5px"
          >
            {
              chats.map((chat) => (
                <Box
                  onClick={() => setSelectedChat(chat)}
                  _hover={{
                    background: "var(--color-primary)",
                    color: "white",
                    cursor: "pointer"
                  }}
                  width="100%"
                  key={chat._id}
                  alignItems="center"
                  display="flex"
                  color={selectedChat === chat ? "white" : "var(--color-name)"}
                  background={selectedChat === chat ? "#38b2ac" : "var(--color-light)"}
                  px={3}
                  py={2}
                  mb={3}
                  borderRadius="lg"
                >
                  <Avatar
                    mr={2}
                    size="md"
                    cursor="pointer"
                    name={!chat.isGroupChat ? whoSelected(loggedUser?._id, chat?.users).pseudo : chat.chatName}
                    src={!chat.isGroupChat ? whoSelected(loggedUser?._id, chat?.users).picture : " "}
                  ><AvatarBadge boxSize={!chat.isGroupChat &&
                  isOnline(whoSelected(loggedUser?._id, chat?.users)._id,onLineusers) ? "1rem":"0rem"} bg="green.500"/>
                  </Avatar>
                  <Box width="100%">
                  <Box
                  sx={{display:"flex",
                       alignItems:"center",
                       justifyContent:"space-between",
                       width:"100%"
                      }}
                  >
                    <Text sx={{
                      fontWeight:"bold",
                      color:"var(--color-name)"
                    }}>
                      {
                        !chat.isGroupChat ? (
                          whoSelected(loggedUser?._id, chat?.users).pseudo
                        ) : (chat.chatName)
                      }
                    </Text>
                    <span style={{fontSize:"0.8rem"}}>{dateParser(chat.latestMessage?.updatedAt)}</span>
                    </Box>
                    <Box
                    display="flex"
                    fontSize="sm"
                    gap={1}
                    >
                      <Text>{chat.latestMessage?.sender.pseudo === userInfo.pseudo ? "You": chat.latestMessage?.sender.pseudo}</Text>
                      :
                      <Text>{LongMessage(chat.latestMessage?.message)}</Text>
                    </Box>
                  </Box>
                </Box>
              ))
            }
          </Stack>
        ) : (
          <ChatLoading />
        )
      }
    </Box>

  </Box>
}

export default MyChats;