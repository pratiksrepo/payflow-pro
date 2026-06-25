import apiClient from "./apiClient";

import { type LoginRequest }
from "../types/LoginRequest";

import { type LoginResponse }
from "../types/LoginResponse";
import axios from "axios";

export async function login(
    request: LoginRequest)
{
    const response =
        await apiClient.post<LoginResponse>(
            "/Auth/login",
            request);

    return response.data;
}

export async function logout()
{
    const token =
        localStorage.getItem("accessToken");

    await axios.post(
        "https://localhost:7093/api/Auth/logout",
        {},
        {
            headers:
            {
                Authorization:
                    `Bearer ${token}`
            }
        });
}