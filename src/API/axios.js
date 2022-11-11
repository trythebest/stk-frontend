import axios from "axios";
import { BACKEND_URL } from "./backend_url";

export default axios.create({
  baseURL: BACKEND_URL,
});