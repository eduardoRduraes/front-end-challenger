import { AppBar, Avatar, Box, Container, Toolbar, Typography } from "@mui/material";
import Logo from "../../../assets/logo.png";

export const NavBar = () => {

    return(
        <AppBar>
            <Container>
                <Toolbar disableGutters sx={{ display:"flex", justifyContent:"space-between", marginY:2}}>
                    <Box sx={{ display:"flex", alignItems: "center", gap: 2}}>
                        <Box
                            component="img"
                            sx={{
                                width:60
                            }}
                            src={Logo}
                        />
                        <Typography variant="h4" sx={{fontWeight:"500"}}>Company</Typography>
                    </Box>
                    <Avatar alt="" src="" sx={{width:60, height:60}}/>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
