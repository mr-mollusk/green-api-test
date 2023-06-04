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
  const getMessages = async () => {
    if (chatId) {
      const data = await chatAPI.getMessages(chatId, 1000);
      setMessagesList(data);
    }
  };
  const getNotification = async () => {
    if (chatId) {
      const data = await chatAPI.receiveNotification();

      if (data) {
        const result = await chatAPI.deleteNotification(data.receiptId);

        if (result) {
          getMessages();
        }
      }
    }
  };
  useEffect(() => {
    getMessages();
  }, [chatId]);
  useEffect(() => {
    setInterval(getNotification, 5000);
  }, [chatId]);

  const handleSendMessage = () => {
    if (chatId) {
      chatAPI.sendMessage(chatId, message);
      setMessagesList([
        {
          textMessage: message,
          type: "outgoing",
          idMessage: `newMessage${new Date()}`,
        },
        ...messagesList,
      ]);
      setMessage("");
    }
  };

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        {messagesList.map((message) => {
          let time = new Date();
          if (message.timestamp) time = new Date(message.timestamp * 1000);
          return (
            <div
              key={message.idMessage}
              className={clsx(s.message, {
                [s.myMessage]: message.type === "outgoing",
              })}
            >
              <div>{message.textMessage}</div>
              <div>{time.toTimeString().slice(0, 5)}</div>
            </div>
          );
        })}
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
