import axios from "axios";

const Client = axios.create({
  baseURL: "http://50.18.213.243",
  headers: {
    "Content-Type": "application/json",
  },
});

export default Client;
