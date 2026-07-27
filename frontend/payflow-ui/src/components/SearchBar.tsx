import {
    Stack,
    TextField,
    Button
}
from "@mui/material";

import SearchIcon
from "@mui/icons-material/Search";

interface Props
{
    value: string;

    onChange:
        (
            value: string
        ) => void;

    onSearch:
        () => void;
}

export default function SearchBar(
{
    value,
    onChange,
    onSearch
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

            <TextField

                fullWidth
                size="small"
                placeholder="Search..."

                value={value}

                onChange={(e) =>
                    onChange(
                        e.target.value
                    )
                }

            />

<Button
    variant="contained"
    size="large"
    startIcon={<SearchIcon/>}
>
    Search
</Button>

        </Stack>

    );
}