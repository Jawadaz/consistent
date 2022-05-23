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
import { spacing } from "@mui/system";

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

    const headerHeight=()=>{
        var height = document.getElementsByTagName('header')[0].offsetHeight;
        console.log(height);
        return height;
    }

    const spacing=16
    
    return (
        <>
        {isSidebarVisible?
            <></>
            :
            <Box
                position='absolute'
                right= '0px'
            >
                <Button
                    onClick={toggleSidebar}
                >
                    <ArrowBackIosIcon />
                </Button>        
            </Box>
        }
        <Box
            sx={{
                height: `calc(100vh - ${headerHeight()}px - ${spacing}px)`,
            }}
        >
            <Grid 
                container 
                spacing={2} 
                columns={16}
                sx={{
                    // marginLeft: '0px',
                    marginTop: '8px',
                    height: 'inherit',
                }}
            >               
                <Grid 
                    item 
                    xs={16} 
                    sm={16} 
                    md={isSidebarVisible?16-sidebarColumns:16} 
                    lg={isSidebarVisible?16-sidebarColumns:16}
                    height="inherit"
                    sx={{
                        '&.MuiGrid-item': {
                            // marginTop: `${spacing}px`,
                            paddingTop: '0px'
                        },
                        height: "inherit",
                        // scrollPaddingTop: '80px',
                    }}
                >
                    <Container 
                        width="100%"
                        maxWidth="100%"
                        height="inherit"
                        disableGutters
                        sx={
                            isSidebarVisible?
                            {
                                maxHeight: '100%',
                                overflow: 'auto',
                                paddingLeft: '16px',
                            }
                            :
                            {
                                maxHeight: '100%',
                                overflow: 'auto',
                                paddingLeft: '16px',
                                paddingRight: '32px',
                            }                                
                        }
                    >
                        <CellsList />
                    </Container>
                </Grid>
            {isSidebarVisible?
                <Grid 
                    item 
                    xs={0} 
                    sm={0} 
                    md={sidebarColumns} 
                    lg={sidebarColumns}
                    sx={{
                        '&.MuiGrid-item': {
                            paddingLeft: '0px',
                            paddingTop: '0px',
                        },
                        height: "inherit",
                    }}
                >
                    <Box
                    >
                        <Container
                            sx={{
                                '&.MuiContainer-root': {
                                    paddingLeft: '8px',
                                    paddingRight: '24px'
                                }
                            }}
                        >
                        <Button
                            onClick={toggleSidebar}
                            sx={{
                                justifyContent: "left",
                            }}
                        >
                            <ArrowForwardIosIcon />
                        </Button>
                        </Container>
                    </Box>
                    <Box 
                        maxWidth="100%" 
                        width="100%"
                        sx={{
                            width:'100%',
                            height: '100%',
                            paddingLeft: '0px',
                            display: {
                                "xs": "none", 
                                "sm": "none", 
                                "md": "block", 
                                "lg": "block",
                                "xl": "blSock",
                            }
                        }}
                    >
                        <Container
                            sx={{
                                maxHeight: '100%',
                                overflow: 'auto',
                                '&.MuiContainer-root': {
                                    paddingLeft: '8px',
                                    paddingRight: '24px'
                                }
                            }}
                        >
                            <ProjectSidebar />
                        </Container>
                    </Box>              
                </Grid>
            :
                <></>
            }
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