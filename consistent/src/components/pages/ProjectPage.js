import ProjectTitle from "../projects/ProjectTitle.js";
import ProjectStats from "../projects/ProjectStats.js";
import ProjectHeader from "../projects/ProjectHeader.js";
import ProjectControls from "../projects/ProjectControls.js";

import CellsList from "../cells/CellsList.js";
import AddCellButton from "../cells/AddCellButton.js";
import { useParams } from "react-router-dom";
import { useState } from "react";

import dummyProject from "../../fixtures/dummy_project_1.json"

import { v4 as uuidv4 } from 'uuid'
import MoveCellUpButton from "../cells/MoveCellUpButton";
import MoveCellDownButton from "../cells/MoveCellDownButton";

function ProjectPage( props ){
    
    const { projectId } = useParams();
    console.log(projectId);
    // const search = useLocation().search;
    //const project_filename = new URLSearchParams(search).get('filename');
    const emptyCell = () => { 
        return {
            id: uuidv4(),
            content: "",
            tags: []
        };
    }

    const defaultProjectData = {
        title: "New Project",
        description: "",
        tags: {
        },
        // cells: [emptyCell]
    };

    const [ projectCells, setProjectCells ] = useState([emptyCell()]);
    const [ projectData, setProjectData ] = useState(defaultProjectData)


    const deleteCell=(id)=>{
        console.log('deleteCell()');
        // let cells = projectData.cells.filter((cell) => cell.id !== id );
        // if(cells.length===0){
        //     cells =  [ emptyCell ];
        // }
        // const updatedProjcetData = structuredClone(projectData);
        // updatedProjcetData.cells = cells;
        // setProjectData(updatedProjcetData);
        setProjectCells(projectCells.filter((cell) => cell.id !== id ))
    }

    const addEmptyCell=()=>{
        // // https://stackoverflow.com/a/10916838/3362720
        // let cell = structuredClone(emptyCell);
        // // cell.id = projectData.cells.reduce( (max, entry) => entry.id >= max.id ? entry: max, projectData.cells[0]).id + 1;
        // cell.id = uuidv4();
        // // Generating a random string:
        // // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript?answertab=votes#tab-top
        // // using: https://stackoverflow.com/a/8084248/3362720 
        // // anothre option would be: https://stackoverflow.com/a/1349426/3362720        
        // // let r = (Math.random() + 1).toString(36).substring(7);
        // // cell.tags.push(r);
        // const updatedProjcetData = structuredClone(projectData);
        // updatedProjcetData.cells.push(cell);
        // setProjectData(updatedProjcetData);
        // console.log(projectData.cells);

        setProjectCells([...projectCells, emptyCell()]);
    }


    // const addCell=(cell)=>{
    //     console.log('addCell');
    //     console.log(projectData.cells);
    //     if(!cell){
    //         return addEmptyCell()
    //     }
    //     if (projectData.cells.filter((projectCell) => projectCell.id === cell.id ).length>0){
    //         console.log("passed cell.id is already in use");
    //         cell.id = uuidv4();
    //     }
    //     const updatedProjcetData = structuredClone(projectData);

    //     updatedProjcetData.cells.push(cell);
    //     setProjectData(updatedProjcetData);
    //     return;
    // }


    const deleteCellTag=(cellId, tag)=>{
        let cell = projectCells.filter((cell) => cell.id === cellId );
        let tags = cell.tags.filter((tag) => tag !== tag);
        cell.tags = tags
        // setProjectCells(projectCells);
    }


    const updateCellContent=(id, content)=>{
        // console.log('updateCellContent()');
        // const updatedProjcetData = structuredClone(projectData);
        // const updatedCellIndex = updatedProjcetData.cells.findIndex((cell) => cell.id === id);
        // updatedProjcetData.cells[updatedCellIndex].content = content;
        // setProjectData(updatedProjcetData);
        console.log('updateCellContent()');
        // const updatedProjcetCells = [...projectCells]
        const updatedCellIndex = projectCells.findIndex((cell) => cell.id === id);
        projectCells[updatedCellIndex].content = content;
        // setProjectCells(updatedProjcetCells);
        // ????
    }

    if(projectCells.length===0){
        addEmptyCell();
    }

    if(projectId === "new"){
        console.log(projectData);
        console.log(projectCells);

    }else{
        if (projectId>0){
            console.log(projectId);
        }
    }
    return (
        <div>
            <ProjectHeader>
                <ProjectTitle title={projectData.title}/>
            </ProjectHeader>
            <ProjectControls>
                <AddCellButton addCell={addEmptyCell} />
                <MoveCellUpButton />
                <MoveCellDownButton />
            </ProjectControls>
            {/* <ProjectTags tags={projectData.tags} deleteTag={deleteCellTag}/> */}
            <CellsList 
                cells={projectCells} 
                deleteCell={deleteCell}
                updateCellContent={updateCellContent}
            />
            <ProjectStats cells={projectCells}/>            
        </div>
    );
}
    
export default ProjectPage;