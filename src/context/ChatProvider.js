import { createContext, useContext, useState, useEffect } from "react"
import { useSelector} from "react-redux"
const ChatContext = createContext()

const ChatProvider = ({ children }) => {
	const userInfo = useSelector((state) => state.userInfo)
	const [user, setUser] = useState()
	const [selectedChat, setSelectedChat] = useState()
	const [chats, setChats] = useState([])
	useEffect(() => {
		setUser(userInfo)
		if (!userInfo) {
			document.location = "/login"
		}
	}, [userInfo])
	return <ChatContext.Provider value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }}>{children}</ChatContext.Provider>
}
export const ChatState = () => {
	return useContext(ChatContext)
}

export default ChatProvider;