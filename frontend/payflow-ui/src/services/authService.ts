import apiClient from "./apiClient";

import { type LoginRequest }
from "../types/LoginRequest";

import { type LoginResponse }
from "../types/LoginResponse";

export async function login(
    request: LoginRequest)
{
    const response =
        await apiClient.post<LoginResponse>(
            "/Auth/login",
            request);

    return response.data;
}