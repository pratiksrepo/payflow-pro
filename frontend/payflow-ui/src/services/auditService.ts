// import axios
// from "axios";

import apiClient from "./apiClient";

// const API =
// "https://localhost:7056/api/Payment";

export const getAuditLogs =
    async () => {
        const response =
            await
                apiClient.get("/Payment/auditlogs");

        return response.data;
    };

export const getAuditLogsPaged =
    async (
        page: number,
        pageSize: number,
        search: string,
        action: string,
        sort: string
    ) => {
        const response =
            await
                apiClient.get("/Payment/auditlogs/paged", {
                    params: {
                        page,
                        pageSize,
                        search,
                        action,
                        sort,
                    },
                });

        return response.data;
    };