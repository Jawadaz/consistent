import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import ProjectToolbar from "./ProjectToolbar";
import NavigationBar from "./NavigationBar";
import Box from "@mui/material/Box";

import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react'

function ApplicationBar() {
    const location = useLocation()
    const [ check, setCheck ] = useState(false);
    useEffect(() => {
        // runs on location, i.e. route, change
        // console.log('handle route change here', location);
        if(location.pathname.length>0){
            setCheck(location.pathname.split('/')[1]==="projects");
        }

    }, [location])

    return (
        <>
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky">
            <Container maxWidth="xl" width="100%">
                <NavigationBar />
            </Container>
            {                 
            check
            &&

            <Container 
                maxWidth="xl" 
                width="100%" 
                sx={{
                    backgroundColor:"white"
                }}
                // backgroundColor="white"
                // color="white"
                >
                {/* <Fade> */}
                    <ProjectToolbar />
                {/* </Fade> */}
            </Container>
            }
        </AppBar>
        </Box>
        </>
    );
}

export default ApplicationBar;