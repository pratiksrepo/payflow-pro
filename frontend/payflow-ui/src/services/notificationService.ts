import axios
from "axios";

const notificationApi =
    axios.create({
        baseURL:
            "https://localhost:7136/api"
    });

export async function
getNotifications(
    userId: number)
{
    const response =
        await notificationApi.get(
            `/Notification/${userId}`);

    return response.data;
}