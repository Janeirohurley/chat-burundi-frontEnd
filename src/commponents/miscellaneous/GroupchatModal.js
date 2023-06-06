import React, { useState } from "react"
import { useDisclosure } from "@chakra-ui/hooks";
import { SERVER_URL } from '../../Domain';
import axios from "axios"
import UserListItem from "./UserListItem"
import UserBadgeItem from "./UserBadgeItem"
import {
  Modal,
  ModalOverlay, ModalBody, ModalHeader, ModalContent,
  ModalCloseButton, ModalFooter,
  Button, useToast, Input, Box
} from '@chakra-ui/react'
import { ChatState } from "../../context/ChatProvider"
import { FormControl } from "@chakra-ui/form-control"
const GroupchatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [groupchatName, setgroupchatName] = useState()
  const [selectedUsers, setselectedUsers] = useState([])
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [loading, setloading] = useState(false)
  const toast = useToast()
  const { user, chats, setChats } = ChatState()
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
  const handleSubmit = async () => {
    if (!groupchatName || selectedUsers.length === 0) {
      toast({
        title: `Please fill all the filds `,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      return
    }
    try {
      await axios({
        method: "post",
        url: `${SERVER_URL}/api/chat/group`,
        withCredentials: true,
        data: {
          name: groupchatName,
          users: selectedUsers
        }
      })
        .then(({ data }) => {
          setChats([data, ...chats])
          toast({
            title: "Alert",
            description: "group create successfully ",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });
          onClose()
        })
        .catch(({ response }) => {
          toast({
            title: "error while creating group",
            description: response.data,
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
  const handleDelete = (userToremove) => {
    //  	toast({
    //   title:`${userToremove.pseudo} removed `,
    //   status:"success",
    //   duration:5000,
    //   isClosable:true,
    //   position:"bottom-left",
    // });
    setselectedUsers(selectedUsers.filter((user) => user._id !== userToremove._id))
  }
  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: `${userToAdd.pseudo} has already added`,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      return
    }
    setselectedUsers([...selectedUsers, userToAdd])
    toast({
      title: `${userToAdd.pseudo} added`,
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom-left",
    });
  }
  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            sx={{ display: "flex", justifyContent: "center", fontSize: "35px" }}
          >create groupe chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <FormControl>
              <Input placeholder="Groupe name" mb={3}
                onChange={(e) => setgroupchatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input placeholder="users ex. janeiro ,mama,papa" mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Box display="flex" flexWrap="wrap" width="100%">
              {selectedUsers.map((user) => (
                <UserBadgeItem key={user._id} user={user} handleFunction={() => handleDelete(user)} />
              ))}
            </Box>

            {
              loading ? (<div>Loading .... </div>) :

                (
                  searchResult?.slice(0, 4).map((user) => (
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
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>Create Chat</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default GroupchatModal;