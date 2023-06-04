import { useEffect, useState } from "react";
import "./App.css";
import { contactsAPI } from "./services";
import { ChatList } from "./sections";
import { Chat } from "./sections/chat/chat";

function App() {
  const [chat, setChat] = useState({ name: "" });
  useEffect(() => {
    contactsAPI
      .getChatInfoById("79879156795")
      .then((response) => setChat(response));
  }, []);
  if (chat === undefined) return <div>загрузка</div>;
  else
    return (
      <div className="App">
        <ChatList />
        <Chat />
      </div>
    );
}

export default App;
