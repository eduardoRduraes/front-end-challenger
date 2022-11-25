import { Box, Button, Icon, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DetailsPerson } from "../shared/components/DetailsPerson";
import { NavBar } from "../shared/components/NavBar";
import { useDebounce } from "../shared/hooks/useDebounce";
import { IPerson, ServicePersons } from "../shared/services/persons/ServicePersons";


export const Main = () => {
    const [rows, setRows]= useState<IPerson[]>([]);
    const [person, setPerson]= useState<IPerson>({} as IPerson);
    const[searchParams, setSearchParams] = useSearchParams();
    const [open,setOpen] = useState<boolean>(false);

    const {debounce} = useDebounce();

    const filter = useMemo(() => {
        return searchParams.get("filter") || "";
    },[searchParams]);

    const page = useMemo(() => {
        return Number(searchParams.get("page") || "1");
    },[searchParams]);


    useEffect(() => {
        debounce(async () => {
            const response = await ServicePersons.getAll(page, filter.toLocaleUpperCase());
            if(response instanceof Error){
                throw new Error(response.message);
            }
            if(response.length === 0){
                setRows([]);
                return;
            }
            setRows(response);
        });

    },[filter,page]);

    const handleOpen = useCallback((person:IPerson) => {
        setPerson(person);
        setOpen(true);
    },[]);


    const handleClose = useCallback(() => {
        setOpen(false);
    },[]);


    const text = "Opus igitur est dicere possit drua omni species. \"Tu autem in specie, non videntur, nec omnino res est\". Et examine ab eis praecepta ab eius quae habes, et primo et principaliter";

    return (
        <Box sx={{
            display: "flex",
            flexDirection:"column",
            alignItems:"center"
        }}>
            <NavBar/>
            <Box sx={{display:"flex", flexDirection:"column", alignItems:"center",gap:4,marginTop: 15, width:900}}>
                <Box>
                    <Typography variant="subtitle1" sx={{fontWeight:"900", fontSize: 20}}>{text}</Typography>
                </Box>
                {
                    open && <DetailsPerson person={person} handleClose={handleClose}/>
                }

                <Box sx={{display:"flex",justifyContent:"flex-end", alignItems:"center", width:900}}>
                    <TextField variant="outlined"  placeholder="Searching" onChange={(e) => {setSearchParams({filter: e.target.value, page:"1"},{replace:true});}} fullWidth/>
                    <Icon sx={{position:"absolute", paddingRight:4}}>person_search</Icon>
                </Box>


                <TableContainer
                    component={Paper}
                    variant="outlined"
                    sx={{
                        m:5,
                        width: 900,
                        marginTop:0
                    }}>
                    <Table arial-label="customized table">
                        <TableHead sx={{backgroundColor:"#A9A9A9"}}>
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
                                        <TableCell><Button sx={{fontWeight:500, fontSize: 15}} onClick={() => handleOpen(row)}>show</Button></TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={4} align="justify">
                                    <Pagination
                                        onChange={(_,newPage)=> setSearchParams({filter, page:newPage.toString()},{replace:true})}
                                        page={page}
                                        count={50}
                                    />
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>

                </TableContainer>
            </Box>
        </Box>
    );
};
