import
{
    Stack,
    FormControl,
    InputLabel,
    Select,
    MenuItem
}
from "@mui/material";

interface Props
{
    action: string;

    sort: string;

    pageSize: number;

    onActionChange:
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

export default function AuditFilterPanel(
{
    action,
    sort,
    pageSize,
    onActionChange,
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
            flexWrap="wrap"
            sx={{
                mb: 3,
                width: "100%"
            }}
        >

            <FormControl
                fullWidth
                sx={{
                    minWidth: {
                        sm: 220
                    }
                }}
            >

                <InputLabel>
                    Action
                </InputLabel>

                <Select
                    value={action}
                    label="Action"
                    onChange={(e) =>
                        onActionChange(
                            e.target.value
                        )
                    }
                >

                    <MenuItem value="">
                        All
                    </MenuItem>

                    <MenuItem value="Login">
                        Login
                    </MenuItem>

                    <MenuItem value="Logout">
                        Logout
                    </MenuItem>

                    <MenuItem value="Payment Created">
                        Payment Created
                    </MenuItem>

                    <MenuItem value="Payment Updated">
                        Payment Updated
                    </MenuItem>

                    <MenuItem value="Wallet Credited">
                        Wallet Credited
                    </MenuItem>

                    <MenuItem value="Wallet Debited">
                        Wallet Debited
                    </MenuItem>

                    <MenuItem value="Notification Sent">
                        Notification Sent
                    </MenuItem>

                    <MenuItem value="Admin Action">
                        Admin Action
                    </MenuItem>

                </Select>

            </FormControl>


            <FormControl
                fullWidth
                sx={{
                    minWidth: {
                        sm: 170
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
                        sm: 140
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