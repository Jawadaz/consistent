import { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import ProjectContext from "../context/ProjectContext";

function LoadFixturesPage(){
    const { loadFixture, projectData } = useContext(ProjectContext);
    const [ ready, setReady] = useState(false);

    useEffect(()=>{
        loadFixture();
        setReady(true);
    },[loadFixture]);

    return (
        <>
        {ready && <Redirect to={{pathname:`/projects/${projectData.id}`}}/> }
        </>
    );
}

export default LoadFixturesPage;