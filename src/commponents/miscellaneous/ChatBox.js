import React from "react"
import { Box } from "@chakra-ui/react"
import { ChatState } from "../../context/ChatProvider"
import SingleChat from "./SingleChat"
const ChatBox = ({ fetchAgain, setfetchAgain,socket }) => {
    const { selectedChat } = ChatState()
    return <Box
        display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
        alignItems="center"
        flexDirection="column"
        p={3}
        background="var(--color-white)"
        width={{ base: "100%", md: "68%" }}
    >
        <SingleChat fetchAgain={fetchAgain} setfetchAgain={setfetchAgain} socket={socket}/>
    </Box>
}

export default ChatBox;