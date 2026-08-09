import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Header from "../layouts/Header";

export default function MainLayout()
{
    return (
        <>
            <Header />

            <Box
                sx={{
                    p: {
                        xs: 2,
                        md: 3
                    },
                    maxWidth: 1400,
                    mx: "auto"
                }}
            >
                <Outlet />
            </Box>
        </>
    );
}