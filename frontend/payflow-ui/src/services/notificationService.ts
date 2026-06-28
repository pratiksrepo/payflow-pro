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

export const getNotificationsPaged =
async (
    userId: number,
    page: number,
    pageSize: number,
    search: string,
    isRead: boolean | null,
    sort: string
)=>
{
    const response =
        await axios.get(
            `https://localhost:7136/api/Notification/user/${userId}/paged`,
            {
                params:
                {
                    page,
                    pageSize,
                    search,
                    isRead,
                    sort
                }
            });

    return response.data;
}