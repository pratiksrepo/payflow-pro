import axios from "axios";
import API from "../config/api";

const http = axios.create({
    baseURL: API.Gateway,
    headers: {
        "Content-Type": "application/json"
    }
});

export default http;