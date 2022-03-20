import { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import ProjectContext from "../context/ProjectContext";
import { v4 as uuidv4 } from 'uuid'

function NewProjectPage(){

    const { newProject } = useContext(ProjectContext);
    const [ ready, setReady] = useState(false);
    
    useEffect(()=>{
        newProject(uuidv4());
        setReady(true);
    },[]);

    return (
        <>
        {ready && <Redirect to={{pathname:`/projects/${uuidv4()}`}}/> }
        </>
    );
}

export default NewProjectPage;