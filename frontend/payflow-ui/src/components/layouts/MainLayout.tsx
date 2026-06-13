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
                    p: 3
                }}
            >
                <Outlet />
            </Box>
        </>
    );
}