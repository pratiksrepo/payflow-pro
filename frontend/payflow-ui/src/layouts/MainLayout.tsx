import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import { Container } from "@mui/material";

interface Props
{
    children: React.ReactNode;
}

export default function MainLayout(
    { children }: Props)
{
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6">
                        PayFlow Pro
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container
                sx={{ mt: 4 }}>
                {children}
            </Container>
        </>
    );
}