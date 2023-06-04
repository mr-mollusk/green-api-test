import axios from "axios";

const idInstance = 1101826682;
export const apiTokenInstance =
  "caa2c3ddd6744456bf2413b63f76f57718c45f39c97c47c8b8";

const BASE_URL = "https://api.green-api.com";
const BASE_INSTANCE_URL = `${BASE_URL}/waInstance${idInstance}`;

export const apiInstance = axios.create({ baseURL: BASE_INSTANCE_URL });
apiInstance.interceptors.request.use((config) => {
  if (config.method === "delete") {
    config.url = config.url + `/${config.params.receiptId}`;
    config.params = {};
  }

  return config;
});
apiInstance.interceptors.request.use((config) => {
  config.url = config.url + `/${apiTokenInstance}`;
  return config;
});
