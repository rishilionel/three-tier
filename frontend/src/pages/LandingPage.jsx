import { Box, Button, Paper, Typography } from "@mui/material";
import Header from "../components/Header";
import BookTable from "../components/BookTable";

const LandingPage = () => {

    return (
        <>
            <Header />
            <br />
            <Box display='flex' textAlign='left' style={{ paddingLeft: '30px' }}>
                <Typography style={{ fontSize: '20px' }}>
                    List of Books Details:
                </Typography>
            </Box>
            <Box margin='50px'>
                <Paper elevation={10}>
                    <br />
                    <Box style={{margin:'20px'}}>
                        <BookTable />   
                        <br />
                    </Box>
                    
                </Paper>
            </Box>
        </>
    );
}

export default LandingPage;