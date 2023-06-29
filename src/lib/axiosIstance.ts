import axios from "axios";

var axiosIstance = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
});

export default axiosIstance;
