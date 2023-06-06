import React, { useState } from "react"
import { Box, Text } from "@chakra-ui/layout";
import axios from "axios"
import { Spinner } from "@chakra-ui/spinner"
import {
  Tooltip,
  Menu, MenuButton, Avatar,
  MenuList, MenuItem, Drawer,
  DrawerOverlay, DrawerContent,
  DrawerHeader,
  DrawerBody,
  useToast,
  Input,
} from '@chakra-ui/react'
import ProfileModal from "./ProfileModal";
import { useDisclosure } from "@chakra-ui/hooks";
import { Button } from "@chakra-ui/button";
import Logout from "../Logout"
import ChatLoading from "./ChatLoading"
import UserListItem from "./UserListItem"
import { ChatState } from "../../context/ChatProvider"
import { SERVER_URL } from '../../Domain';
const SideDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [loading, setloading] = useState(false)
  const [loadingChat, setloadingChat] = useState()
  const { user, setSelectedChat, chats, setChats } = ChatState()
  const toast = useToast()
  const accessChat = async (userId) => {
    try {
      setloadingChat(true)
      await axios({
        method: "post",
        url: `${SERVER_URL}/api/chat`,
        withCredentials: true,
        data: { userId: userId }
      })
        .then(({ data }) => {
          if (!chats.find((chat) => chat._id === data._id)) setChats([data, ...chats])
          setSelectedChat(data)
          setloadingChat(false)
          onClose()
        })
        .catch((error) => {
          setloadingChat(false)
          toast({
            title: "something went wrang try again",
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


  //search user to chat
  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please enter something to search",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom-left",
      });
      return;
    }
    try {
      setloading(true)
      await axios({
        method: "get",
        url: `${SERVER_URL}/api/user/search/user?search=${search}`,
        withCredentials: true,
      })
        .then(({ data }) => {
          setloading(false)
          const dataFilted = data.filter((usersearch) => usersearch.followers?.includes(user._id))
          setSearchResult(dataFilted)
          console.log(dataFilted)
        })
        .catch((error) => {
          setloading(false)
          toast({
            title: "something went wrang try again",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });
          // navigate("/login")
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
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: " 5px 10px 5px 10px",
        background: "var(--color-white)",

      }}
    >
      <Tooltip hasArrow label='Search user to chat' bg='var(--color-white)' color="var(--color-name)">
        <Button 
        _hover={{
        background: "var(--color-white)",
        color: "white",
        cursor: "pointer"
                  }}
        variant="ghost" onClick={onOpen}>
          <i className="ri ri-search-line" style={{color:"var(--color-name)"}}></i>
          <Text display={{ base: "none", md: "flex" }} px="4" color="var(--color-name)">Search User</Text>
        </Button>
      </Tooltip>
      <Text fontSize="2xl" color="var(--color-name)">Chat burundi</Text>
      <div>
        <Menu>
          <MenuButton
          _hover={{
           background: "var(--color-light)",
           color: "white",
           cursor: "pointer"
            }}
           bg='var(--color-white)' as={Button} rightIcon={<i className="ri-arrow-drop-down-line"></i>}>
            <Avatar size="sm" name={user.pseudo} src={user.picture} />
          </MenuButton>
          <MenuList>
            <ProfileModal user={user}>
              <MenuItem>profile</MenuItem>
            </ProfileModal>
            <MenuItem onClick={() => Logout()}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </Box>
    <Drawer 
    placement="left" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px"> Search users</DrawerHeader>
        <DrawerBody>
          <Box 
          display="flex" paddingBottom={2}>
            <Input
              placeholder="Search by email or usename"
              mr={2}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button onClick={handleSearch}>Go</Button>
          </Box>
          {
            loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  handleFunction={() => accessChat(user._id)}
                  user={user}
                />
              ))
            )
          }
          {
            loadingChat && <Spinner ml='auto' d='flex' />
          }
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  </>
}

export default SideDrawer;