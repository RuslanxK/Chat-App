import { Stack, Typography, Button, IconButton } from "@mui/material";
import React, { useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContex";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import moment from "moment";
import InputEmoji from "react-input-emoji";
import SendIcon from "@mui/icons-material/Send";

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const {
    currentChat,
    messages,
    isMessagesLoading,
    messagesError,
    sendTextMessage,
  } = useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const [textMessage, setTextMessage] = useState("");
  const { onlineUsers } = useContext(ChatContext);

  const scroll = useRef();

  const isOnline = onlineUsers?.some(
    (u) => u?.userId === recipientUser?.user?._id
  );

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!recipientUser)
    return (
      <Typography component="span" variant="span">
        No conversation selected yet...
      </Typography>
    );

  if (isMessagesLoading)
    return (
      <Typography component="span" variant="span">
        Loading Messages...
      </Typography>
    );

  if (messagesError)
    return (
      <Typography component="span" variant="span">
        Something went wrong...
      </Typography>
    );

  const Messages = messages?.map((message, index) => {
    return (
      <Stack
        ref={scroll}
        display="flex"
        pb={2}
        pl={7}
        pr={7}
        alignItems={message?.senderId === user?._id ? "flex-end" : "flex-start"}
        mb={1}
      >
        <Stack
          p={1}
          pl={2}
          pr={2}
          borderRadius="5px"
          key={index}
          backgroundColor={
            message?.senderId === user?._id ? "#245DE6" : "white"
          }
          width="fit-content"
          color={message?.senderId === user?._id ? "white" : "black"}
        >
          <Typography component="span" variant="span" mb={0.5}>
            {message.text}
          </Typography>
          <Typography
            component="span"
            variant="span"
            color={message?.senderId === user?._id ? "#e3e1e1" : "gray"}
            fontSize="12px"
          >
            {moment(message.createdAt).calendar()}
          </Typography>
        </Stack>
      </Stack>
    );
  });

  return (
    <Stack
      width="1140px"
      height="90vh"
      borderLeft=" 1px solid #c9c7c7"
      display="flex"
      justifyContent="space-between"
      backgroundColor="#E4E5E9"
    >
      <Stack
        p={1}
        display="flex"
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="center"
        color="black"
        pl={6}
        pt={3}
        sx={{ borderTopLeftRadius: "7px", borderTopRightRadius: "7px" }}
      >
        {recipientUser?.user?.name}
        <Stack
          ml={1}
          backgroundColor={isOnline ? "#90EE90" : "gray"}
          height="9px"
          width="9px"
          borderRadius="100px"
          mb={0.5}
        ></Stack>
      </Stack>

      <Stack p={1} height="480px" sx={{ overflowY: "scroll" }}>
        {Messages}
      </Stack>

      <Stack
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        p={1.5}
      >
        <InputEmoji value={textMessage} onChange={setTextMessage} />

        <IconButton
          onClick={() =>
            sendTextMessage(textMessage, user, currentChat._id, setTextMessage)
          }
        >
          <SendIcon sx={{ fill: "white", background: "#245DE6", padding: "8px", borderRadius: "5px" }} />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default ChatBox;
