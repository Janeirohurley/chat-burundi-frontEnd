import React, { useEffect,useState ,useContext} from "react";
import Helmet from "../commponents/Helmet/Helmet";
import Leftbar from "../commponents/LeftBar/Leftbar";
import Trending from "../commponents/Trendings/Trending";
import Craetepost from "../commponents/Createpost/Createpost";
import Posts from "../commponents/Posts/Posts";
import RightBar from "../commponents/Right/RightBar";
import CustomizeTheme from "../commponents/customize-theme/CustomizeTheme";
import { useSelector } from "react-redux";
import { uidContext } from "../commponents/AppContext";
import { GetAllMyfollowingFollowers } from "../redux/slices/MyfollowingFollowers";
import { useDispatch } from "react-redux";
import {followerFollowings,followerFollowingsFull} from "../commponents/Utils"
const Home = ({socket}) => {
  const [customizeTheme,setcustomizeTheme] = useState(false)
  const user = useSelector((state) => state.userInfo);
  const usersData = useSelector((state) => state.getusers)
  const uid = useContext(uidContext)
  const dispatch = useDispatch();


//=============================================================================================
useEffect(()=>{
dispatch(GetAllMyfollowingFollowers.GetAll(followerFollowingsFull(usersData,followerFollowings(uid,usersData))));
})
//============================================================================================
useEffect(()=>{
  if(socket && user && user.pseudo){
  socket.emit("newuser",user._id)
}
if(uid ==="no token"){
  window.location = "/login"
}
},[socket,user.pseudo,user,uid])

  useEffect(() => {
    const menuItem = document.querySelectorAll(".menu-item ");
    const ChangeActiveItem = () => {
      menuItem.forEach((item) => {
        item.classList.remove("active");
      });
    };
    menuItem.forEach((item) => {
      item.addEventListener("click", () => {
        ChangeActiveItem();
        item.classList.add("active");
      });
    });
    // getting colorMode
        var root = document.querySelector(":root")
  var colorModel = JSON.parse(localStorage.getItem(`${user._id}`))
  if(colorModel){
    if(colorModel.primaryHue){
    root.style.setProperty("--color-primary-hue",colorModel.primaryHue)
   } 
   if(colorModel.font_size){document.querySelector("html").style.fontSize=colorModel.font_size};
   if(colorModel.lightcolorlightness){root.style.setProperty("--light-color-lightness",colorModel.lightcolorlightness)}
   if(colorModel.whitecolorlightness){root.style.setProperty("--white-color-lightness",colorModel.whitecolorlightness)}
   if(colorModel.darkcolorlightness){root.style.setProperty("--dark-color-lightness",colorModel.darkcolorlightness) }
   if(colorModel.colornamelightness){root.style.setProperty("--color-name-lightness",colorModel.colornamelightness) }

  }
   
  });
  return (
    <>

       {
         uid !=="no token" &&  uid !== null &&  <Helmet title={"Home"}>
          <main>
            <div className="container">
              {/* ======left======= */}
              <Leftbar user={user}  setcustomizeTheme={setcustomizeTheme} socket={socket}/>

              {/* ======middle======= */}
              <div className="middle">
                {/* trendings */}
                <Trending />

                {/* create post */}
                <Craetepost user={user} socket={socket}/>
                {/* POSTS */}
                <Posts socket={socket} type={"home"}/>
              </div>
              {/* ======right======= */}

              <RightBar user={user}/>
            </div>
          </main>
         {customizeTheme &&<CustomizeTheme
          setcustomizeTheme={setcustomizeTheme} 
           user = {user}
          />}
        </Helmet>
       }
    </>
  );
};
export default Home;
