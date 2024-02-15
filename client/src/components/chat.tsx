"use client";
import MyChat from "./my_chat";
import OtherChat from "./other_chat";
import { IChat } from "./quetions";

interface ChatProps {
  chat: IChat;
}

const Chat = (props: ChatProps) => {
  const { chat } = props;
  if (chat.isMine) return <MyChat chat={chat} />;
  return <OtherChat chat={chat} />;
};

export default Chat;
