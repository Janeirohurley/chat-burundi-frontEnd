import React, { useState, useMemo, useEffect } from "react";
import profile from "../../assets/Images/double-sofa-01.png"
import {
  Avatar,
  Badge,
  Box,
  Fab,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Camera, File, Image, Sticker, User } from "phosphor-react";
// import Converisations from './Converisations';
import Dialogues from "./Dialogues";
// import data from "@emoji-mart/data";
// import Picker from "@emoji-mart/react";
import { Chat_History} from "../../data";
import EmojiPicker from 'emoji-picker-react';

const Bodymessage = () => {
  const [OpenActions, SetOpenActions] = useState(false);
  const [openPicker, SetopenPicker] = useState(false);
  const [message, setMessage] = useState("");
  // create actions
  const Actions = [
    {
      color: "#4da5fe",
      icon: <Image size={24} />,
      y: 102,
      title: "Photo/Video",
    },
    {
      color: "#1b8cfe",
      icon: <Sticker size={24} />,
      y: 172,
      title: "Stickers",
    },
    {
      color: "#0172e4",
      icon: <Camera size={24} />,
      y: 242,
      title: "Image",
    },
    {
      color: "#0159b2",
      icon: <File size={24} />,
      y: 312,
      title: "Document",
    },
    {
      color: "#013f7f",
      icon: <User size={24} />,
      y: 382,
      title: "Contact",
    },
  ];
  const StyledBage = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.4)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  const StyledInput = useMemo(() => styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-input": {
      paddingTop: "12px",
      paddingBottom: "12px",
      paddingLeft: "0.5rem",
      color: "var(--color-name)",
      border: "0.1rem solid var(--color-name)",
      borderRadius: "10px",
      fontSize: "1rem"
    },
  })), []);
  const Typing = () => (<Typography variant="caption">is writting...</Typography>)
  return (
    <Stack>
      <Box sx={{ height: "100%", width: "calc(100vw - 350px)" }}>
        <Stack sx={{ height: "100%", width: "auto", maxHeight: "100vh" }}>
           <Box
            sx={{
              height: 80,
              width: "100%",
              backgroundColor: "var(--color-white)",
              color: "var(--color-name)",
              boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
              padding: "0 10px",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent={"space-between"}
              sx={{ width: "100%", height: "100%" }}
            >
              <Stack direction={"row"} spacing={2}>
                <Box>
                  <StyledBage
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant={"dot"}
                  >
                    <Avatar src={profile} />
                  </StyledBage>
                </Box>
                <Stack spacing={0.2}>
                  <Typography variant="subtitle2">janeiro</Typography>
                  <Typing />
                </Stack>
              </Stack>
              <Stack spacing={3} direction="row" alignItems={"center"}>
                <IconButton
                  sx={{
                    width: "50px",
                    height: "50px",
                    fontSize: "1.2rem",
                    color: "var(--color-name)",
                  }}

                >
                  <i className="ri-notification-3-line"></i>
                </IconButton>
              </Stack>
            </Stack>
          </Box>
          <Box
            id="boxScroll"
            sx={{
              width: "100%",
              flexGrow: 1,
              overflowY: "scroll",
              display: "flex",
              flexDirection: "colmun",
              scrollbarWidth: 'thin',
              '&::-webkit-scrollbar': {
                width: "0em"
              },
              '&::-webkit-scrollbar-track': {
                background: "#f1f1f1"
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: "#888"
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: "#555",
                width: "0.4em"
              },

            }}
            p={2}
          >
            {/*<Converisations />*/}
           <Dialogues Chat_History={Chat_History} />
          </Box>

              <Box
            sx={{
              width: "100%",
              background: "#f8faff",
              boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
              backgroundColor: "var(--color-white)",
              color: "var(--color-name)",
            }}
            p={1}
          >
            <Stack
              direction="row"
              alignItems={"center"}
              spacing={2}
              height="100%"
            >
              <StyledInput
                placeholder="writte a message...."
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                fullWidth
                variant="filled"
                InputProps={{
                  disableUnderline: true,
                  startAdornment: (
                    <Stack sx={{ width: "max-content" }}>
                      <Stack
                        sx={{
                          position: "relative",
                          display: OpenActions ? "inline-block" : "none",
                        }}
                      >
                        {Actions.map((el) => (
                          <Tooltip placement="right" title={el.title}>
                            <Fab
                              sx={{
                                position: "absolute",
                                top: -el.y,
                                background: el.color,
                              }}
                            >
                              {el.icon}
                            </Fab>
                          </Tooltip>
                        ))}
                      </Stack>
                      <InputAdornment>
                        <IconButton
                          onClick={() => SetOpenActions((prev) => !prev)}
                          sx={{
                            width: "50px",
                            height: "50px",
                            fontSize: "1.2rem",
                            color: "var(--color-name)",
                          }}
                        >
                          <i className="ri-link"></i>
                        </IconButton>
                      </InputAdornment>
                    </Stack>
                  ),
                  endAdornment: (
                    <InputAdornment>
                      <IconButton
                        onClick={() => SetopenPicker((a) => !a)}
                        sx={{
                          width: "50px",
                          height: "50px",
                          fontSize: "1.2rem",
                          color: "var(--color-name)",
                        }}
                      >
                        <i className="ri-emotion-happy-line"></i>
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box
                sx={{
                  width: "50px",
                  height: "100%",
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "center",
                }}
                alignItems="center"
              >

                <IconButton
                  sx={{
                    width: "50px",
                    height: "50px",
                    fontSize: "1.2rem",
                    color: "var(--color-name)",
                    marginRight: "50px"
                  }}
                >
                  <i className="ri-send-plane-line"></i>

                </IconButton>
              </Box>
              <Stack
                sx={{
                  display: openPicker ? "inline" : "none",
                  zIndex: 10,
                  position: "fixed",
                  bottom: "4rem",
                  right: "20px",
                }}
              >
                {/* <Picker data={data} onEmojiSelect={(e) => setMessage((c) => c + e.native)} /> */}
                <EmojiPicker 
                emojiStyle="facebook"
                onEmojiClick ={(e) => setMessage((c) => c + e.emoji)}/>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Bodymessage;
