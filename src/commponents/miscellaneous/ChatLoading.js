import React from "react"
import {Stack} from "@chakra-ui/layout"
import{Skeleton} from "@chakra-ui/skeleton"
const ChatLoading = ()=>{
return <Stack>
     <Skeleton height="45px"></Skeleton>
     <Skeleton height="45px"></Skeleton>
     <Skeleton height="45px"></Skeleton>
     <Skeleton height="45px"></Skeleton>
     <Skeleton height="45px"></Skeleton>
     <Skeleton height="45px"></Skeleton>
     <Skeleton height="45px"></Skeleton>
     </Stack>
}

export default ChatLoading