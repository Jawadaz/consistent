
import Box from "@mui/material/Box"
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { Global } from '@emotion/react';
import ProjectFiltersContent from "./ProjectFiltersContents";
import ProjectFiltersTags from "./ProjectFiltersTags";
import ProjectFilterAndOrSwitch from "./ProjectFilterAndOrSwitch";


const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}));

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const drawerBleeding = 56;

function ProjectSwipeableDrawer( props ){
    
    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    // console.log(props.showDrawer);

    return (
    <>
        <Box
            maxWidth="100%" 
            width="100%"
            onClick={toggleDrawer(!open)}
        >
            { props.showDrawer &&
             <Global
                sx={{
                    
                }}
                styles={{
                '.MuiDrawer-root > .MuiPaper-root': {
                    // height: `calc(50% - ${drawerBleeding}px)`,
                    overflow: 'visible',
                },  
                }}
            />
            }
            <SwipeableDrawer
                // container={container}
                anchor="bottom"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                onClick={toggleDrawer(true)}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                }}
                xs={{
                    backgroundColor: 'primary'
                }}
            >
                <StyledBox
                    sx={{
                        position: 'absolute',
                        top: -drawerBleeding/2,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                    }}
                >
                    <Puller />
                <Typography sx={{ p: 2, color: 'text.secondary' }}>
                </Typography>
                </StyledBox>
                <StyledBox
                    sx={{
                        px: 2,
                        pb: 2,
                        height: '100%',
                        overflow: 'auto',
                    }}
                >
                    <ProjectFilterAndOrSwitch />
                    <ProjectFiltersContent />
                    <ProjectFiltersTags />
                </StyledBox>
            </SwipeableDrawer>
        </Box>
    </>
    )
}

export default ProjectSwipeableDrawer;