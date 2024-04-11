import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

export default instance;

// https://challenge-4tmy.onrender.com/api