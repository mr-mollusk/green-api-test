import { useEffect, useState } from "react";
import { ChatList } from "../../sections";
import { Chat } from "../../sections/chat/chat";
import s from "./chatPage.module.css";
import { contactsAPI } from "../../services";

export const ChatPage = () => {
  const [chat, setChat] = useState({ name: "" });
  useEffect(() => {
    const getAccount = async () => {
      const idInstance = localStorage.getItem("idInstance");
      const apiTokenInstance = localStorage.getItem("apiTokenInstance");
      if (idInstance && apiTokenInstance) {
        const { wid } = await contactsAPI.getSettings();
        contactsAPI
          .getChatInfoById(wid.slice(0, -5))
          .then((response) => setChat(response));
      }
    };
    getAccount();
  }, []);
  if (chat === undefined) <div>загрузка</div>;
  return (
    <div className={s.App}>
      <ChatList />
      <Chat />
    </div>
  );
};
