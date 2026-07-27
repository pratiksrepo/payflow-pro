import
{
    Grid,
    Card,
    CardContent,
    Skeleton
}
from "@mui/material";

export default function SkeletonCards()
{
    return(

        <Grid
            container
            spacing={3}
        >

            {
                [...Array(4)].map(
                    (
                        _,
                        index
                    )=>

                    <Grid

                        key={index}

                        size={{
                            xs:12,
                            md:3
                        }}

                    >

                        <Card
                            sx={{
                                borderRadius:4
                            }}
                        >

                            <CardContent>

                                <Skeleton
                                    variant="text"
                                    width="50%"
                                    height={30}
                                />

                                <Skeleton
                                    variant="text"
                                    width="70%"
                                    height={50}
                                />

                                <Skeleton
                                    variant="rounded"
                                    height={40}
                                    sx={{
                                        mt:2
                                    }}
                                />

                            </CardContent>

                        </Card>

                    </Grid>

                )
            }

        </Grid>

    );
}