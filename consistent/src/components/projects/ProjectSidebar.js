import ProjectTags from "../projects/ProjectTags.js"
import ProjectFiltersTags from "../projects/ProjectFiltersTags";
import ProjectFiltersContents from "../projects/ProjectFiltersContents";
import ProjectStats from "../projects/ProjectStats";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useState } from "react";
import PropTypes from 'prop-types';
import { Divider } from "@mui/material";


// const TagsAccordion = styled((props) => (
//     <Accordion 
//         disableGutters 
//         elevation={0} 
//         square {...props} />
//     ))(({ theme }) => ({
//             border: `1px solid ${theme.palette.divider}`, 
//             '&:not(:last-child)': {
//                 borderBottom: 0,
//             },
//             '&:before': {
//                 display: 'none',
//             },
//         })
//     );
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
    >
        {value === index && (
            // <Box sx={{ p: 3 }}>
            <Box>
                {children}
            </Box>
        )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function ProjectSidebar () {

    const [value, setValue] = useState(0);

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs 
                    value={value} 
                    onChange={ handleChange} 
                    aria-label="Project's sidebar tabs"
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    <Tab label="Filters" {...a11yProps(0)} />
                    <Tab label="Stats" {...a11yProps(1)} />
                    <Tab label="Graph" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel 
                value={value} 
                index={0}
            >
            <Box    
                paddingTop="16px"
            >
                <ProjectFiltersContents />

                <ProjectFiltersTags />
                <Accordion
                    disableGutters
                    elevation={0}
                    square
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                    <Typography gutterBottom component="div">
                        Show Tags
                    </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ProjectTags />
                    </AccordionDetails>
                </Accordion>

            </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
            <Box>
                <ProjectStats/>
            </Box>                
            </TabPanel>
            <TabPanel value={value} index={2}>
            <Box>
                Item Three
            </Box>
            </TabPanel>
        </>
    )
}

export default ProjectSidebar; 