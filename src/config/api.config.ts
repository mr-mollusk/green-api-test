import axios from "axios";

const BASE_URL = "https://api.green-api.com";

export const apiInstance = axios.create({ baseURL: BASE_URL });
apiInstance.interceptors.request.use((config) => {
  if (config.method === "delete") {
    config.url = config.url + `/${config.params.receiptId}`;
    config.params = {};
  }

  return config;
});
apiInstance.interceptors.request.use((config) => {
  const apiTokenInstance = localStorage.getItem("apiTokenInstance");
  if (apiTokenInstance) config.url = config.url + `/${apiTokenInstance}`;
  return config;
});
apiInstance.interceptors.request.use((config) => {
  const idInstance = localStorage.getItem("idInstance");
  if (idInstance) {
    config.baseURL = config.baseURL + `/waInstance${idInstance}`;
  }
  return config;
});
