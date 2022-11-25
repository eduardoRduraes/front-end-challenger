import { Avatar, Box, Modal, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { IPerson } from "../../services/persons/ServicePersons";

interface IDetailsProps {
    person: IPerson,
    handleClose:()=>void
}

export const DetailsPerson = ({person,handleClose}:IDetailsProps) => {

    return(
        <Modal
            open={true}
            onClose={handleClose}
            sx={{display:"flex", alignItems:"center", justifyContent:"center"}}
        >
            <Paper sx={{display:"flex", flexDirection:"column" ,alignItems:"center", width:650, borderRadius:6, backgroundColor:"#F0F8FF"}}>
                <Avatar sx={{width:250, height:250, position: "absolute", marginTop:-15}} src={person.image["large"]}/>
                <Box sx={{marginTop:20,display:"flex", flexDirection:"column", alignItems:"flex-start", paddingX:10, gap:1}}>
                    <Typography variant="inherit" sx={{fontWeight:900, fontSize: 20, fontFamily:"Roboto"}}>ID: {person.id}</Typography>
                    <Typography variant="inherit" sx={{fontWeight:900, fontSize: 20, fontFamily:"Roboto"}}>Nome: {person.name}</Typography>
                    <Typography variant="inherit" sx={{fontWeight:900, fontSize: 20, fontFamily:"Roboto"}}>E-mail: {person.email}</Typography>
                    <Typography variant="inherit" sx={{fontWeight:900, fontSize: 20, fontFamily:"Roboto"}}>Gênero: {person.gender}</Typography>
                    <Typography variant="inherit" sx={{fontWeight:900, fontSize: 20, fontFamily:"Roboto"}}>Data Nascimento: {person.dateBirth}</Typography>
                    <Typography variant="inherit" sx={{fontWeight:900, fontSize: 20, fontFamily:"Roboto"}}>Telefone: {person.phone}</Typography>
                    <Typography variant="inherit" sx={{fontWeight:900, fontSize: 20, fontFamily:"Roboto"}}>Nacionalidade: {person.nationality}</Typography>
                    <Typography variant="inherit" sx={{fontWeight:900, fontSize: 20, fontFamily:"Roboto"}}>Endereço: {person.address}</Typography>
                </Box>
            </Paper>
        </Modal>
    );
};
