import { createChatBotMessage } from "react-chatbot-kit";
import FlightBotAvatar from "./FlightBotAvatar ";
import MyUserAvatar from "./MyUserAvatar ";
const botName = "SCS BOT";
const config = {
  botName: botName,
  lang: "no",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
  },
  initialMessages: [createChatBotMessage(`Hello!`)],
  customComponents: {
    botAvatar: (props) => <FlightBotAvatar {...props} />,
    userAvatar: (props) => <MyUserAvatar {...props} />,
  },
};

export default config;
