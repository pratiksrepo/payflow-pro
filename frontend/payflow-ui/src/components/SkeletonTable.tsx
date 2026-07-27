import
{
    Paper,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Skeleton,
    TableContainer
}
from "@mui/material";

interface Props
{
    rows?:number;

    columns?:number;
}

export default function SkeletonTable(
{
    rows=5,

    columns=4

}:Props)
{
    return(

        <TableContainer
            component={Paper}
            sx={{
                borderRadius:3
            }}
        >

            <Table>

                <TableHead>

                    <TableRow>

                        {
                            [...Array(columns)].map(
                                (
                                    _,
                                    index
                                )=>

                                <TableCell
                                    key={index}
                                >

                                    <Skeleton
                                        width={100}
                                    />

                                </TableCell>

                            )
                        }

                    </TableRow>

                </TableHead>

                <TableBody>

                    {
                        [...Array(rows)].map(
                            (
                                _,
                                row
                            )=>

                            <TableRow
                                key={row}
                            >

                                {
                                    [...Array(columns)].map(
                                        (
                                            _,
                                            col
                                        )=>

                                        <TableCell
                                            key={col}
                                        >

                                            <Skeleton/>

                                        </TableCell>

                                    )
                                }

                            </TableRow>

                        )
                    }

                </TableBody>

            </Table>

        </TableContainer>

    );
}