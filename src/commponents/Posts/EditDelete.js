import React ,{useState}from "react";
import axios from "axios";
import { SERVER_URL } from "../../Domain";
import { fetchAllPostsAction } from "../../redux/slices/Posts";
import { useDispatch } from "react-redux";

const EditDelete = ({userData,commentaire,postId})=>{
	const [edit,setEdit]=useState(false)
	const [tetx,setText]=useState("")
	const dispatch =  useDispatch()
	 const Editcomment = async (commentId, text,postId) => {
	 	if(tetx){
	 	 await axios({
      method: "patch",
      url: `${SERVER_URL}/api/post/edit-comment-post/${postId}`,
      withCredentials: true,
      data: {
             commentId,
             text,
       },
    })
      .then(({data}) => {
      	dispatch(fetchAllPostsAction.EditComment({postId,text,commentId}))
      	setEdit(false)
      })
      .catch((err)=>console.log(err))
	 	}
	 	else{
	 		setEdit(false)
	 	}
	 	
	 }

	 const deletecomment = async (postId,commentId) => {
	 	 await axios({
      method: "patch",
      url: `${SERVER_URL}/api/post/delet-comment-post/${postId}`,
      withCredentials: true,
      data: {
             commentId
       },
    })
      .then(({data}) => {
      	dispatch(fetchAllPostsAction.DeleteComment({postId,commentId}))
      	setEdit(false)
      })
      .catch((err)=>console.log(err))
	 }	
	return(
      <>
        {userData._id === commentaire.commenterId && 
        <>{edit === false && <small><i onClick={()=>setEdit(true)}
         className="ri-edit-line"></i></small>}
        {edit === true && 
                       <>
                        <br/>
                <textarea
                  defaultValue={commentaire.text}
                  onChange={(e) => setText(e.target.value)}
                />
                <button
                  className="btn-new-comm"
                  onClick={() => Editcomment(commentaire._id, tetx,postId)}
                >
                  <i className="ri-check-line"></i>
                </button>
              </>
         }
         </>
     }
              {"  "}
        {userData._id === commentaire.commenterId &&
        <>
         <small><i onClick={()=>deletecomment(postId,commentaire._id)} 
         className="ri-delete-bin-line"></i></small>
         {" "}
         {edit && <small><i onClick={()=>setEdit(false)}className="ri-refresh-line"></i></small>} 
         </>
          }
      </>
)
}

export default EditDelete