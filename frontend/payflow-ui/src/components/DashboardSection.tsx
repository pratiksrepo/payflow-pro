import
{
    Paper,
    Typography
}
from "@mui/material";

import type
{
    ReactNode
}
from "react";

interface Props
{
    title:string;

    children:ReactNode;
}

export default function DashboardSection(
{
    title,
    children
}:Props)
{
    return(

        <Paper

            elevation={4}

            sx={{

                p:3,

                mt:4,

                borderRadius:4

            }}

        >

            <Typography

                variant="h6"

                fontWeight={700}

                mb={3}

            >

                {title}

            </Typography>

            {children}

        </Paper>

    );
}