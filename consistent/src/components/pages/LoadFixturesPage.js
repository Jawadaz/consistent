import { useContext, useState, useEffect } from "react";
import ProjectContext from "../context/ProjectContext";
import FilterContext from "../context/FilterContext";
import { Navigate } from "react-router-dom";

function LoadFixturesPage(){
    const { loadFixture, projectData } = useContext(ProjectContext);
    const { clearFilterQuery } = useContext(FilterContext);
    
    const [ ready, setReady] = useState(false);

    useEffect(()=>{
        clearFilterQuery();        
        loadFixture();
        setReady(true);
    }, [loadFixture, clearFilterQuery]);

    return (
        <>
        {ready && <Navigate to={{pathname:`/projects/${projectData.id}`}}/> }
        </>
    );
}

export default LoadFixturesPage;