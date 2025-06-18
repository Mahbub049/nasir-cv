import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // change to Render URL after deployment
});

export default instance;
