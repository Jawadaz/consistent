import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import ProjectTitle from "../projects/ProjectTitle.js";
import ProjectStats from "../projects/ProjectStats.js";
import ProjectHeader from "../projects/ProjectHeader.js";
import ProjectTags from "../projects/ProjectTags.js";
import ProjectFiltersTags from "../projects/ProjectFiltersTags";
import ProjectFiltersContents from "../projects/ProjectFiltersContents";


import CellsList from "../cells/CellsList.js";
// import { useParams } from "react-router-dom";
import { useContext } from "react";

// import dummyProject from "../../fixtures/dummy_project_1.json"

// import { saveAs } from 'file-saver';
import ProjectContext from "../context/ProjectContext.js";

function ProjectPage( props ){
    
    // const { projectId } = useParams();    
    // const location = useLocation();
    // const search = useLocation().search;
    //const project_filename = new URLSearchParams(search).get('filename');
    // const { projectData, newProject } = useContext(ProjectContext)

    const { projectData } = useContext(ProjectContext)
    // const [ data, setData ] = useState(projectData);

    // newProject(projectId);

    // useEffect(()=>{
    //     setData(projectData);
    // },[projectData]);

    // useEffect(()=>{
    //     console.log('ProjectPage.useEffect():');
    // },[]);
    return (
        <>
        {/* <ProjectSidebar /> */}
        {/* <Box sx={{ flexGrow: 1 }}> */}
        {/* <Grid container spacing={2} columns={16}> */}
        {/* <Grid item xs={16}> */}
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
                    {/* <div  className="ProjectCells">                 */}
            <CellsList />
                    {/* </div> */}
            {/* </div> */}
            {/* <div className="column2">

                <div className="ProjectFilters">
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
        {/* </Grid> */}
        {/* <Grid item xs={4}>
        <Box 
            maxWidth="xl" 
            sx={{paddingTop:"16px"}}
        >
        </Box>
        </Grid> */}
        {/* </Grid> */}
        {/* </Box> */}
        </>
    );
}
    
export default ProjectPage;