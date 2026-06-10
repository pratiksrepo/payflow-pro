import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography
}
from "@mui/material";

export default function LoginPage()
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
                width: 450,
                p: 2,
                boxShadow: 5,
                borderRadius: 3
            }}
        >
            <CardContent>
                <Typography
                    variant="h4"
                    gutterBottom
                    fontWeight="bold"
                >
                    PayFlow Pro
                </Typography>

                <Typography
                    color="text.secondary"
                    mb={3}
                >
                    Sign in to continue
                </Typography>

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
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{ mt: 3 }}
                >
                    Login
                </Button>
            </CardContent>
        </Card>
    </Box>
);
}