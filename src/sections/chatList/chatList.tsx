import { FC, useEffect, useState } from "react";
import { IChatList } from ".";
import s from "./chatList.module.css";
import { observer } from "mobx-react-lite";
import { useStore } from "../../hooks";
import { ChatButton } from "../../components";

export const ChatList: FC<IChatList> = observer(() => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const { contacts } = useStore((store) => store.contactsStore);
  const addChat = useStore((store) =>
    store.contactsStore.getNewContactByPhoneNumber.bind(store.contactsStore)
  );
  const setContacts = useStore((store) =>
    store.contactsStore.setContacts.bind(store.contactsStore)
  );
  const getContactsFromLS = useStore((store) =>
    store.contactsStore.getContactsFromLS.bind(store.contactsStore)
  );
  const handlePhoneValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleAddChat = () => {
    addChat(phoneNumber);
  };

  useEffect(() => {
    setContacts([]);
    setContacts(getContactsFromLS());
  }, []);
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <input value={phoneNumber} onChange={(e) => handlePhoneValue(e)} />
        <button onClick={handleAddChat}>Добавить</button>
      </div>
      <div className={s.body}>
        {contacts.map((contact) => (
          <ChatButton key={contact.chatId} {...contact} />
        ))}
      </div>
    </div>
  );
});
