import React, { useState } from "react";
import { DotsThreeVertical } from "phosphor-react";
import { Menu, MenuItem, Stack } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchAllPostsAction } from "../../redux/slices/Posts";
import { SERVER_URL } from "../../Domain";

const PostOptions = ({ post, setUpdated, isUpdated }) => {
  const dispatch = useDispatch();

  const deletePost = async () => {
    if (window.confirm("voulez-vous vraiment supprimer ce post ??")) {
      dispatch(fetchAllPostsAction.DeletePost(post._id));
      await axios({
        method: "delete",
        url: `${SERVER_URL}/api/post/${post._id}`,
        withCredentials: true,
      })
        .then((res) => {
          alert("post was deleted successifull");
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  };

  const Message_options = [
    {
      title: "Delete",
    },
    {
      title: isUpdated ? "Discard" : "Edit",
    },
    {
      title: "Share",
    },
  ];
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClicktwo = (title) => {
    switch (title) {
      case "Delete":
        return deletePost();

      case isUpdated ? "Discard" : "Edit":
        return( handleClose(), setUpdated((isUpdated) => !isUpdated));
      case "Share":
        return alert("Share button");
      default:
        return 0;
    }
  };
  return (
    <>
      <DotsThreeVertical
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        size={20}
        cursor={"pointer"}
      />

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Stack p={1} px={1}>
          {Message_options.map((el) => (
            <MenuItem
              key={Math.random()}
              onClick={() => handleClicktwo(el.title)}
            >
              {el.title}
            </MenuItem>
          ))}
        </Stack>
      </Menu>
    </>
  );
};

export { PostOptions };
