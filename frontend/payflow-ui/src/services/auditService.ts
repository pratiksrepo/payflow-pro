import axios
from "axios";

const API =
"https://localhost:7014/api/Payment";

export const getAuditLogs =
async()=>
{
    const response =
        await axios.get(
            `${API}/auditlogs`
        );

    return response.data;
};

export const getAuditLogsPaged =
async(
    page:number,
    pageSize:number,
    search:string,
    action:string,
    sort:string
)=>
{
    const response =
        await axios.get(

            `${API}/auditlogs/paged`,

            {
                params:
                {
                    page,
                    pageSize,
                    search,
                    action,
                    sort
                }
            }

        );

    return response.data;
};