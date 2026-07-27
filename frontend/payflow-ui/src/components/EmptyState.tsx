import
{
    Box,
    Typography,
    Button
}
from "@mui/material";

import InboxIcon
from "@mui/icons-material/Inbox";

import RefreshIcon
from "@mui/icons-material/Refresh";

interface Props
{
    title?:string;

    message?:string;

    buttonText?:string;

    onClick?:()=>void;
}

export default function EmptyState(
{
    title="No Records Found",

    message=
    "Try changing your search or filters.",

    buttonText,

    onClick

}:Props)
{
    return(

        <Box

            sx={{

                display:"flex",

                flexDirection:"column",

                alignItems:"center",

                justifyContent:"center",

                py:8,

                textAlign:"center"

            }}

        >

            <InboxIcon

                sx={{

                    fontSize:90,

                    color:"text.disabled",

                    mb:2

                }}

            />

            <Typography

                variant="h5"

                fontWeight={700}

                gutterBottom

            >

                {title}

            </Typography>

            <Typography

                color="text.secondary"

                sx={{
                    mb:3
                }}

            >

                {message}

            </Typography>

            {

                buttonText && onClick &&

                <Button

                    variant="contained"

                    startIcon={
                        <RefreshIcon/>
                    }

                    onClick={onClick}

                >

                    {buttonText}

                </Button>

            }

        </Box>

    );
}