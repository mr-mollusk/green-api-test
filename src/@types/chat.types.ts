type messageType = "outgoing" | "incoming";

export interface IMessage {
  textMessage: string;
  type: messageType;
  timestamp?: number;
  idMessage: string;
}

export interface IMessageResponse {
  idMessage: string;
}
