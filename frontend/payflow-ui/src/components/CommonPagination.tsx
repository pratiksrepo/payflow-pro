import {
    Pagination,
    Stack,
    Typography,
    useMediaQuery,
    useTheme
}
from "@mui/material";

interface Props
{
    page: number;

    totalPages: number;

    onChange:
        (
            page: number
        ) => void;
}

export default function CommonPagination(
{
    page,
    totalPages,
    onChange
}: Props)
{
    const theme = useTheme();

    const isMobile =
        useMediaQuery(
            theme.breakpoints.down("sm")
        );

    return (
        <Stack
            spacing={{
                xs: 1,
                sm: 1.5
            }}
            alignItems="center"
            sx={{
                mt: {
                    xs: 2,
                    sm: 3
                },
                mb: {
                    xs: 1,
                    sm: 2
                },
                width: "100%"
            }}
        >

            <Typography
                variant="body2"
                color="text.secondary"
            >
                Page {page} of {totalPages}
            </Typography>

            <Pagination
                page={page}
                count={totalPages}
                color="primary"
                size={
                    isMobile
                        ? "small"
                        : "medium"
                }
                siblingCount={
                    isMobile
                        ? 0
                        : 1
                }
                boundaryCount={1}
                onChange={
                    (_, value) =>
                        onChange(value)
                }
            />

        </Stack>
    );
}