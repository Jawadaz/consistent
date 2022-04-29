import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button";

import Drawer from "@mui/material/Drawer"
import ProjectTitle from "../projects/ProjectTitle.js";
import ProjectStats from "../projects/ProjectStats.js";
import ProjectHeader from "../projects/ProjectHeader.js"
import ProjectTags from "../projects/ProjectTags.js"
import ProjectFiltersTags from "../projects/ProjectFiltersTags";
import ProjectFiltersContents from "../projects/ProjectFiltersContents";

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
                sx={{   position:"fixed", 
                        width:"75%"}}
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
                sx={{ position:"fixed", 
                      width:"100%"}}
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
        <Grid container spacing={2} columns={16}>
        <Grid item xs={16} sm={16} md={isSidebarVisible?12:16} lg={isSidebarVisible?12:16}>
        <Container 
            maxWidth="xl" 
            sx={{paddingTop:"16px"}}
        >
        {/* <ProjectToolbar />         */}
            {/* <div className="column1"> */}
                {/* <div className="row1"> */}
                    {/* <ProjectHeader>
                        <ProjectTitle title={projectData.title}/>
                        <h3>
                            Paragraphs
                        </h3>                    
                    </ProjectHeader> */}
                    {/* </div> */}
                    {/* <div  className="ProjectCells">*/}
            <CellsList />
                    {/* </div> */}
            {/* </div> */}
            {/* <div className="column2">

                <div className="ProjectFilters"f>
                    <h3>
                        Tags
                    </h3>            
                    <ProjectTags />
                    <h3>
                        Filter by Tags
                    </h3>
                    <ProjectFiltersTags />
                    <h3>
                        Filter by Content
                    </h3>
                    <ProjectFiltersContents />
                    <h3>
                        Stats
                    </h3>
                    <ProjectStats/>
                </div>
            </div> */}     
        </Container>
        </Grid>
        <Grid item xs={4}>
        <Box 
            maxWidth="xl" 
            sx={{paddingTop:"16px"}}
        >
        </Box>
            {/* <ProjectSidebar /> */}
        </Grid>
        </Grid>        
        </Box>
        </>
    );
}
    
export default ProjectPage;