import axios from "axios";

const instance = axios.create({
  baseURL: "https://nasir-cv-server.onrender.com/api", // change to Render URL after deployment
});

export default instance;
