import React, { Fragment, useContext } from "react";
import { Box, Stack, Typography, useMediaQuery} from "@mui/material";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContex";
import UserChat from "./chat/UserChat";
import PotentialChats from "./chat/PotentialChats";
import ChatBox from "./chat/ChatBox";
import { useTheme } from '@mui/material/styles';


const Chat = () => {
  const { userChats, isUserChatsLoading, userChatsError, updateCurrentChat, potentialChats } = useContext(ChatContext);

  const { user } = useContext(AuthContext);
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  const chats = userChats?.map((chat, index) => {
    return (
      <Stack key={index} onClick={() => updateCurrentChat(chat)}>
        <UserChat chat={chat} user={user} />
      </Stack>
    );
  });

  return (
    <Box display="flex" width="100%" justifyContent="space-between" flexDirection={ isMobile ? "column" : "row"}>
      <Stack
        width={ isMobile ? "100%" : "29vw"}
        height="90vh"
        sx={{overflowY: "scroll"}}
        display="flex"
        flexDirection={"row-reverse"}
        justifyContent="space-between"
        alignItems="flex-start"
      >
        {isUserChatsLoading && (
          <Typography variant="span" component="span">
            Loading chats...
          </Typography>
        )}
        <Stack width="100%" height="100%" p={isMobile ? 1 : null} ml={ potentialChats?.length >= 1 || !isMobile ? 16 : 0 }>{chats}</Stack>

        <Stack backgroundColor="#245DE6" height="90vh" position={ isMobile ? null : "fixed"} left="0">
          <PotentialChats />
        </Stack>
        {userChatsError && (
          <Typography variant="span" component="span">
            Couldn't load chats...
          </Typography>
        )}
      </Stack>

      <Stack>
        <ChatBox />
      </Stack>
    </Box>
  );
};

export default Chat;
