import React from "react";
import NavBar from "../Components/Navbar/NavBar";

import Chatbot from "react-chatbot-kit";
import Covid19 from "./Covid19";
import config from "../Components/ChatBot/config";
import MessageParser from "../Components/ChatBot/MessageParser";
import ActionProvider from "../Components/ChatBot/ActionProvider";

import "./ChatBot.css";

const Home = () => {
  const handleClick = () => {
    const popup = document.querySelector(".popup");
    popup.style.display === "none"
      ? (popup.style.display = "block")
      : (popup.style.display = "none");
  };

  return (
    <div className="Home">
      <NavBar />

      <div className="popup" style={{ display: "none" }}>
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      </div>
      <img
        className="botBtn"
        onClick={handleClick}
        src="https://cdn3.iconfinder.com/data/icons/chat-bot-filled-color/300/215434455Untitled-3-256.png"
        alt="chatbot"
      />
      <Covid19 />
    </div>
  );
};

export default Home;
