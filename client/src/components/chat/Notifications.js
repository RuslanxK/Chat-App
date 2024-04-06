import { useContext, useState } from "react";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { IconButton, Stack, Typography } from "@mui/material";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContex";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";
import moment from "moment";

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useContext(AuthContext);
  const { notifications, userChats, allUsers, markAllNotificationAsRead, markNotificationAsRead } = useContext(ChatContext);

  const unreadNotifications = unreadNotificationsFunc(notifications);

  const modifiedNotifications = notifications.map((n) => {
    const sender = allUsers.find((user) => user._id === n.senderId);

    return { ...n, senderName: sender?.name };
  });

  return (
    <Stack>
      <IconButton onClick={() => setIsOpen(!isOpen)}>
        <ChatBubbleIcon style={{ fill: "white" }} />
        {unreadNotifications?.length === 0 ? null : (
          <Stack
            color="white"
            backgroundColor="#7C70F1"
            borderRadius="100px"
            fontSize="12px"
            pl={1}
            pr={1}
          >
            {unreadNotifications?.length}
          </Stack>
        )}
      </IconButton>

      {isOpen ? (
        <Stack
          backgroundColor="black"
          position="absolute"
          top="55px"
          boxShadow="rgba(0, 0, 0, 0.09) 0px 3px 12px"
          right="30px"
          width="300px"
          minHeight="30px"
          maxHeight="400px"
          sx={{ overflowY: "scroll" }}
        >
          <Stack
            display="flex"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            p={2}
          >
            <Typography component="h3" variant="h6" color="white">
              Notifications
            </Typography>
            <Typography component="span" variant="span" color="white" onClick={() => markAllNotificationAsRead(notifications)}>
              Mark all as read
            </Typography>
          </Stack>
          {modifiedNotifications?.length === 0 ? (
            <Typography
              pl={2}
              pb={2}
              component="span"
              variant="span"
              color="white"
            >
              {" "}
              No notifications yet...
            </Typography>
          ) : null}

          {modifiedNotifications &&
            modifiedNotifications.map((n, index) => {
              return (
                <Stack
                  pb={1}
                  pt={1}
                  p={1}
                  key={index}
                  borderBottom="1px solid gray"
                  backgroundColor={n.isRead ? null : "#414142"}
                  onClick={() => {
                    markNotificationAsRead(n, userChats, user, notifications)
                    setIsOpen(false)
                  }}
                >
                  <Typography
                    mb={1}
                    component="span"
                    variant="span"
                    color="#e8e8e8"
                  >{`${n.senderName} sent you a new message`}</Typography>
                  <Typography component="span" variant="span" color="#e8e8e8">
                    {moment(n.date).calendar()}
                  </Typography>
                </Stack>
              );
            })}
        </Stack>
      ) : null}
    </Stack>
  );
};

export default Notifications;
