import React from "react";
import { Stack, Box } from "@mui/material";
// import { Chat_History } from "../../data";
import {
  TimeLine,
  TextMsg,
  MediaMsg,
  ReplyMsg,
  LinkMsg,
  DocMsg,
} from "./MsgTypes";
const Dialogues = ({Chat_History}) => {
  return (
    <Box p={1} height="max-content" width="100%">
      <Stack spacing={3}>
        {Chat_History && Chat_History.map((el) => {
          switch (el.type) {
            case "divider":
              //return divider componnent
              return <TimeLine el={el} />;
            case "msg":
              //return message box by types
              switch (el.subtype) {
                case "img":
                  //message image
                  return <MediaMsg el={el} />;

                case "doc":
                  //message document
                  return <DocMsg el={el} />;
                case "link":
                  //message link
                  return <LinkMsg el={el} />;
                case "reply":
                  //message replyed
                  return <ReplyMsg el={el} />;

                default:
                  //message text
                  return <TextMsg el={el} />;
              }
            default:
              return <></>;
          }
        })}
      </Stack>
    </Box>
  );
};
export default Dialogues;
