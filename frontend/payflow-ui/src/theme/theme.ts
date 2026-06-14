import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette:
    {
        primary:
        {
            main: "#2563EB"
        },

        secondary:
        {
            main: "#0EA5E9"
        },

        background:
        {
            default: "#F8FAFC",
            paper: "#FFFFFF"
        },

        text:
        {
            primary: "#0F172A",
            secondary: "#64748B"
        }
    },

    shape:
    {
        borderRadius: 16
    },

    typography:
    {
        fontFamily:
            "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",

        h3:
        {
            fontWeight: 700
        },

        h4:
        {
            fontWeight: 700
        },

        h5:
        {
            fontWeight: 600
        },

        h6:
        {
            fontWeight: 600
        }
    },

    components:
    {
        MuiPaper:
        {
            styleOverrides:
            {
                root:
                {
                    boxShadow:
                        "0px 4px 20px rgba(15,23,42,0.08)"
                }
            }
        },

        MuiCard:
        {
            styleOverrides:
            {
                root:
                {
                    boxShadow:
                        "0px 4px 20px rgba(15,23,42,0.08)"
                }
            }
        },

        MuiButton:
        {
            styleOverrides:
            {
                root:
                {
                    borderRadius: 12,
                    textTransform: "none",
                    fontWeight: 600
                }
            }
        }
    }
});

export default theme;