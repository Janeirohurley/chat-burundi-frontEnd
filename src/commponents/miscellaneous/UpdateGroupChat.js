import React, { useState } from "react"
import { useDisclosure } from "@chakra-ui/hooks";
import { IconButton } from "@chakra-ui/button"
import { ChatState } from "../../context/ChatProvider"
import UserBadgeItem from "./UserBadgeItem"
import { Spinner } from "@chakra-ui/spinner"
import axios from "axios"
import UserListItem from "./UserListItem"
import { SERVER_URL } from '../../Domain';
import {
  Modal, ModalOverlay, ModalBody, ModalHeader, ModalContent,
  ModalCloseButton, ModalFooter, Button, useToast, Box, FormControl, Input
} from '@chakra-ui/react'
const UpdateGroupChat = ({ fetchAgain, setfetchAgain,fetchMessages }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { setSelectedChat, selectedChat, user } = ChatState()
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [loading, setloading] = useState(false)
  const [groupName, setgroupName] = useState()
  const [renamelaoding, setrenamelaoding] = useState(false)
  const toast = useToast()
  const handleRemove = async (userToremove) => {
    if (selectedChat.groupAdmin._id !== user._id && userToremove._id !== user._id) {
      toast({
        title: "only admin can remove sommeone",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom-left"
      })
      return
    }
    setloading(true)
    await axios({
      method: "put",
      url: `${SERVER_URL}/api/chat/groupremove`,
      withCredentials: true,
      data: {
        chatId: selectedChat._id,
        userId: userToremove._id
      }
    }).then(({ data }) => {
      console.log(data)
      userToremove._id === user._id ? setSelectedChat() : setSelectedChat(data)
      fetchMessages()
      setfetchAgain(!fetchAgain)
      setloading(false)
      toast({
        title: "add removed successifull",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom-left",
      });
    }).catch((error) => {
      console.log(error)
      toast({
        title: "something went wrong try again",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom-left",
      });
    })
    setloading(false)
  }
  const handleGroup = async (userToAdd) => {
    if (selectedChat.users.find((u) => u._id === userToAdd._id)) {
      toast({
        title: `${userToAdd.pseudo} has already in group`,
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom-left",
      });
      return
    }
    setloading(true)
    await axios({
      method: "put",
      url: `${SERVER_URL}/api/chat/addTogroup`,
      withCredentials: true,
      data: {
        chatId: selectedChat._id,
        userId: userToAdd._id
      }
    }).then(({ data }) => {
      setSelectedChat(data)
      setfetchAgain(!fetchAgain)
      setloading(false)
      toast({
        title: "add user successifull",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom-left",
      });
    }).catch((error) => {
      setloading(false)
      toast({
        title: "something went wrang try again",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom-left",
      });
    })

  }
  //==============================================================================================================
  const hamdleRename = async () => {
    if (!groupName || groupName === " ") return
    try {
      setrenamelaoding(true)
      await axios({
        method: "put",
        url: `${SERVER_URL}/api/chat/rename`,
        withCredentials: true,
        data: {
          chatId: selectedChat._id,
          chatName: groupName
        }
      })
        .then(({ data }) => {
          setSelectedChat(data)
          setfetchAgain(!fetchAgain)
          setrenamelaoding(false)
          setgroupName("")
        })
        .catch((error) => {
          setrenamelaoding(false)
          toast({
            title: "error occured",
            description: error.response.data.message,
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
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  }
  const handleSearch = async (query) => {
    setSearch(query)
    if (!query) return
    setloading(true)
    try {
      await axios({
        method: "get",
        url: `${SERVER_URL}/api/user/search/user?search=${search}`,
        withCredentials: true,
      })
        .then(({ data }) => {
          setloading(false)
          const dataFilted = data.filter((usersearch) => usersearch.following?.includes(user._id))
          setSearchResult(dataFilted)
        })
        .catch((error) => {
          setloading(false)
          toast({
            title: "error occured",
            description: "error to load the search results",
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
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  }

  return <>
    <IconButton d={{ base: "flex" }} icon={<i className="ri-eye-line" />} onClick={onOpen} />
    <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          sx={{ display: "flex", justifyContent: "center", fontSize: "20px" }}
        >{selectedChat.chatName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box display="flex" flexWrap="wrap" width="100%">
            {
              selectedChat.users.map((user) => (
                <UserBadgeItem key={user._id} user={user} handleFunction={() => handleRemove(user)} />
              )
              )
            }
          </Box>
          <>
            {
              user._id === selectedChat.groupAdmin._id &&
              <>
                <FormControl display="flex">
                  <Input placeholder="chat Name" mb={1}
                    onChange={(e) => setgroupName(e.target.value)}
                  />
                  <Button variant="solid"
                    ml={1} isLoading={renamelaoding}
                    onClick={hamdleRename}
                    colorScheme="blue"
                  >update</Button>
                </FormControl>
                <FormControl d="flex">
                  <Input placeholder="add a user to group" mb={1}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </FormControl>
              </>
            }
          </>
          {
            loading ? (<Spinner size="lg" />) :

              (
                searchResult?.slice(0, 3).map((user) => (
                  <UserListItem
                    key={user._id}
                    handleFunction={() => handleGroup(user)}
                    user={user}
                  />
                ))
              )
          }
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={() => handleRemove(user)}>leave group</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
}
export default UpdateGroupChat;