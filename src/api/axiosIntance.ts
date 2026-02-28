import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.openchargemap.io/v3",
  params: {
    key: import.meta.env.VITE_API_KEY,
    output: "json",
  },
});
