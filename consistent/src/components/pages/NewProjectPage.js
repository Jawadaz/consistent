import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import ProjectContext from "../context/ProjectContext";

function NewProjectPage(){

    const { newProject } = useContext(ProjectContext);
    const [projectData, setprojectData] = useState(null)
    useEffect(() => {
        setprojectData(newProject());
    
      return () => {
        
      }
    }, [])
    
    return ( 
        <>
        {projectData && 
            <Redirect to={{pathname:`/projects/${projectData.id}`}}/>}
        </>
        
    );
}

export default NewProjectPage;