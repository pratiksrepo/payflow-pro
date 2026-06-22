import {
    Box,
    Paper,
    Typography,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
}
    from "@mui/material";

import {
    useEffect,
    useState
}
    from "react";

import axios from "axios";

export default function AdminUsersPage() {
    const [
        users,
        setUsers
    ] = useState<any[]>([]);

    const [
        search,
        setSearch
    ] = useState("");

    useEffect(() => {
        const load =
            async () => {
const token =
    localStorage.getItem(
        "accessToken"
    );

const response =
    await axios.get(
        "https://localhost:7093/api/User/all",
        {
            headers:
            {
                Authorization:
                    `Bearer ${token}`
            }
        }
    );

                setUsers(
                    response.data
                );
            };

        void load();
    }, []);

    const filtered =
        users.filter(
            x =>
                x.email
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
        );

    return (
        <Box>

            <Typography
                variant="h4"
                fontWeight={700}
                sx={{ mb: 3 }}
            >
                User Management
            </Typography>

            <TextField
                fullWidth
                label="Search User"
                value={search}
                onChange={
                    e =>
                        setSearch(
                            e.target.value
                        )
                }
                sx={{ mb: 3 }}
            />

            <Paper>
                <Table>

                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Id
                            </TableCell>

                            <TableCell>
                                Email
                            </TableCell>

                            <TableCell>
                                Role
                            </TableCell>

                            <TableCell>
                                Verified
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>

                        {
                            filtered.map(
                                user => (
                                    <TableRow
                                        key={
                                            user.id
                                        }
                                    >
                                        <TableCell>
                                            {
                                                user.id
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                user.email
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                user.role
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                user.emailVerified
                                                    ? "Yes"
                                                    : "No"
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))
                        }

                    </TableBody>

                </Table>
            </Paper>

        </Box>
    );
}