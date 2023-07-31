import axios from "axios";

export const axiosCustom = axios.create({ baseURL: "http://localhost:3000" });

export const fetcher = (url: string) => axiosCustom.get(url).then((res) => res);
