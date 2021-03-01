class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  handleMessageParser = () => {
    const messages = this.createChatBotMessage(
      "The message parser controls how the bot reads input and decides which action to invoke.",
      { widget: "messageParser", withAvatar: true }
    );

    this.addMessageToBotState(messages);
  };

  handleDefault = () => {
    const message = this.createChatBotMessage("How can I help?", {
      withAvatar: true,
    });

    this.addMessageToBotState(message);
  };

  helloWorldHandler = () => {
    const message = this.createChatBotMessage("Hello again!");
    const message2 = this.createChatBotMessage("How can I help you!");

    this.addMessageToBotState(message);
    this.addMessageToBotState(message2);
  };

  addMessageToBotState = (messages) => {
    if (Array.isArray(messages)) {
      this.setState((state) => ({
        ...state,
        messages: [...state.messages, ...messages],
      }));
    } else {
      this.setState((state) => ({
        ...state,
        messages: [...state.messages, messages],
      }));
    }
  };
}

export default ActionProvider;
