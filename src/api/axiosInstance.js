import axios from "axios";

const instance = axios.create({
  baseURL: "https://nasir-cv-server.onrender.com/api", // https://nasir-cv-server.onrender.com/api
});

export default instance;
