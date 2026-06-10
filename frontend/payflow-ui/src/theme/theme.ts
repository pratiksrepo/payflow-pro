import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#1565c0"
        },
        secondary: {
            main: "#00acc1"
        },
        background: {
            default: "#f4f7fb"
        }
    },

    shape: {
        borderRadius: 12
    }
});

export default theme;