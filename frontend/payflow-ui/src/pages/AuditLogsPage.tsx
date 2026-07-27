import {
    Box,
    Typography,
    Paper,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    CircularProgress
}
    from "@mui/material";

import {
    useState,
    useEffect,
    useCallback
}
    from "react";

import type
{
    AuditLog
}
    from "../types/AuditLog";

import {
    getAuditLogsPaged
}
    from "../services/auditService";

import SearchBar
    from "../components/SearchBar";

import AuditFilterPanel
    from "../components/AuditFilterPanel";

import CommonPagination
    from "../components/CommonPagination";
import EmptyState from "../components/EmptyState";
import SkeletonTable from "../components/SkeletonTable";

export default function AuditLogsPage() {
    const [
        auditLogs,
        setAuditLogs
    ] =
        useState<AuditLog[]>([]);

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
        action,
        setAction
    ] =
        useState("");

    const [
        sort,
        setSort
    ] =
        useState("newest");

    const loadAuditLogs =
        useCallback(
            async () => {
                try {
                    setLoading(true);

                    const result =
                        await getAuditLogsPaged(

                            page,

                            pageSize,

                            search,

                            action,

                            sort

                        );

                    setAuditLogs(
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
                action,
                sort
            ]
        );

    useEffect(
        () => {
            void loadAuditLogs();
        },
        [
            loadAuditLogs
        ]
    );

    return (

        <Box>

            <Typography
                variant="h4"
                fontWeight={700}
                mb={3}
            >
                Audit Logs
            </Typography>

            <SearchBar

                value={search}

                onChange={(value) => {
                    setPage(1);
                    setSearch(value);
                }}

                onSearch={
                    loadAuditLogs
                }

            />

            <AuditFilterPanel

                action={action}

                sort={sort}

                pageSize={pageSize}

                onActionChange={(value) => {
                    setPage(1);
                    setAction(value);
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
                        sx={{
                            borderRadius: 3
                        }}
                    >

                        <Table>

                            <TableHead>

                                <TableRow>

                                    <TableCell>
                                        User Id
                                    </TableCell>

                                    <TableCell>
                                        Action
                                    </TableCell>

                                    <TableCell>
                                        Description
                                    </TableCell>

                                    <TableCell>
                                        Date
                                    </TableCell>

                                </TableRow>

                            </TableHead>

                            <TableBody>

                                {
                                    auditLogs.length === 0 ?

                                        <TableRow>

                                            <TableCell
                                                colSpan={4}
                                            >

                                                <EmptyState

                                                    title="No Audit Logs Found"

                                                    message="Try changing your search or filters."

                                                    buttonText="Reload"

                                                    onClick={loadAuditLogs}

                                                />

                                            </TableCell>

                                        </TableRow>

                                        :

                                        auditLogs.map(
                                            (
                                                log
                                            ) =>

                                                <TableRow
                                                    hover
                                                    key={log.id}
                                                >

                                                    <TableCell>

                                                        {log.userId}

                                                    </TableCell>

                                                    <TableCell>

                                                        <Typography
                                                            fontWeight={600}
                                                        >
                                                            {log.action}
                                                        </Typography>

                                                    </TableCell>

                                                    <TableCell>

                                                        {log.description}

                                                    </TableCell>

                                                    <TableCell>

                                                        {
                                                            new Date(
                                                                log.createdAt
                                                            ).toLocaleString()
                                                        }

                                                    </TableCell>

                                                </TableRow>

                                        )

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