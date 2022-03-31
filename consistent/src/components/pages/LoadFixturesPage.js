import { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import ProjectContext from "../context/ProjectContext";
import FilterContext from "../context/FilterContext";

function LoadFixturesPage(){
    const { loadFixture, projectData } = useContext(ProjectContext);
    const { clearFilterQuery } = useContext(FilterContext);
    
    const [ ready, setReady] = useState(false);

    useEffect(()=>{
        clearFilterQuery();        
        loadFixture();
        setReady(true);
    },[loadFixture, clearFilterQuery]);

    return (
        <>
        {ready && <Redirect to={{pathname:`/projects/${projectData.id}`}}/> }
        </>
    );
}

export default LoadFixturesPage;