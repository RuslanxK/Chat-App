import React, { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { Stack, Typography } from "@mui/material";
import avatar from "../../assets/avatar.svg";
import { AuthContext } from "../../context/AuthContex";

const PotentialChats = () => {
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);

  const pChats = potentialChats?.map((u, index) => {
    return (
      <Stack
        mb={1}
        ml={1}
        mr={1}
        pl={1}
        pr={1}
        pt={0.5}
        pb={0.5}
        sx={{ cursor: "pointer" }}
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        backgroundColor="white"
        borderRadius="7px"
        onClick={() => createChat(user._id, u._id)}
        key={index}
      >
        {" "}
        <img src={avatar} alt="avatar" height="28px" width="27px" />
        <Typography
          variant="span"
          component="span"
          fontSize="14px"
          pl={1}
          pr={1}
          color="black"
        >
          {u.name}
        </Typography>{" "}
        {onlineUsers?.some((user) => user?.userId === u?._id) ? (
          <Stack
            backgroundColor="#90EE90"
            height="9px"
            width="9px"
            borderRadius="100px"
            mb={0.5}
          ></Stack>
        ) : null}{" "}
      </Stack>
    );
  });

  return (
    <Stack
      mt={1}
   
      display="flex"
      direction="column"
      alignItems="flex-start"
      width="auto"
    >
      {pChats}
    </Stack>
  );
};

export default PotentialChats;
