import axios from "axios";

export const apiPath = `${process.env.BASE_URL}/api`;
export default axios.create({baseURL: apiPath});
