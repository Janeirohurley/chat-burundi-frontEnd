
import axios from 'axios';
import Cookies from 'js-cookie';
import { SERVER_URL } from '../Domain';
const Logout = () => {
const removeCookie = (key)=>{
    if(window !== "undefined"){
        Cookies.remove(key,{expires:1})
    }

}

    const logout = async () => {
        await axios({
            method:"get",
            url: `${SERVER_URL}/api/user/logout`,
            withCredentials: true,
        })
        .then(()=>{
            removeCookie("jwt")
            localStorage.removeItem("token")
            window.location.reload()
        })
        .catch((err)=>console.log(err))
    }
    logout();
}
export default Logout;