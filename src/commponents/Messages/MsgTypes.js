import React, { useState } from "react";
import {
  Divider,
  Stack,
  Typography,
  Box,
  Link,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DotsThreeVertical, DownloadSimple, Image } from "phosphor-react";
import { Message_options } from "../../data";
// text message
const TextMsg = ({ el }) => {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"} key={Math.random()}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? "var(--color-white)"
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
          maxWidth: "24rem",
          position:"relative",
          wordBreak:"break-all",
          minWidth:"5rem"
        }}
      >
        <Typography
          variant="body2"
          color={el.incoming ? "var(--color-name)" : "#fff"}
        >
          {el.message}
        </Typography>
      </Box>
      <MessageOptions />
    </Stack>
  );
};

//time line
const TimeLine = ({ el }) => {
  return (
    <Stack
      key={el.message}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Divider width="46%" sx={{backgroundColor:"var(--color-name)"}} />
      <Typography variant="caption" sx={{ color: "var(--color-name)" }}>
        {el.text}
      </Typography>
      <Divider width="46%" sx={{backgroundColor:"var(--color-name)"}}/>
    </Stack>
  );
};

const MediaMsg = ({ el }) => {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"} key={Math.random()}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? "var(--color-white)"
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
          maxWidth: "24rem",
        }}
      >
        <Stack spacing={1}>
          <img
            src={el.img}
            alt={el.message}
            style={{ maxHeight: 210, borderRadius: "10px" }}
          />
          <Typography
            variant="body2"
            color={el.incoming ? "var(--color-name)" : "#fff"}
          >
            {el.message}
          </Typography>
        </Stack>
      </Box>
      <MessageOptions />
    </Stack>
  );
};
 // repley message
const ReplyMsg = ({ el }) => {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"} key={Math.random()}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? "var(--color-white)"
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
          maxWidth: "24rem",
        }}
      >
        <Stack spacing={2}>
          <Stack
            p={2}
            direction="colmun"
            spacing={3}
            alignItems="center"
            sx={{
              backgroundColor: el.incoming
                ? theme.palette.primary.main
                : "var(--color-white)",
              borderRadius: 1,
            }}
          >
            <Typography
              variant="body2"
              color={el.incoming ? "var(--color-name)" : "var(--color-name)"}
            >
              {el.message}
            </Typography>
          </Stack>
          <Typography
            variant="body2"
            color={el.incoming ? "var(--color-name)" : "var(--color-name)"}
          >
            {el.reply}
          </Typography>
        </Stack>
      </Box>
      <MessageOptions />
    </Stack>
  );
};
const LinkMsg = ({ el }) => {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"} key={Math.random()}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? "var(--color-white)"
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
          maxWidth: "24rem",
        }}
      >
        <Stack spacing={2}>
          <Stack
            p={1}
            spacing={3}
            alignItems="start"
            sx={{
              backgroundColor: "var(--color-white)",
              borderRadius: 1,
            }}
          >
            <img
              src={el.preview}
              alt={el.message}
              style={{ maxHeight: 210, borderRadius: "10px" }}
            />
            <Stack spacing={2}>
              <Typography variant="subtitle2">Create chat app</Typography>
              <Typography
                variant="subtitle2"
                component={Link}
                to="https://www.youtube.com"
              >
                www.youtybe.com
              </Typography>
            </Stack>
            <Typography
              variant="body2"
              color={el.incoming ? "var(--color-name)" : "#fff"}
            >
              {el.message}
            </Typography>
          </Stack>
        </Stack>
      </Box>
      <MessageOptions />
    </Stack>
  );
};

const DocMsg = ({ el }) => {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"} key={Math.random()} >
      <Box
        p={1}
        sx={{
          backgroundColor: el.incoming
            ? "var(--color-white)"
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
          maxWidth: "24rem",
        }}
      >
        <Stack spacing={2}>
          <Stack
            p={1}
            spacing={3}
            alignItems="center"
            direction={"row"}
            sx={{
              backgroundColor: "var(--color-white)",
              borderRadius: 1,
            }}
          >
            <Image size={48} />
            <Typography
              variant="caption"
             color={el.incoming ? "var(--color-name)" : "#fff"}
            >
              document.png
            </Typography>
            <IconButton>
              <DownloadSimple />
            </IconButton>
          </Stack>
          <Typography
            variant="body2"
            color={el.incoming ? "var(--color-name)" : "#fff"}
          >
            {el.message}
          </Typography>
        </Stack>
      </Box>
      <MessageOptions />
    </Stack>
  );
};
const MessageOptions = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
            <MenuItem onClick={handleClick} key={Math.random()} >{el.title}</MenuItem>
          ))}
        </Stack>
      </Menu>
    </>
  );
};
export { TimeLine, TextMsg, MediaMsg, ReplyMsg, LinkMsg, DocMsg };
