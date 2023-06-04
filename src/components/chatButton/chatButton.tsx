import { FC } from "react";
import { IChatButton } from ".";
import s from "./chatButton.module.css";
import { useStore } from "../../hooks";
import Avatar from "../../assets/noAvatar.png";
import { observer } from "mobx-react-lite";

export const ChatButton: FC<IChatButton> = observer(
  ({ chatId, name, avatar }) => {
    const deleteChat = useStore((store) =>
      store.contactsStore.deleteContactById.bind(store.contactsStore)
    );
    const setChatId = useStore((store) =>
      store.chatStore.setChatId.bind(store.chatStore)
    );
    const handleDeleteChat = (
      chatId: string,
      e: React.MouseEvent<HTMLDivElement>
    ) => {
      debugger;
      deleteChat(chatId);
      setChatId("");
      e.stopPropagation();
    };
    return (
      <div className={s.wrapper} onClick={() => setChatId(chatId)}>
        <img src={avatar ? avatar : Avatar} alt={`${name} avatar`} />
        <div className={s.content}>{name}</div>
        <div className={s.icon} onClick={(e) => handleDeleteChat(chatId, e)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            width="50px"
            height="50px"
            color="white"
          >
            <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z" />
          </svg>
        </div>
      </div>
    );
  }
);
