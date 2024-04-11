import axios from "axios";

const instance = axios.create({
  baseURL: "https://gestion-de-pagos-bancarios.onrender.com/api",
  withCredentials: true,
});

export default instance;
