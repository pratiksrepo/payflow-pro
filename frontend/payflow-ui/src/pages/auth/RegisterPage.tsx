import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography
}
from "@mui/material";

export default function RegisterPage()
{
return (
    <Box
        sx={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f4f7fb"
        }}
    >
        <Card
            sx={{
                width: 500,
                p: 2,
                boxShadow: 5,
                borderRadius: 3
            }}
        >
            <CardContent>

<Typography
    variant="h4"
    sx={{
        fontWeight: 700,
        mb: 1,
    }}
>
                    Create Account
                </Typography>

<Typography
    variant="h3"
    sx={{
        fontWeight: 700,
        mt: 1,
    }}
>
                    Join PayFlow Pro
                </Typography>

                <TextField
                    label="First Name"
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Last Name"
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Email"
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                />

                <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{ mt: 3 }}
                >
                    Register
                </Button>

            </CardContent>
        </Card>
    </Box>
);
}