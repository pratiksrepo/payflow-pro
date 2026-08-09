import {
    Stack,
    FormControl,
    InputLabel,
    Select,
    MenuItem
}
from "@mui/material";

interface Props
{
    status: string;

    sort: string;

    pageSize: number;

    onStatusChange:
        (
            value: string
        ) => void;

    onSortChange:
        (
            value: string
        ) => void;

    onPageSizeChange:
        (
            value: number
        ) => void;
}

export default function NotificationFilterPanel(
{
    status,
    sort,
    pageSize,
    onStatusChange,
    onSortChange,
    onPageSizeChange
}: Props)
{
    return (
        <Stack
            direction={{
                xs: "column",
                sm: "row"
            }}
            spacing={2}
            sx={{
                mb: 3,
                width: "100%"
            }}
        >

            <FormControl
                fullWidth
                sx={{
                    minWidth: {
                        sm: 150
                    }
                }}
            >

                <InputLabel>
                    Status
                </InputLabel>

                <Select
                    value={status}
                    label="Status"
                    onChange={(e) =>
                        onStatusChange(
                            e.target.value
                        )
                    }
                >

                    <MenuItem value="">
                        All
                    </MenuItem>

                    <MenuItem value="Read">
                        Read
                    </MenuItem>

                    <MenuItem value="Unread">
                        Unread
                    </MenuItem>

                </Select>

            </FormControl>


            <FormControl
                fullWidth
                sx={{
                    minWidth: {
                        sm: 150
                    }
                }}
            >

                <InputLabel>
                    Sort
                </InputLabel>

                <Select
                    value={sort}
                    label="Sort"
                    onChange={(e) =>
                        onSortChange(
                            e.target.value
                        )
                    }
                >

                    <MenuItem value="newest">
                        Newest
                    </MenuItem>

                    <MenuItem value="oldest">
                        Oldest
                    </MenuItem>

                </Select>

            </FormControl>


            <FormControl
                fullWidth
                sx={{
                    minWidth: {
                        sm: 120
                    }
                }}
            >

                <InputLabel>
                    Rows
                </InputLabel>

                <Select
                    value={pageSize}
                    label="Rows"
                    onChange={(e) =>
                        onPageSizeChange(
                            Number(
                                e.target.value
                            )
                        )
                    }
                >

                    <MenuItem value={5}>
                        5
                    </MenuItem>

                    <MenuItem value={10}>
                        10
                    </MenuItem>

                    <MenuItem value={25}>
                        25
                    </MenuItem>

                    <MenuItem value={50}>
                        50
                    </MenuItem>

                </Select>

            </FormControl>

        </Stack>
    );
}