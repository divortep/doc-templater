import axios from "axios";

export const baseDomain = "http://localhost:8000";
export const baseURL = `${baseDomain}/api`;

export default axios.create({baseURL});
