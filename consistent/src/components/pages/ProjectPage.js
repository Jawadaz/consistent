import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

import Drawer from "@mui/material/Drawer"
import ProjectTitle from "../projects/ProjectTitle.js";
import ProjectStats from "../projects/ProjectStats.js";
import ProjectHeader from "../projects/ProjectHeader.js"

import ProjectSidebar from "../projects/ProjectSidebar.js";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import CellsList from "../cells/CellsList.js";
// import { useParams } from "react-router-dom";
import { useContext, useState } from "react";

// import dummyProject from "../../fixtures/dummy_project_1.json"

// import { saveAs } from 'file-saver';
import ProjectContext from "../context/ProjectContext.js";

function ProjectPage( props ){
    
    // const { projectId } = useParams();    
    // const location = useLocation();
    // const search = useLocation().search;
    //const project_filename = new URLSearchParams(search).get('filename');
    // const { projectData, newProject } = useContext(ProjectContext)

    const { projectData } = useContext(ProjectContext);
    const [isSidebarVisible, setIsSidebarVisible ] = useState(true);
    // const [ data, setData ] = useState(projectData);

    // newProject(projectId);
    const sidebarColumns = 6;
    const sidebarColumnsPercent = String(100*(16-sidebarColumns)/16.0) + "%";
    console.log(sidebarColumnsPercent);

    const toggleSidebar=()=>{
        setIsSidebarVisible(!isSidebarVisible);
    }
    // useEffect(()=>{
    //     setData(projectData);
    // },[projectData]);

    // useEffect(()=>{
    //     console.log('ProjectPage.useEffect():');
    // },[]);
    return (
        <>
        {/*  */}
        {/* <Box sx={{ flexGrow: 1 }}> */} 
        {isSidebarVisible?
            <Box 
                sx={{   
                        // position:"fixed", 
                        width: sidebarColumnsPercent
                }}
                display={{ xs: 'none', sm: 'none', md: 'inherit', lg: 'inherit', xl:'inherit'  }}
            >
                <Button
                    onClick={toggleSidebar}
                    sx={{float:"right"}}
                >
                    <ArrowForwardIosIcon />
                </Button>
            </Box>
        :
            <Box 
                sx={{ 
                        // position:"fixed", 
                      width:"100%",
                      maxWidth: "100%"
                      
                }}
                display={{ xs: 'none', sm: 'none', md: 'inherit', lg: 'inherit', xl:'inherit' }}                    
            >
                <Button
                    onClick={toggleSidebar}
                    sx={{float:"right"}}
                >
                    <ArrowBackIosIcon />
                </Button>
            </Box>
        }        
        <Box>
        <Grid 
            container 
            spacing={2} 
            columns={16}
            sx={{
                // marginLeft: "0px"
            }}>
        <Grid 
        item xs={16} sm={16} md={isSidebarVisible?16-sidebarColumns:16} lg={isSidebarVisible?16-sidebarColumns:16}
            sx={{
                // paddingLeft: "0px",
                // paddingRight: "8px"
            }}
        >
        <Container 
            width="100%"
            maxWidth="100%"
            sx={{
                // paddingTop:"16px",
            }}
        >
                    {/* <ProjectHeader>
                        <ProjectTitle title={projectData.title}/>
                    */}
            <CellsList />
        </Container>
        </Grid>
        <Grid 
            item 
            xs={0} sm={0} md={sidebarColumns} lg={sidebarColumns}
        >
        <Box 
            maxWidth="100%" 
            width="100%"
            // sx={{paddingTop:"16px"}}
            display={{
                "xs": "none", 
                "sm": "none", 
                "md": "block", 
                "lg": "block",
                "xl": "block",
            }}
        >
                {isSidebarVisible?<ProjectSidebar />:<Box></Box>}
        </Box>                
        </Grid>
        </Grid>        
        </Box>
        </>
    );
}
    
export default ProjectPage;