import apiClient from "./apiClient";

import { type LoginRequest }
    from "../types/LoginRequest";

import { type LoginResponse }
    from "../types/LoginResponse";

export async function login(
    request: LoginRequest) {
    const response =
        await
            apiClient.post<LoginResponse>(
                "/Auth/login",
                request);

    return response.data;
}

export async function logout() {
    const token =
        localStorage.getItem("accessToken");

    await
        apiClient.post(
            "/Auth/logout",
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
}