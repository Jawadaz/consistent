import { useContext, useState, useEffect } from "react";

import { Navigate } from "react-router-dom";
import ProjectContext from "../context/ProjectContext";
import FilterContext from "../context/FilterContext";
import { v4 as uuidv4 } from 'uuid'

function NewProjectPage(){

    const { newProject } = useContext(ProjectContext);
    const { clearFilterQuery } = useContext(FilterContext);
    const [ ready, setReady] = useState(false);
    const [ projectData, setProjectData ] = useState(null)

    // I DON"T LIKE THIS
    useEffect(() => {
        //why calling newProject Twice?
        const project = newProject(uuidv4())
        setProjectData(project.projectData);
        clearFilterQuery();
        setReady(true);
      return () => {
        
      }
    },  [newProject, clearFilterQuery])
    
    return ( 
        <>
         {projectData && ready && <Navigate to={{pathname:`/projects/${projectData.id}`}}/>}
        </>
        

    );
}

export default NewProjectPage;