import { useState, useEffect, useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { getRequest, baseUrl } from "../utils/services";

export const useFetchLatestMessage = (chat) => {

    const [latestMessage, setMessage] = useState(null);

    const { messages, notifications } = useContext(ChatContext)


      useEffect(() => {

        const getMessage = async () => {

            const response = await getRequest(`${baseUrl}/messages/${chat?._id}`);
        
            if (response.error) {
              return console.log("Error getting messages...", response.error)
            }

            const latestMessage = response[response?.length - 1]
        
            setMessage(latestMessage);
          };

          getMessage()

        
      }, [messages, notifications]);


      return {latestMessage}
}



