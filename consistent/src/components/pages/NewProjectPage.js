import { useContext } from "react";
import { Redirect } from "react-router-dom";
import ProjectContext from "../context/ProjectContext";

function NewProjectPage(){

    const { newProject } = useContext(ProjectContext);
    const projectData = newProject();

    return (
        <Redirect to={{pathname:`/projects/${projectData.id}`}}/>
    );
}

export default NewProjectPage;