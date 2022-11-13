import { Box, Typography } from "@mui/material";
import { NavBar } from "../shared/components/NavBar";


export const Main = () => {

    const text = "Opus igitur est dicere possit drua omni species. \"Tu autem in specie, non videntur, nec omnino res est\". Et examine ab eis praecepta ab eius quae habes, et primo et principaliter";

    return (
        <Box sx={{
            display: "flex",
            flexDirection:"column",
            alignItems:"center"
        }}>
            <NavBar/>
            <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", marginTop: 20, width:800}}>
                <Box>
                    <Typography variant="subtitle2" sx={{fontWeight:"500", fontSize: 19}}>{text}</Typography>
                </Box>
            </Box>
        </Box>
    );
};
