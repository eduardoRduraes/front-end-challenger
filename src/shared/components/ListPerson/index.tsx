import { Button, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import { IPerson } from "../../services/persons/ServicePersons";

interface ListPersonProps {
    rows: IPerson[],
    page: number
}

const ListPerson = ({rows, page}: ListPersonProps) => {
    const [totalCount, setTotalCount] = useState(0);
    const[pagination, setPagination] = useState(1);


    return (
        <TableContainer
            component={Paper}
            variant="outlined"
            sx={{
                m:5,
                width: 900
            }}>
            <Table arial-label="customized table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Birth</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        rows.map((row) =>(
                            <TableRow key={row.id}>
                                <TableCell sx={{fontWeight:500, fontSize: 15}}>{row.name}</TableCell>
                                <TableCell sx={{fontWeight:500, fontSize: 15}}>{row.gender}</TableCell>
                                <TableCell sx={{fontWeight:500, fontSize: 15}}>{row.dateBirth}</TableCell>
                                <TableCell><Button sx={{fontWeight:500, fontSize: 15}}>show</Button></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={4} align="justify">
                            <Pagination
                                page={page}
                                count={4}
                            />
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>

        </TableContainer>
    );
};

export { ListPerson };
