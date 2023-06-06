import { Avatar, Box, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { DotsThree, PaperPlane, SmileySad } from 'phosphor-react';
import { dateParser, isEmpty } from "../Utils";
import React, {useState } from 'react';
import Helmet from '../Helmet/Helmet';
import post1 from "../../images/feed-1.jpg"
import { styled, useTheme } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import "./single.css"
import { useDispatch, useSelector } from 'react-redux';
import { actions } from "../../redux/slices/like"
import FollowHandle from "../profile/FollowHandle";
const Single = () => {
    const dispatch = useDispatch()
    const theme = useTheme()
    const params = useParams()
      const posts = useSelector((state) => state.posts);
        const usersData = useSelector((state) => state.getusers);
          const userData = useSelector((state) => state.userInfo);
    console.log(params.id)
    const CommentBody = styled("div")(({ theme }) => ({
        padding: theme.spacing(0, 2),
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        width: "calc(100% - 50px)",
        borderRadius: "10px",
        minHeight: "50px",
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        fontSize: "0.8rem",
        fontWeight: 600
    }))

    const StyledInput = styled(TextField)(({ theme }) => ({
        "& .MuiInputBase-input": {
            paddingTop: "12px",
            paddingBottom: "12px"
        }
    }))

    // const videoHandler = (control) => {
    //     if (control === "play") {
    //         videoRef.current.play();
    //         setPlaying(true);
    //         setTimeout(() => {
    //             videoRef.current.pause();
    //             setPlaying(false);
    //         }, 500000);
    //     } else if (control === "pause") {
    //         videoRef.current.pause();
    //         setPlaying(false);
    //     }
    // };
    // const forward = () => {
    //     videoRef.current.currentTime += 5
    // }
    // const backward = () => {
    //     videoRef.current.currentTime -= 5
    // }
    //======================================================================================
    const nombre = useSelector(state => state.like.likes)
    const [like, setlike] = useState(false)
    const handleLike = (control) => {
        if (control === "like") {
            setlike(true)
            dispatch(actions.increment())
        } else if (control === "unlike") {
            setlike(false)
            dispatch(actions.decrement())
        }
    };
    return (
        <Helmet title="single post">
{/*            <Box sx={{ width: "100%", background: "white", borderRadius: "10px" }} p={2}>
                <Stack width="100%" direction={"row"} justifyContent="space-between">
                    <Stack direction={"row"} spacing={2}>
                        <Avatar />
                        <Stack>
                            <Typography variant="subtitle2">janeiro hurley</Typography>
                            <Typography variant='caption'>12min ago </Typography>
                        </Stack>
                    </Stack>
                    <Stack>
                        <IconButton><DotsThree /></IconButton>
                    </Stack>
                </Stack>

                <Stack marginTop={"10px"} borderRadius="10px" overflow={"hidden"}>

                    <video ref={videoRef}
                        className="video"
                        src={video}
                    ></video>
                    <div className="controlsContainer">
                        <div className="controls">
                            <i className="ri-rewind-line" onClick={backward}></i>
                            {
                                playing ? (<i className="ri-pause-line" onClick={() => videoHandler("pause")}></i>) : (<i className="ri-play-line" onClick={() => videoHandler("play")}></i>)
                            }

                            <i className="ri-speed-line" onClick={forward} ></i>
                        </div>
                    </div>

                </Stack>
                <Stack width="100%" direction={"row"} justifyContent="space-between">
                    <Stack direction={"row"} spacing={1}>
                        <IconButton>

                            <i className="ri-heart-line"></i>
                        </IconButton>
                        <IconButton><i className="ri-chat-3-line"></i></IconButton>
                        <IconButton><i className="ri-share-line"></i></IconButton>
                    </Stack>
                    <Stack>
                        <IconButton><i className="ri-bookmark-line"></i></IconButton>
                    </Stack>
                </Stack>
                <Stack width={"100%"} marginTop="1rem" spacing={2}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} >
                        <Avatar />
                        <CommentBody>Lorem ipsum dolor sit amet consectetur adipisicing elit Praesentium hic nisi dignissimos repellendus quaerat adipisci corporis distinctio et natus a minima minus culpa ad ex voluptatem nihil quidem ab inventore.

                        </CommentBody>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} >
                        <Avatar />
                        <CommentBody>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium hic nisi dignissimos repellendus quaerat adipisci corporis distinctio et natus a, minima minus culpa ad ex voluptatem nihil quidem ab inventore.

                        </CommentBody>
                    </Box>
                    <Stack direction='row' alignItems={'center'} spacing={2} height="100%">
                        <Avatar />
                        <StyledInput placeholder='writte a comment....' fullWidth variant='filled' InputProps={{
                            disableUnderline: true,
                            endAdornment: <InputAdornment><IconButton><SmileySad /></IconButton></InputAdornment>
                        }} />
                        <Box sx={{ width: "50px", height: "100%", background: theme.palette.primary.main, borderRadius: "10px", display: "flex", justifyContent: "center" }} alignItems='center'>
                            <IconButton color="white"><PaperPlane /></IconButton>
                        </Box>
                    </Stack>
                </Stack>
            </Box>*/}
           {
            posts.map((post)=>(
               post._id === params.id &&
                <Box sx={{ width: "100%", background: "white", borderRadius: "10px" }} p={2}>
                <Stack width="100%" direction={"row"} justifyContent="space-between">
                    <Stack direction={"row"} spacing={2}>
                        <Avatar src={post1}
                  alt="ss" />
                        <Stack>
                            <Typography variant="subtitle2">
                            {!isEmpty(usersData[0]) &&
                      usersData
                        .map((user) => {
                          if (user._id === post.posterId) return user.pseudo;
                          else return null;
                        })
                        .join("")}{" "}
                    {post.posterId !== userData._id && (
                      <FollowHandle idTofollow={post.posterId} type={"card"} />
                    )}
                    </Typography>
                            <Typography variant='caption'>{dateParser(post.createdAt)} </Typography>
                        </Stack>
                    </Stack>
                    <Stack>
                        <IconButton><DotsThree /></IconButton>
                    </Stack>
                </Stack>
                <Stack marginTop={"10px"} borderRadius="10px" overflow={"hidden"}>
                 <Typography variant='caption'>{post.message}</Typography>
                </Stack>
                <Stack marginTop={"10px"} borderRadius="10px" overflow={"hidden"}>
                    {post.picture && <img src={post.picture} alt={"post-pict"} />}
                    {post.video && <video src={post.video} alt={"post-pict"} />}
                </Stack>
                <Stack width="100%" direction={"row"} justifyContent="space-between">
                    <Stack direction={"row"} spacing={1}>
                        {
                            like ? <IconButton onClick={() => handleLike("unlike")}><i className="ri-heart-fill" title={`${nombre}`}></i></IconButton> :
                                <IconButton onClick={() => handleLike("like")}><i className="ri-heart-line" title={`${nombre}`}></i></IconButton>

                        }
                        <IconButton><i className="ri-chat-3-line"></i></IconButton>
                        <IconButton><i className="ri-share-line"></i></IconButton>
                    </Stack>
                    <Stack>
                        <IconButton><i className="ri-bookmark-line"></i></IconButton>
                    </Stack>
                </Stack>
                <Stack width={"100%"} marginTop="1rem" spacing={2}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} >
                        <Avatar />
                        <CommentBody>Lorem ipsum dolor sit amet consectetur adipisicing elit Praesentium hic nisi dignissimos repellendus quaerat adipisci corporis distinctio et natus a minima minus culpa ad ex voluptatem nihil quidem ab inventore.

                        </CommentBody>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} >
                        <Avatar />
                        <CommentBody>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium hic nisi dignissimos repellendus quaerat adipisci corporis distinctio et natus a, minima minus culpa ad ex voluptatem nihil quidem ab inventore.

                        </CommentBody>
                    </Box>
                    <Stack direction='row' alignItems={'center'} spacing={2} height="100%">
                        <Avatar />
                        <StyledInput placeholder='writte a comment....' fullWidth variant='filled' InputProps={{
                            disableUnderline: true,
                            endAdornment: <InputAdornment><IconButton><SmileySad /></IconButton></InputAdornment>
                        }} />
                        <Box sx={{ width: "50px", height: "100%", background: theme.palette.primary.main, borderRadius: "10px", display: "flex", justifyContent: "center" }} alignItems='center'>
                            <IconButton color="white"><PaperPlane /></IconButton>
                        </Box>
                    </Stack>
                </Stack>
            </Box>

                ))
           }
        </Helmet >
    )

}
export default Single;