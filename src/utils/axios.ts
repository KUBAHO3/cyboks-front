import Axios from "axios";
import { BACKEND_URL } from "./constants";

const server = Axios.create({
    baseURL: BACKEND_URL,
});

export { server };