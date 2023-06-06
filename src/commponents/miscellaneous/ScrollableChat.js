import React from "react";
import ScrollableFeed from "react-scrollable-feed"
import { ChatState } from "../../context/ChatProvider"
import {isSameSender, isLastMessage,isSameSenderMargin,isSameUser} from "../Utils"
import {Tooltip} from "@chakra-ui/react"
import {Avatar} from "@chakra-ui/avatar"
const ScrollableChat = ({messages}) => {
    const { user } = ChatState()
    return (
        <ScrollableFeed className="messagesbody">
        {
         messages && messages.map((message,index)=>(
        <div style={{display:"flex"}} key={message._id}>
            {
                (isSameSender(messages,message,index,user._id)

               || isLastMessage(messages,index,user._id)
            )&& (
              <Tooltip
              label={message.sender.pseudo}
              hasArrow
              >
              <Avatar
            marginTop="7px"
            marginRight={1}
            size="sm"
            cursor="pointer"
            name={"message.sender.name"}
            src={message.sender.picture}
              />
              </Tooltip>
            )}
            <span
            style={{
                backgroundColor : `${
                    message.sender._id === user._id ? "var(--color-white)":"#B9F5D0"
                }`,
                borderRadius:"10px",
                padding:"5px 15px",
                maxWidth:"75%",
                minWidth:"60px",
                marginLeft:isSameSenderMargin(messages,message,index,user._id),
                marginTop:isSameUser(messages,message,index,user._id) ? 3 : 10,
                color:`${
                    message.sender._id === user._id ? "var(--color-name)":"black"
                }`,
            }}
            >{message.message}</span>
        </div>
                ))
        }
        </ScrollableFeed>
    )
}
export default ScrollableChat;