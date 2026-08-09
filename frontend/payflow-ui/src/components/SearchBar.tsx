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
                onKeyDown={(e) =>
                {
                    if (e.key === "Enter")
                    {
                        onSearch();
                    }
                }}
            />

            <Button
                variant="contained"
                size="medium"
                startIcon={
                    <SearchIcon />
                }
                onClick={onSearch}
                sx={{
                    minWidth: {
                        xs: "100%",
                        sm: 120
                    },
                    height: {
                        xs: 40,
                        sm: 40
                    }
                }}
            >
                Search
            </Button>

        </Stack>
    );
}