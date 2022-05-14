import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button";

import ProjectSidebar from "../projects/ProjectSidebar";
import ProjectSwipeableDrawer from "../projects/ProjectSwipeableDrawer.js";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import CellsList from "../cells/CellsList.js";
import { useState } from "react";

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

function ProjectPage( props ){
    
    const theme = useTheme();
    const matchesDownMd = useMediaQuery(theme.breakpoints.down('md'));
    const smallViewport = matchesDownMd;
    // console.log(smallViewport);

    // const { projectData } = useContext(ProjectContext);
    const [isSidebarVisible, setIsSidebarVisible ] = useState(true);

    const sidebarColumns = 5;
    // const sidebarColumnsPercent = String(100*(16-sidebarColumns+.5)/16.0) + "%";

    const toggleSidebar=()=>{
        setIsSidebarVisible(!isSidebarVisible);
    }
;
    return (
        <>
        <Box            
            sx= {{
                display:{
                    "xs": "none", 
                    "sm": "none", 
                    "md": "block", 
                    "lg": "block",
                    "xl": "block"
                }
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
                        visibility={isSidebarVisible?"visible":"hidden"}
                        sx={{
                            width: isSidebarVisible?"100%":0,
                            height: isSidebarVisible?"100%":0,
                            paddingLeft: '0ps',
                            display:{
                                "xs": "none", 
                                "sm": "none", 
                                "md": "block", 
                                "lg": "block",
                                "xl": "block",
                            }
                        }}
                    >
                        <Container>
                            <ProjectSidebar />
                        </Container>
                    </Box>              
                </Grid>
            </Grid>        
        </Box>
        { smallViewport &&
        <Box
            sx={{
                display:{
                    "xs": "block", 
                    "sm": "block", 
                    "md": "none", 
                    "lg": "none",
                    "xl": "none",
                },
            }}
        >
            <Grid 
                container 
                spacing={2} 
                columns={16}
            >
                <Grid 
                    item
                    xs={16}
                    sm={16}
                >
                    <ProjectSwipeableDrawer showDrawer={smallViewport}/>
                </Grid>
            </Grid>
        </Box>
        }
        </>
    );
}
    
export default ProjectPage;