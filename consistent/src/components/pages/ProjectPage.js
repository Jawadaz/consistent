import ProjectTitle from "../projects/ProjectTitle.js";
import ProjectStats from "../projects/ProjectStats.js";
import ProjectHeader from "../projects/ProjectHeader.js";
import ProjectControls from "../projects/ProjectControls.js";
import ProjectTags from "../projects/ProjectTags.js";
import ProjectFiltersTags from "../projects/ProjectFiltersTags"


import CellsList from "../cells/CellsList.js";
// import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";

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

    useEffect(()=>{
        console.log('ProjectPage.useEffect():');
    },[]);

    return (
        <div className="prject-page">
                    
                    <div  className="project-cells">
                    <div className="project-controls">
                        <div className="transperant-top">

                        </div>
                      <div className="gray-background">
                      <ProjectHeader>
                            <ProjectTitle title={projectData.title}/>
                        </ProjectHeader>
                        <ProjectControls>
                        </ProjectControls>
                        <h3>
                        Cells
                    </h3>
                      </div>
                    </div>
                    
                    <CellsList />
                    <h3>
                        Stats
                    </h3>
                    <ProjectStats/>
                    </div>
                    <div  className="project-header">
                       
                        <h3>
                            Tags
                        </h3>            
                        <ProjectTags />
                        <h3>
                            Filter by Tags
                        </h3>
                        <ProjectFiltersTags />
                    </div>
        </div>

    );
}
    
export default ProjectPage;