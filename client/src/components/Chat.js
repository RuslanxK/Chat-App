import React, { Fragment, useContext } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContex";
import UserChat from "./chat/UserChat";
import PotentialChats from "./chat/PotentialChats";
import ChatBox from "./chat/ChatBox";

const Chat = () => {
  const { userChats, isUserChatsLoading, userChatsError, updateCurrentChat } = useContext(ChatContext);

  const { user } = useContext(AuthContext);

  const chats = userChats?.map((chat, index) => {
    return (
      <Stack key={index} onClick={() => updateCurrentChat(chat)}>
        <UserChat chat={chat} user={user} />
      </Stack>
    );
  });

  return (
    <Box display="flex" width="100%" justifyContent="space-between">
      <Stack
        width="400px"
        height="90vh"
        backgroundColor="#1a1919"
        display="flex"
        flexDirection="row-reverse"
        justifyContent="space-between"
      >
        {isUserChatsLoading && (
          <Typography variant="span" component="span">
            Loading chats...
          </Typography>
        )}
        <Stack width="100%">{chats}</Stack>

        <Stack backgroundColor="#192230">
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
