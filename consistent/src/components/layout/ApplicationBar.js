import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import ProjectToolbar from "./ProjectToolbar";
import NavigationBar from "./NavigationBar";
import { useState } from "react";   

function ApplicationBar() {
    return (
        <>
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <NavigationBar />
                {/* <ProjectToolbar /> */}
            </Container>
        </AppBar>
        </>
    );
}

export default ApplicationBar;