import axios from "axios";

const instance = axios.create({
  baseURL: "http://44.217.232.165:5500/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

export default instance;