import axios from "axios";

import settingCookie from "../utils/settingCookie";

const authClient = axios.create({
  baseURL: "http://50.18.213.243",

  headers: {
    "Content-Type": "application/json",
  },
});

// axios 요청 전 수행할 작업
authClient.interceptors.request.use(function (config) {
  let token = settingCookie("get-access");
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

export default authClient;
