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

export default function FilterPanel(
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

            direction="row"

            spacing={2}

            sx={{
                mb: 3
            }}

        >

            <FormControl>

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

                    <MenuItem value="Pending">
                        Pending
                    </MenuItem>

                    <MenuItem value="Completed">
                        Completed
                    </MenuItem>

                    <MenuItem value="Failed">
                        Failed
                    </MenuItem>

                </Select>

            </FormControl>

            <FormControl>

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

            <FormControl>

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