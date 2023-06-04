import { makeAutoObservable } from "mobx";
import { chatAPI } from "../services";

export class ChatStore {
  chatId: string;

  constructor() {
    this.chatId = "";
    makeAutoObservable(this);
  }
  setChatId(chatId: string) {
    this.chatId = chatId;
    console.log(chatId);
  }
  async getMessages() {
    const data = await chatAPI.getMessages(this.chatId, 10);
    console.log(data);
  }
}
