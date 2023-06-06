export const dateParser = (num) =>{
let options = {hour : "2-digit", minute:"2-digit",second:"2-digit",weekday:"long",year:"numeric",month:"short",day:"numeric"};

let timestamp = Date.parse(num)

let date = new Date(timestamp).toLocaleDateString('bi-BI',options);

    var now = new Date();
        var to = new Date(num);

        var minute = Math.floor((now - to) / 60000);
        if(minute <= 1){
       return "now"  
        }
         if(minute > 1 && minute <60)
        {
            for (let i = 2 ; i < 60; i++){
              if(minute > 1){
                return (minute + "minute")
               } 
               return -1 ;
             }
           }
     if(minute >= 60 && minute < 1440)
          {
            var heure = Math.floor(minute / 60)
            var min = minute % 60;
            return (heure + "h " +  min +" min ago")
          }
     if(minute >= 1440 && minute < 43200)

          {

            var jour = Math.floor(minute / 60 / 24)
            return (jour + "j ago")
          }

          if( minute > 43200)

          {

           
           return date.toString();
          }




}

export const isEmpty = (value)=>{
return(
    value === undefined ||
     value === null || 
    (typeof value === "object" && Object.keys(value).length === 0)||
    (typeof value === "string" && value.trim().length === 0)
    );
};

const getCookie = (cname)=>{
let name = cname + "=";
let decodedCookie = decodeURIComponent(document.cookie);
let ca  = decodedCookie.split(";")
for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while(c.charAt(0) === " "){
    c = c.substring(1)
    }
    if(c.indexOf(name) === 0){
        return c.substring(name.length,c.length);
    }
    
}
return ""
}

export const checkCookie = () =>{
let jwt = getCookie("jwt");

if (jwt !=="") {
    alert("cookie exit")
}else{
alert("no cookie found")
}

}

export const timestampParser = (num)=>{
    let options = {hour : "2-digit", minute:"2-digit",second:"2-digit",weekday:"long",year:"numeric",month:"short",day:"numeric"};
    let date = new Date(num).toLocaleDateString("bi-BI",options)
    

            var now = new Date();
        var minute = Math.floor((now.getTime() - num) / 60000);
        if(minute <= 1){
         return ("now")  
         
        }
         if(minute > 1 && minute <60)
        {
            for (let i = 2 ; i < 60; i++){
              if(minute > 1){
                return (minute + "minute")
               } 
               return -1 ;
             }
           }
     if(minute >= 60 && minute < 1440)
          {
            var heure = Math.floor(minute / 60)
            var min = minute % 60;
            return (heure + "h " +  min +" min ago")
          }
     if(minute >= 1440 && minute < 43200)

          {

            var jour = Math.floor(minute / 60 / 24)
            return (jour + "j ago")
          }

          if( minute > 43200)

          {

           
            return date.toString()
          }
}


  export const filterpost = (posts, myfollowing, uid) => {
        var filtedPost = [];

        if (myfollowing !=="undefined") { 
         for (let i = 0; i < posts.length; i++) {
          if (
              myfollowing?.includes(posts[i].posterId) ||
            posts[i].likers?.includes(uid) || (posts[i]?.posterId === uid)
          ) {
            filtedPost.push(posts[i]);
          }
        }}
        function arrayUnique(array) {
          var a = array.concat();
          for (var i = 0; i < a.length; ++i) {
            for (var j = i + 1; j < a.length; ++j) {
              if (a[i] === a[j]) a.splice(j--, 1);
            }
          }

          return a;
        }
        filtedPost.sort((a,b)=>{
            return a.likers.length - b.likers.length
        })
      
        var allpost = [...filtedPost,...posts]

        // for(var i = 0 ;i< allpost.length;i++){
        //       allpost[i].comments.reverse()
        //     }
        // allpost.sort(()=> 0.5 - Math.random())
      var AllarrayUnique = arrayUnique(allpost)
        return AllarrayUnique;
      };


export const getCookieComponnent = (name)=>{
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf(";"+ prefix);
    if(begin === -1){
        begin = dc.indexOf(prefix)
        if(begin !== 0) return null;
    }else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin)
        if(end === -1){
            end = dc.length
        }
    }
    return decodeURI(dc.substring(begin + prefix.length,end));
}

//====================================================================
export const followerFollowings = (uid, dataUsers) => {
        var filtredUser = [];
        function arrayUnique(array) {
          var a = array.concat();
          for (var i = 0; i < a.length; ++i) {
            for (var j = i + 1; j < a.length; ++j) {
              if (a[i] === a[j]) a.splice(j--, 1);
            }
          }

          return a;
        }
        for (let i = 0; i < dataUsers.length; i++) {
          if (uid === dataUsers[i]._id) {
            filtredUser = [
              ...dataUsers[i].followers,
              ...dataUsers[i].following,
            ];
          }
        }
        var pureUsers = arrayUnique(filtredUser);
        return pureUsers;
      };
  export const followerFollowingsFull = (dataUsers, filtredUserMerged) => {
        var abc = [];
        for (let i = 0; i < dataUsers.length; i++) {
          for (let k = 0; k < filtredUserMerged.length; k++) {
            if (filtredUserMerged[k] === dataUsers[i]._id) {
              abc.push(dataUsers[i]);
            }
          }
        }
        return abc;
      };

      // console.log(
      //   followerFollowingsFull(
      //     dataUsers,
      //     followerFollowings("5f9eef12beda9f25ccc147dd", dataUsers)
      //   )
      // );

      export const Sender = (uid,senderId)=>(uid!==senderId)

      export const whoSelected = (uid,users)=>{
        const selecedUser = users.find((user)=>user._id !== uid)
        return selecedUser
      }
      export const isOnline = (uid,users)=>{
        const onlineUser = users.filter((user)=>user.userName === uid)
        return onlineUser.length === 1
      }
//=====================================================================================================
 
export const isSameSender = (messages,message,index,userId)=>{
  return(
    index < messages.length - 1 && 
     (messages[index + 1].sender._id !== message.sender._id || 
      messages[index + 1].sender._id === undefined) && 
     messages[index].sender._id !== userId 
  )
}

export const isLastMessage = (messages,index,userId)=>{
  return(
index === messages.length  &&
messages[messages.length - 1].sender._id !== userId &&
messages[messages.length - 1].sender._id
    )
}

export const isSameSenderMargin = (messages,message,index,userId)=>{
  if(
index < messages.length -1 &&
messages[index + 1].sender._id === message.sender._id &&
messages[index].sender._id !== userId
    )
    return 33
  else if(
     (index < messages.length - 1 &&
      messages[index + 1].sender._id !== message.sender._id &&
      messages[index].sender._id !== userId
      )||
     (index === messages.length - 1 && messages[index].sender._id !== userId)
    )
    return 0
  else return "auto"; 
}
export const isSameUser = (messages,message,index)=>{
  return index > 0 && messages[index - 1].sender._id === message.sender._id;
}

export const LongMessage =(message)=>{
  if(message?.length <= 30) return message
  if (message?.length > 30) return message?.substr(0,25).concat("....")
}