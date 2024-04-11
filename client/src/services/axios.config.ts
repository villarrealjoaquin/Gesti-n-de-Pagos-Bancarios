import axios from "axios";

const instance = axios.create({
  baseURL: "https://challenge-4tmy.onrender.com/api",
  withCredentials: true,
});

export default instance;
