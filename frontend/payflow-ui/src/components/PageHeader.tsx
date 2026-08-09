import {
    Box,
    Typography
}
from "@mui/material";

interface Props
{
    title: string;
    subtitle?: string;
}

export default function PageHeader(
{
    title,
    subtitle
}: Props)
{
    return (
        <Box
            sx={{
                mb: {
                    xs: 2.5,
                    sm: 3,
                    md: 4
                }
            }}
        >

            <Typography
                variant="h4"
                sx={{
                    fontWeight: 700,
                    fontSize: {
                        xs: "1.6rem",
                        sm: "1.9rem",
                        md: "2.125rem"
                    },
                    lineHeight: 1.2
                }}
            >
                {title}
            </Typography>

            {
                subtitle && (
                    <Typography
                        color="text.secondary"
                        sx={{
                            mt: 1,
                            fontSize: {
                                xs: "0.9rem",
                                sm: "0.95rem",
                                md: "1rem"
                            },
                            lineHeight: 1.5
                        }}
                    >
                        {subtitle}
                    </Typography>
                )
            }

        </Box>
    );
}