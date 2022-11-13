import { Box, CssBaseline } from "@mui/material";

export const BaseLayout:React.FC<{children:JSX.Element}> = ({children}) => {
    return (
        <Box display="flex" flexDirection="column">
            <CssBaseline/>
            {children}
        </Box>
    );
};
