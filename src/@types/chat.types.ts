type messageType = "outgoing" | "incoming";

export interface IMessage {
  textMessage: string;
  type: messageType;
}

export interface IMessageResponse {
  idMessage: string;
}
