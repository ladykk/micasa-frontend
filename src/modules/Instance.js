import axios from "axios";
import baseURL from "./api/API";

export default axios.create({
  withCredentials: true,
  baseURL,
});
