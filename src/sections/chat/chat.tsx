import { FC, useEffect, useState } from "react";
import { IChat } from "./chat.types";
import { observer } from "mobx-react-lite";
import { useStore } from "../../hooks";
import s from "./chat.module.css";
import { chatAPI } from "../../services";
import { IMessage } from "../../@types/chat.types";
import clsx from "clsx";

export const Chat: FC<IChat> = observer(() => {
  const { chatId } = useStore((store) => store.chatStore);
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState<IMessage[]>([]);
  // const getMessages = useStore((store) =>
  //   store.chatStore.getMessages.bind(store.chatStore)
  // );
  const getMessages = async () => {
    if (chatId) {
      const data = await chatAPI.getMessages(chatId, 1000);
      setMessagesList(data);
    }
  };
  const getNotification = async () => {
    if (chatId) {
      const data = await chatAPI.receiveNotification();

      const result = await chatAPI.deleteNotification(data.receiptId);

      if (result) {
        getMessages();
      }
    }
  };
  useEffect(() => {
    getMessages();
  }, [chatId]);
  useEffect(() => {
    getNotification();
  }, []);

  const handleSendMessage = () => {
    if (chatId) {
      chatAPI.sendMessage(chatId, message);
      setMessagesList([
        { textMessage: message, type: "outgoing" },
        ...messagesList,
      ]);
      setMessage("");
    }
  };

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        {messagesList.map((message) => (
          <div className={clsx({ [s.myMessage]: message.type === "outgoing" })}>
            {message.textMessage}
          </div>
        ))}
      </div>
      <div className={s.input}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Отправить</button>
      </div>
    </div>
  );
});
