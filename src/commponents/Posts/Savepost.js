import React, { useState, useContext, useEffect } from "react";
import { UserinfoAction } from "../../redux/slices/Userinfo";
import { uidContext } from "../AppContext";
import { useDispatch } from "react-redux";
import axios from "axios";
import { SERVER_URL } from "../../Domain";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import MuiAlert from '@mui/material/Alert';
import {isEmpty} from "../Utils"
 
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Savepost = ({ post, userData }) => {
  const uid = useContext(uidContext);
  const [saved, setSaved] = useState(false);
   const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const Save = async (postId, userId) => {
    dispatch(UserinfoAction.SavePost(postId));
    setSaved(true);

    await axios({
      method: "put",
      url: `${SERVER_URL}/api/user/savepost/${userId}`,
      data: { idPostTosave: postId },
      withCredentials: true,
    })
      .then(({ data }) => setOpen(true))
      .catch((err) => console.log(err));
  };
  const Unsave = async (postId, userId) => {
    dispatch(UserinfoAction.UnsavePost(postId));
    setSaved(false);
    await axios({
      method: "put",
      url: `${SERVER_URL}/api/user/unsavepost/${userId}`,
      data: { idPostTounsave: postId },
      withCredentials: true,
    })
      .then(({ data }) => {
       setSaved(false)
       setOpen(true)
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if(!isEmpty(userData)){
     if (userData && userData.saved.includes(post._id)) {
      setSaved(true);
    }  
    }
  }, [post, saved, userData.saved, post._id,userData]);



  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        
      </IconButton>
    </>
  );
  return (
    <div className="bookmark">
      {saved && (
        <i onClick={() => Unsave(post._id, uid)} className="ri-bookmark-fill"></i>
      )}
      {saved === false && (
        <i onClick={() => Save(post._id, uid)} className="ri-bookmark-line"></i>
      )}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={saved ? "post saved sussessifuly":"post unsaved sussessifuly"}
        action={action}
      >
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
         {saved ? "post saved sussessifuly":"post unsaved sussessifuly"}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Savepost;
