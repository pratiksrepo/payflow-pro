import
{
    Card,
    CardContent,
    Stack,
    Typography,
    Avatar,
    Box
}
from "@mui/material";

import TrendingUpIcon
from "@mui/icons-material/TrendingUp";

import TrendingDownIcon
from "@mui/icons-material/TrendingDown";

import type
{
    ReactNode
}
from "react";

interface DashboardCardProps
{
    title: string;

    value: string | number;

    icon: ReactNode;

    color: string;

    subtitle?: string;

    trend?: number;

    loading?: boolean;
}

export default function DashboardCard(
{
    title,
    value,
    icon,
    color,
    subtitle,
    trend,
    loading
}: DashboardCardProps)
{
    if (loading)
    {
        return null;
    }

    return (

        <Card

            elevation={4}

            sx={{
                borderRadius: 4,
                height: "100%",
                transition: "0.3s",
                cursor: "pointer",

                "&:hover":
                {
                    transform: "translateY(-5px)",
                    boxShadow: 8
                }
            }}

        >

            <CardContent>

                <Stack

                    direction="row"

                    justifyContent="space-between"

                    alignItems="center"

                >

                    <Box>

                        <Typography

                            variant="body2"

                            color="text.secondary"

                        >

                            {title}

                        </Typography>

                        <Typography

                            variant="h4"

                            fontWeight={700}

                            sx={{
                                mt: 1
                            }}

                        >

                            {value}

                        </Typography>

                    </Box>

                    <Avatar

                        sx={{
                            bgcolor: color,
                            width: 58,
                            height: 58
                        }}

                    >

                        {icon}

                    </Avatar>

                </Stack>

                {

                    subtitle &&

                    <Typography

                        variant="body2"

                        color="text.secondary"

                        sx={{
                            mt: 2
                        }}

                    >

                        {subtitle}

                    </Typography>

                }

                {

                    trend !== undefined &&

                    <Stack

                        direction="row"

                        spacing={1}

                        alignItems="center"

                        sx={{
                            mt: 2
                        }}

                    >

                        {

                            trend >= 0

                                ?

                                <TrendingUpIcon
                                    color="success"
                                    fontSize="small"
                                />

                                :

                                <TrendingDownIcon
                                    color="error"
                                    fontSize="small"
                                />

                        }

                        <Typography

                            color={
                                trend >= 0
                                    ?
                                    "success.main"
                                    :
                                    "error.main"
                            }

                            fontWeight={600}

                        >

                            {

                                trend >= 0

                                    ?

                                    `+${trend}%`

                                    :

                                    `${trend}%`

                            }

                        </Typography>

                    </Stack>

                }

            </CardContent>

        </Card>

    );
}