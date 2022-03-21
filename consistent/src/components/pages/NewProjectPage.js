import { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import ProjectContext from "../context/ProjectContext";
import FilterContext from "../context/FilterContext";
import { v4 as uuidv4 } from 'uuid'

function NewProjectPage(){

    const { newProject } = useContext(ProjectContext);
    const { resetFilterQuery } = useContext(FilterContext);
    
    const [ ready, setReady] = useState(false);
    
    useEffect(()=>{
        resetFilterQuery();
        newProject(uuidv4());
        setReady(true);
    }, [newProject, resetFilterQuery]);

    return (
        <>
        {ready && <Redirect to={{pathname:`/projects/${uuidv4()}`}}/> }
        </>
    );
}

export default NewProjectPage;