import { IContact } from "../@types";
import { apiInstance } from "../config";

export const contactsAPI = {
  async getContacts() {
    const data = await apiInstance.get("/getContacts");
  },
  async getChatInfoById(id: string): Promise<IContact> {
    const chatId = `${id}@c.us`;
    const { data } = await apiInstance.post("/getContactInfo", {
      chatId: chatId,
    });
    return data;
  },
};
