import { IContact, ISettings } from "../@types";
import { apiInstance } from "../config";

export const contactsAPI = {
  async getChatInfoById(id: string): Promise<IContact> {
    const chatId = `${id}@c.us`;
    const { data } = await apiInstance.post("/getContactInfo", {
      chatId: chatId,
    });
    return data;
  },
  async getSettings(): Promise<ISettings> {
    const { data } = await apiInstance.get("/getSettings");

    return data;
  },
};
