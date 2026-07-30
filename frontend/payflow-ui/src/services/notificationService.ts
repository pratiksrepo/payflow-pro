// import axios
// from "axios";

import apiClient from "./apiClient";

// const notificationApi =
//     axios.create({
//         baseURL:
//             "https://localhost:7056/api"
//     });

export async function
getNotifications(
    userId: number)
{
    const response =
        await 
        apiClient.get(`/Notification/${userId}`);
    
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
        await 
        apiClient.get(`/Notification/user/${userId}/paged`, {
            params: {
                page,
                    pageSize,
                    search,
                    isRead,
                    sort
                }
            });

    return response.data;
}