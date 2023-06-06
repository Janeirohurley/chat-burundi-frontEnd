import React, { useState, useEffect } from 'react';
import "./App.css";
import { uidContext } from "./commponents/AppContext"
import Layout from './commponents/Layout/Layout';
import axios from "axios"
import { useDispatch } from "react-redux";
import { UserinfoAction } from "./redux/slices/Userinfo"
import { getusersAction } from './redux/slices/Getusers';
import { GetAllposts } from './redux/slices/Allposts';
import { GetAllChat } from './redux/slices/AllChat';
import { SERVER_URL } from './Domain';

function App() {
  const [uid, setUid] = useState(null)
  const dispatch = useDispatch();

  useEffect(() => { 
    //cette fonction est une fonction qui s'execute chaque fois tu lance un application ou un url partout
    //ou tu vas alors a chaque fois il s'execute il nous donne la possibilite d'avoir un ID d'une personne
    //connceter sur notre site cela veut dire que il verifie bien si tu es bien connecte
    const fetchTocken = async () => {
      await axios({
        method: "get",
        url: `${SERVER_URL}/jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data)
        })
        .catch((error) => {
       // navigate("/login")
      })
    }
    fetchTocken()
    //fetch user data
    const fetchUserData = async () => {
      if (uid) {
        await axios({
          method: "get",
          url: `${SERVER_URL}/api/user/${uid}`,
          withCredentials: true,
        })
          .then((res) => {
            dispatch(UserinfoAction.fetchUserInfo(res.data))
          })
          .catch(() =>   dispatch(UserinfoAction.fetchUserInfo({message :"user not found"})))
      }
    }
    fetchUserData()
    //fetch datas users all
    const fetchUserAllData = async () => {
      if (uid) {
        await axios({
          method: "get",
          url: `${SERVER_URL}/api/user`,
          withCredentials: true,
        })
          .then((res) => {
            dispatch(getusersAction.GetuAllsers(res.data))
          })
          .catch(() => dispatch(getusersAction.GetuAllsers({ message: "no user exist now" })))
      }
    }
    fetchUserAllData()

    //============================================================================================
    //       const fetchUserAllDataPost = async () => {
    //   if (uid) {
    //     await axios({
    //       method: "get",
    //       url: `${SERVER_URL}/api/post`,
    //       withCredentials: true,
    //     })
    //       .then(({data}) => {
    //         dispatch(GetAllposts.GetAll(data))
    //         console.log("fetch posts again")
    //       })
    //       .catch(() => dispatch(GetAllposts.GetAll({ message: "no post exist now" })))
    //   }
    // }
    // fetchUserAllDataPost()
//====================================all message abd chat===========================================  
    const fetchUserAllDataPost = async () => {
      if (uid) {
        await axios({
          method: "get",
          url: `${SERVER_URL}/api/post`,
          withCredentials: true,
        })
          .then(({data}) => {
            dispatch(GetAllposts.GetAll(data))
            console.log("fetch again from app js")
          })
          .catch(() => dispatch(GetAllposts.GetAll({ message: "no post exist now" })))
      }
    }
    fetchUserAllDataPost()  
    //fetch all chats

       const fetchAllMessage = async () => {
      if (uid) {
        await axios({
          method: "get",
          url: `${SERVER_URL}/api/chat`,
          withCredentials: true,
        })
          .then((res) => {
            dispatch(GetAllChat.GetAll(res.data))
          })
          .catch((err) => console.log(err))
      }
    }
    fetchAllMessage()
  },[uid])




  return (
    <uidContext.Provider value={uid}>
      <Layout />
    </uidContext.Provider>
  )

}

export default App;
