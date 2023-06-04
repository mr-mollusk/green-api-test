import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { StoreProvider } from "./context";
import { store } from "./store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>
);
