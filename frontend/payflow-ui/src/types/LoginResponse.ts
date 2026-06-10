export interface LoginResponse
{
    success: boolean;

    message: string;

    data:
    {
        accessToken: string;

        refreshToken: string;

        email: string;
    };
}