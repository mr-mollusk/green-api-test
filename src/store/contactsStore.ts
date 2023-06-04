import { makeAutoObservable } from "mobx";
import { IContact } from "../@types";
import { contactsAPI } from "../services";

export class ContactsStore {
  contacts: IContact[];

  constructor() {
    this.contacts = [];
    makeAutoObservable(this);
  }

  getContactsFromLS(): IContact[] {
    const contacts = localStorage.getItem("contacts");
    if (contacts) return JSON.parse(contacts);
    return [];
  }

  deleteContactById(id: string) {
    const contacts = localStorage.getItem("contacts");
    if (contacts) {
      const contactsArray: IContact[] = JSON.parse(contacts);

      const filteredContacts = contactsArray.filter(
        (contact) => contact.chatId !== id
      );
      console.log(filteredContacts);

      this.contacts = [...filteredContacts];
      localStorage.setItem("contacts", JSON.stringify(this.contacts));
    }
  }
  setContacts(newContacts: IContact[]) {
    this.contacts = newContacts;
  }

  async getNewContactByPhoneNumber(phoneNumber: string) {
    if (phoneNumber[0] === "8") phoneNumber = "7" + phoneNumber.slice(1);
    if (phoneNumber[0] === "+") phoneNumber = phoneNumber.slice(1);
    const data = await contactsAPI.getChatInfoById(phoneNumber);
    const contacts = localStorage.getItem("contacts");
    if (contacts) {
      const contactsArray = JSON.parse(contacts);
      contactsArray.push({
        name: data.name,
        avatar: data.avatar,
        chatId: data.chatId,
      });

      this.contacts = [...contactsArray];
      localStorage.setItem("contacts", JSON.stringify(this.contacts));
    } else localStorage.setItem("contacts", JSON.stringify(this.contacts));
  }
}
