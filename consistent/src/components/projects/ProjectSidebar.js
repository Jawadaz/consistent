import ProjectFiltersTags from "../projects/ProjectFiltersTags";
import ProjectFiltersContents from "../projects/ProjectFiltersContents";
import ProjectFilterAndOrSwitch from "./ProjectFilterAndOrSwitch";
import ProjectStats from "../projects/ProjectStats";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";


import { useState, useContext } from "react";
import PropTypes from 'prop-types';

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

    const handleTagSelectChange = (e, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs 
                    value={value} 
                    onChange={ handleTagSelectChange} 
                    aria-label="Project's sidebar tabs"
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    <Tab label="Filters" {...a11yProps(0)} />
                    <Tab label="Stats" {...a11yProps(1)} />
                    {/* <Tab label="Graph" {...a11yProps(2)} /> */}
                </Tabs>
            </Box>
            <TabPanel 
                value={value} 
                index={0}
            >
            <Box    
                paddingTop="16px"
            >   
                <ProjectFilterAndOrSwitch />
                <ProjectFiltersContents />
                <ProjectFiltersTags showTagsButton={true} />

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