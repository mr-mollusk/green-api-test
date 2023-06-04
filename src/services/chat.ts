import { IMessage, IMessageResponse } from "../@types/chat.types";
import { apiInstance } from "../config";

export const chatAPI = {
  async getMessages(chatId: string, count: number): Promise<IMessage[]> {
    const { data } = await apiInstance.post("/getChatHistory", {
      chatId: chatId,
      count: count,
    });

    return data;
  },
  async sendMessage(
    chatId: string,
    message: string
  ): Promise<IMessageResponse> {
    const { data } = await apiInstance.post("/sendMessage", {
      chatId: chatId,
      message: message,
    });
    // console.log(data);

    return data;
  },
  async receiveNotification() {
    const { data } = await apiInstance.get("/receiveNotification");
    return data;
  },
  async deleteNotification(receiptId: number) {
    const { data } = await apiInstance.delete("/deleteNotification", {
      params: { receiptId: receiptId },
    });
    return data.result;
  },
};
