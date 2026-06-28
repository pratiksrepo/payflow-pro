import
{
    Pagination,
    Stack,
    Typography
}
from "@mui/material";

interface Props
{
    page:number;

    totalPages:number;

    onChange:
    (
        page:number
    )=>void;
}

export default function CommonPagination(
{
    page,
    totalPages,
    onChange
}:Props)
{
    return(

        <Stack
            spacing={2}
            alignItems="center"
            sx={{
                mt:3
            }}
        >

            <Typography>

                Page {page}

                of

                {totalPages}

            </Typography>

            <Pagination

                page={page}

                count={totalPages}

                color="primary"

                onChange={
                    (_,
                    value)=>
                    onChange(value)
                }

            />

        </Stack>

    );
}