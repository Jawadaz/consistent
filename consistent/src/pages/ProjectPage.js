import ProjectTitle from "../components/projects/ProjectTitle.js";
import ProjectStats from "../components/projects/ProjectStats.js";
import ProjectTags from "../components/projects/ProjectTags.js";

import CellsList from "../components/cells/CellsList.js";
import AddCellButton from "../components/ui/AddCellButton.js";
import { useParams, useLocation } from "react-router-dom";
import { useState } from "react";

import dummyProject from "../fixtures/dummy_project_1.json"

function ProjectPage( props ){
    
    const { projectId } = useParams();
    console.log(projectId);
    // const search = useLocation().search;
    //const project_filename = new URLSearchParams(search).get('filename');
    const emptyCell = {
        id: 0,
        content: "",
        tags: []
    }


    const defaultProjectData = {
        title: "New Project",
        description: "",
        tags: {
        },
        cells: [emptyCell]
    };


    const [ projectData, setProjectData ] = useState(defaultProjectData)

    const clearState=()=>{
        setProjectData(defaultProjectData);
    }


    const deleteCell=(id)=>{
        console.log('deleteCell()');
        let cells = projectData.cells.filter((cell) => cell.id !== id );
        if(cells.length===0){
            cells =  [ emptyCell ];
        }
        let tags = projectData.tags;
        const updatedProjcetData = structuredClone(projectData, { cells: cells, tags: tags });
        setProjectData(updatedProjcetData);
        return;
    }

    const addEmptyCell=()=>{
        // https://stackoverflow.com/a/10916838/3362720
        let cell = structuredClone(emptyCell);
        // Generating a random string:
        // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript?answertab=votes#tab-top
        // using: https://stackoverflow.com/a/8084248/3362720 
        // anothre option would be: https://stackoverflow.com/a/1349426/3362720        
        cell.id = projectData.cells.reduce( (max, entry) => entry.id >= max.id ? entry: max, projectData.cells[0]).id + 1;        
        let r = (Math.random() + 1).toString(36).substring(7);
        cell.tags.push(r);
        const updatedProjcetData = structuredClone(projectData);
        updatedProjcetData.cells.push(cell);
        setProjectData(updatedProjcetData);
        console.log(projectData.cells);
    }


    const addCell=(cell)=>{
        console.log('addCell');
        console.log(projectData.cells);
        if(!cell){
            return addEmptyCell()
        }
        if (projectData.cells.filter((projectCell) => projectCell.id === cell.id ).length>0){
            console.log("passed cell.id is already in use");
            cell.id = projectData.cells.reduce( (max, entry) => entry.id >= max.id ? entry: max, projectData.cells[0]).id + 1;
        }
        const updatedProjcetData = structuredClone(projectData);

        updatedProjcetData.cells.push(cell);
        setProjectData(updatedProjcetData);
        return;
    }


    const deleteCellTag=(cellId, tag)=>{
        let cell = projectData.cells.filter((cell) => cell.id === cellId );
        let tags = cell.tags.filter((tag) => tag !== tag);
        cell.tags = tags
        console.log(projectData.cells);
        const updatedProjcetData = structuredClone(projectData);
        setProjectData(updatedProjcetData);
    }


    const updateCellContent=(id, content)=>{
        console.log('updateCellContent()');
        const updatedProjcetData = structuredClone(projectData);
        const updatedCellIndex = updatedProjcetData.cells.findIndex((cell) => cell.id === id);
        updatedProjcetData.cells[updatedCellIndex].content = content;
        setProjectData(updatedProjcetData);
    }


    if(projectId === "new"){
        console.log(projectData);
        setProjectData(defaultProjectData);

    }else{
        if (projectId>0){
            console.log(projectId);
        }
    }
    return (
        <div>
            <ProjectTitle title={projectData.title}/>
            <ProjectStats cells={projectData.cells}/>
            {/* <ProjectTags tags={projectData.tags} deleteTag={deleteCellTag}/> */}
            <CellsList 
                cells={projectData.cells} 
                deleteCell={deleteCell}
                updateCellContent={updateCellContent}
            />
            <AddCellButton addCell={addCell} />
        </div>
    );
}
    
export default ProjectPage;