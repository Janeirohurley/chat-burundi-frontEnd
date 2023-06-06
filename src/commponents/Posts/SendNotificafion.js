// import axios from "axios"
// import {SERVER_URL} from '../../Domain'

// export const SendNotification = ({postId,posterId,user}) =>{
//     axios({
//     method: "patch",
//     url: `${SERVER_URL}/api/post/notification/${posterId}`,
//     data :{
//           notifieId:user._id,
//           notifiePseudo: user.pseudo,
//           notification: "like your post",
//           post:postId,
//           status:"not readed",
//     },
//     withCredentials : true
//    }).then((res)=>{
//     console.log(res)
//    }).catch((err)=>console.log(err))
// }