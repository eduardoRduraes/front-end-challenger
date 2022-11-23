import { Box, Button, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { NavBar } from "../shared/components/NavBar";
import { IPerson, ServicePersons } from "../shared/services/persons/ServicePersons";


export const Main = () => {
    const [rows, setRows]= useState<IPerson[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const[pagination, setPagination] = useState(1);

    useEffect(() => {
        const call  = async () => {
            const response = await ServicePersons.getAll(pagination);
            if(response instanceof Error){
                throw new Error(response.message);
            }

            setRows(response);
            setTotalCount(response.length);
        };
        call();
    },[pagination]);


    const text = "Opus igitur est dicere possit drua omni species. \"Tu autem in specie, non videntur, nec omnino res est\". Et examine ab eis praecepta ab eius quae habes, et primo et principaliter";

    return (
        <Box sx={{
            display: "flex",
            flexDirection:"column",
            alignItems:"center"
        }}>
            <NavBar/>
            <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", marginTop: 15, width:900}}>
                <Box>
                    <Typography variant="subtitle1" sx={{fontWeight:"900", fontSize: 20}}>{text}</Typography>
                </Box>
                <Box>
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
                                    <TableCell sx={{fontWeight:900, fontSize:20}}>Name</TableCell>
                                    <TableCell sx={{fontWeight:900, fontSize:20}}>Gender</TableCell>
                                    <TableCell sx={{fontWeight:900, fontSize:20}}>Birth</TableCell>
                                    <TableCell sx={{fontWeight:900, fontSize:20}}>Actions</TableCell>
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
                                            onChange={(_,newPage)=>setPagination(newPage)}
                                            count={50}
                                            page={pagination}

                                        />
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>

                    </TableContainer>
                </Box>
            </Box>
        </Box>
    );
};
