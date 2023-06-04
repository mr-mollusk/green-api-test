import { createBrowserRouter } from "react-router-dom";
import { AuthPage, ChatPage } from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthPage />,
  },
  {
    path: "/chat",
    element: <ChatPage />,
  },
]);
