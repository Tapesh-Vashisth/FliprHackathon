import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.geoapify.com/",
  headers: {
    "Content-Type": "application/json",
  }
});

export default instance;