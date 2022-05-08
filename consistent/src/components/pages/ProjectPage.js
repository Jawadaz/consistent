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
    const sidebarColumns = 5;
    const sidebarColumnsPercent = String(100*(16-sidebarColumns+.5)/16.0) + "%";

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
        {/* {isSidebarVisible?
                sx={{   
                        // position:"fixed", 
                        width: sidebarColumnsPercent
                }}
        */}
        <Box
            display={{
                "xs": "none", 
                "sm": "none", 
                "md": "block", 
                "lg": "block",
                "xl": "block",
            }}
        >
            <Grid 
                container 
                spacing={2} 
                columns={16}
                sx={{
                    // marginLeft: "0px"
                    display: { md: 'content', lg: 'content', xl: 'content'}
                }}>
                <Grid 
                    item
                    xs={16-sidebarColumns}
                    sm={16-sidebarColumns} 
                    md={16-sidebarColumns} 
                    lg={16-sidebarColumns}
                >
                </Grid>
                <Grid
                    item
                    xs={sidebarColumns}
                    sm={sidebarColumns}
                    md={sidebarColumns} 
                    lg={sidebarColumns}

                    sx={{
                            paddingLeft:"0px"
                    }}
                >
                    <Box>
                        {isSidebarVisible?
                        <Container>
                        <Button
                            onClick={toggleSidebar}
                            sx={{
                                justifyContent: "left",
                                paddingLeft:"0px"
                            }}
                        >
                            <ArrowForwardIosIcon />
                        </Button>
                        </Container>
                        :
                        <Container>
                        <Button
                            onClick={toggleSidebar}
                            sx={{
                                justifyContent: "right",
                                float:"right"
                            }}
                        >
                            <ArrowBackIosIcon />
                        </Button>    
                        </Container>        
                        }        
                    </Box>
                </Grid>
            </Grid>
        </Box>
        <Box>
            <Grid 
                container 
                spacing={2} 
                columns={16}
                sx={{
                    // marginLeft: "0px"
                }}
            >
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
                            paddingTop:"16px",
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
                    sx={{
                        paddingLeft: '0px'
                    }}
                >
                    <Box 
                        maxWidth="100%" 
                        width="100%"
                        display={{
                            "xs": "none", 
                            "sm": "none", 
                            "md": "block", 
                            "lg": "block",
                            "xl": "block",
                        }}
                        visibility={isSidebarVisible?"visible":"hidden"}
                        sx={{
                            width: isSidebarVisible?"100%":0,
                            height: isSidebarVisible?"100%":0,
                            paddingLeft: '0ps'
                        }}
                    >
                        <Container>
                            <ProjectSidebar />
                        </Container>
                    </Box>              
                </Grid>
            </Grid>        
        </Box>
        </>
    );
}
    
export default ProjectPage;