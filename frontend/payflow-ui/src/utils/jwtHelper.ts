import { jwtDecode } from "jwt-decode";

interface JwtPayload
{
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;

    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;

    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
}

export function getUserId()
{
    const token =
        localStorage.getItem(
            "accessToken");

    if (!token)
    {
        return null;
    }

    const decoded =
        jwtDecode<JwtPayload>(
            token);

    return Number(
        decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ]);
}

export function getEmail()
{
    const token =
        localStorage.getItem(
            "accessToken");

    if (!token)
    {
        return "";
    }

    const decoded =
        jwtDecode<JwtPayload>(
            token);

    return decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
    ];
}

export function getRole()
{
    const token =
        localStorage.getItem(
            "accessToken"
        );

    if (!token)
    {
        return "";
    }

    const payload =
        JSON.parse(
            atob(
                token.split(".")[1]
            )
        );

    return (
        payload.role ||
        payload[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ] ||
        ""
    );
}