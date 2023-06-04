import { makeAutoObservable } from "mobx";
import { ContactsStore } from "./contactsStore";
import { ChatStore } from "./chatStore";

export class RootStore {
  contactsStore: ContactsStore;
  chatStore: ChatStore;
  constructor() {
    this.contactsStore = new ContactsStore();
    this.chatStore = new ChatStore();
    makeAutoObservable(this);
  }
}

export type TRootStore = RootStore;

export const store = new RootStore();
