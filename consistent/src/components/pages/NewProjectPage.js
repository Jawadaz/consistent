import { useContext, useState, useEffect } from "react";

import { Navigate } from "react-router-dom";
import ProjectContext from "../context/ProjectContext";
import FilterContext from "../context/FilterContext";
import { v4 as uuidv4 } from 'uuid'

function NewProjectPage(){

    const { newProject } = useContext(ProjectContext);
    const { clearFilterQuery } = useContext(FilterContext);
    
    const [ ready, setReady] = useState(false);

    const [projectData, setprojectData] = useState(null)
    useEffect(() => {
        setprojectData(newProject());
        clearFilterQuery();
        newProject(uuidv4());
        setReady(true);
      return () => {
        
      }
    },  [newProject, clearFilterQuery])
    
    return ( 
        <>
        {projectData &&  <Navigate to={{pathname:`/projects/${projectData.id}`}}/>}
         {ready && <Navigate to={{pathname:`/projects/${uuidv4()}`}}/> }
        </>
        

    );
}

export default NewProjectPage;