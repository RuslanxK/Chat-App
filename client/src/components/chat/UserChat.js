import { Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import avatar from "../../assets/avatar.svg";
import { ChatContext } from "../../context/ChatContext";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";
import { useFetchLatestMessage } from "../../hooks/useFetchLatestMessage";
import moment from "moment";

const UserChat = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);

  const { latestMessage } = useFetchLatestMessage(chat);

  const { onlineUsers, notifications, markThisUserNotificationAsRead } =
    useContext(ChatContext);

  const isOnline = onlineUsers?.some(
    (u) => u?.userId === recipientUser?.user?._id
  );

  const unreadNotifications = unreadNotificationsFunc(notifications);

  const thisUserNotifications = unreadNotifications?.filter(
    (n) => n?.senderId === recipientUser?.user?._id
  );

  const truncateText = (text) => {
    let shortText = text?.substring(0, 12);

    if (text.length > 12) {
      shortText = shortText + "...";
    }

    return shortText;
  };

  return (
    <Stack
      backgroundColor="white"
      sx={{ background: 'white','&:hover':{ background: "#cbd9f5"} }}
      m={1}
      p={2}
      onClick={() => {
        if (thisUserNotifications?.length !== 0) {
          markThisUserNotificationAsRead(thisUserNotifications, notifications);
        }
      }}
    >
      <Stack
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{ cursor: "pointer" }}
      >
        <Stack
          display="flex"
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <img src={avatar} alt="avatar" height="37px" width="37px" />
          <Stack ml={1}>
            <Typography component="span" variant="span" color="black" mb={0.5} fontSize="14px">
              {recipientUser?.user?.name}
            </Typography>
            <Stack color="gray">
              {latestMessage?.text && truncateText(latestMessage?.text)}
            </Stack>
          </Stack>
        </Stack>

        <Stack display="flex" justifyContent="flex-start" alignItems="flex-end">
          <Stack
            backgroundColor={isOnline ? "#90EE90" : "gray"}
            height="9px"
            width="9px"
            borderRadius="100px"
            mb={0.5}
          ></Stack>
          <Typography component="span" variant="span" color="gray" mb={0.5} fontSize="14px">
            {moment(latestMessage?.createdAt).calendar()}
          </Typography>
          {thisUserNotifications?.length > 0 ? (
            <Stack
              backgroundColor="#7C70F1"
              width="20px"
              height="20px"
              borderRadius="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Typography
                component="span"
                variant="span"
                color="white"
                fontSize="10px"
              >
                {thisUserNotifications?.length}
              </Typography>
            </Stack>
          ) : null}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default UserChat;
