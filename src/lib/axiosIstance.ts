import axios from "axios";

var axiosIstance = axios.create({
  baseURL: process.env.SERVER_URL,
  withCredentials: true,
});

export default axiosIstance;
