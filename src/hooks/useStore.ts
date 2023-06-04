import { useContext } from "react";
import { RootStore } from "../store/";
import { StoreContext } from "../context/store";

export const useStore = <Selected = unknown>(
  selector: (store: RootStore) => Selected
) => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("Хук не обёрнут в контекст");
  }
  return selector(context);
};
