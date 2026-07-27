import {
    Box,
    Typography,
    Paper,
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    TableContainer,
    Chip,
    CircularProgress
}
    from "@mui/material";

import {
    useState,
    useEffect,
    useCallback
}
    from "react";

import SearchBar
    from "../components/SearchBar";

import NotificationFilterPanel
    from "../components/NotificationFilterPanel";

import CommonPagination
    from "../components/CommonPagination";

import {
    getNotificationsPaged
}
    from "../services/notificationService";

import {
    getUserId
}
    from "../utils/jwtHelper";

import type
{
    Notification
}
    from "../types/Notification";
import EmptyState from "../components/EmptyState";
import SkeletonTable from "../components/SkeletonTable";

export default function NotificationsPage() {
    const [
        notifications,
        setNotifications
    ] =
        useState<Notification[]>([]);

    const [
        loading,
        setLoading
    ] =
        useState(false);

    const [
        page,
        setPage
    ] =
        useState(1);

    const [
        pageSize,
        setPageSize
    ] =
        useState(10);

    const [
        totalPages,
        setTotalPages
    ] =
        useState(1);

    const [
        search,
        setSearch
    ] =
        useState("");

    const [
        status,
        setStatus
    ] =
        useState("");

    const [
        sort,
        setSort
    ] =
        useState("newest");

    const loadNotifications =
        useCallback(
            async () => {
                try {
                    setLoading(true);

                    const result =
                        await getNotificationsPaged(

                            Number(
                                getUserId()
                            ),

                            page,

                            pageSize,

                            search,

                            status === ""
                                ?
                                null
                                :
                                status === "Read",

                            sort
                        );

                    setNotifications(
                        result.data
                    );

                    setTotalPages(
                        result.totalPages
                    );
                }
                finally {
                    setLoading(false);
                }

            },
            [
                page,
                pageSize,
                search,
                status,
                sort
            ]);

    useEffect(() => {
        void loadNotifications();

    },
        [
            loadNotifications
        ]);

    return (

        <Box>

            <Typography
                variant="h4"
                fontWeight={700}
                mb={3}
            >
                Notifications
            </Typography>

            <SearchBar

                value={search}

                onChange={(value) => {
                    setPage(1);
                    setSearch(value);
                }}

                onSearch={
                    loadNotifications
                }

            />

            <NotificationFilterPanel

                status={status}

                sort={sort}

                pageSize={pageSize}

                onStatusChange={(value) => {
                    setPage(1);
                    setStatus(value);
                }}

                onSortChange={(value) => {
                    setPage(1);
                    setSort(value);
                }}

                onPageSizeChange={(value) => {
                    setPage(1);
                    setPageSize(value);
                }}

            />

            {
                loading ?

                    <SkeletonTable

                        rows={6}

                        columns={4}

                    />

                    :

                    <TableContainer
                        component={Paper}
                    >

                        <Table>

                            <TableHead>

                                <TableRow>

                                    <TableCell>
                                        Title
                                    </TableCell>

                                    <TableCell>
                                        Message
                                    </TableCell>

                                    <TableCell>
                                        Status
                                    </TableCell>

                                    <TableCell>
                                        Date
                                    </TableCell>

                                </TableRow>

                            </TableHead>

                            <TableBody>
                                {
                                    notifications.length === 0 ?

                                        <TableRow>

                                            <TableCell
                                                colSpan={4}
                                            >

                                                <EmptyState

                                                    title="No Notifications"

                                                    message="You don't have any notifications."

                                                    buttonText="Refresh"

                                                    onClick={loadNotifications}

                                                />

                                            </TableCell>

                                        </TableRow>

                                        :

                                        notifications.map(
                                            (
                                                notification
                                            ) => (

                                                <TableRow
                                                    hover
                                                    key={notification.id}
                                                >

                                                    <TableCell>
                                                        {notification.title}
                                                    </TableCell>

                                                    <TableCell>
                                                        {notification.message}
                                                    </TableCell>

                                                    <TableCell>

                                                        {
                                                            notification.isRead ?

                                                                <Chip
                                                                    label="Read"
                                                                    color="success"
                                                                    size="small"
                                                                />

                                                                :

                                                                <Chip
                                                                    label="Unread"
                                                                    color="warning"
                                                                    size="small"
                                                                />

                                                        }

                                                    </TableCell>

                                                    <TableCell>

                                                        {
                                                            new Date(
                                                                notification.createdAt
                                                            ).toLocaleString()
                                                        }

                                                    </TableCell>

                                                </TableRow>

                                            ))
                                }

                            </TableBody>

                        </Table>

                    </TableContainer>

            }

            <CommonPagination

                page={page}

                totalPages={totalPages}

                onChange={setPage}

            />

        </Box>

    );

}