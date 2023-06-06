import React,{useEffect,useState} from "react";
import Helmet from "../commponents/Helmet/Helmet";
import {ChatState} from "../context/ChatProvider"
import {Box} from "@chakra-ui/layout";
import SideDrawer from "../commponents/miscellaneous/SideDrawer"
import ChatBox from "../commponents/miscellaneous/ChatBox"
import MyChats from "../commponents/miscellaneous/MyChats"
import {ChakraProvider,extendTheme} from "@chakra-ui/react"
const Messenger = ({ socket }) => {
  useEffect(() => {
     document.querySelector("body").removeAttribute("class")
      localStorage.removeItem("chakra-ui-color-mode")
  },)
  const { user} = ChatState()
  const [fetchAgain,setfetchAgain] = useState(false)
  const [theme,setTheme] = useState()
useEffect(()=>{
const newtheme = extendTheme({
  styles: {
    global: {
      body: {
  color: "var(--color-dark)",
  background: "var(--color-light)",
      },
    },
  },
  config: {
    initialColorMode: localStorage.getItem('chakra-ui-color-mode')||"var(--color-light)",
  },
});
setTheme(newtheme)
},[])

useEffect(()=>{
  if(socket && user && user.pseudo){
  socket.emit("newuser",user._id)
}
},[socket,user?.pseudo,user])

  return (
    <Helmet title={"messenger"}>
    <ChakraProvider  theme={theme}>
    <div style={{width:"100%"}} className="messanger">
      {user && <SideDrawer/>}
      <Box
      sx={{display:"flex",
      justifyContent:"space-between",
      width:"100%",
      height:"91.5vh",
      background:"var(--color-light)",
      border:"2px solid var(--color-light)",
      gap:"0px"
       }}
      >
        {user && <MyChats fetchAgain={fetchAgain}/>}
        {user && <ChatBox fetchAgain={fetchAgain} setfetchAgain={setfetchAgain} socket={socket}/>}
      </Box>
    </div>
    </ChakraProvider>
    </Helmet>
  );
};
export default Messenger;
