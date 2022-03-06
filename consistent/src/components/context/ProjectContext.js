import { createContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid'

const ProjectContext = createContext();

export const ProjectContextProvider=( {children} )=>{

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


    const [ projectCells, setProjectCells ] = useState( [ emptyCell() ] );
    const [ projectData, setProjectData ] = useState(defaultProjectData)
    const [ projectFilename, setProjectFilename ] = useState(null);

    //Project Stuff
    const saveProject=()=>{
        console.log('Save Project');
        if(projectFilename===null){
            console.log('Cannot the project if the projectFilename is not set');
            return;
        }
        var blob = new Blob(["Hello, world!"], {
            type: "text/plain;charset=utf-8"
        });
        console.log(blob);
        // saveAs(blob, projectFilename);
        console.log('haha');
    }


    //Cells stuff
    const addEmptyCell = () => {
        // // https://stackoverflow.com/a/10916838/3362720
        // let cell = structuredClone(emptyCell);
        // // cell.id = projectData.cells.reduce( (max, entry) => entry.id >= max.id ? entry: max, projectData.cells[0]).id + 1;
        // cell.id = uuidv4();
        // Generating a random string:
        // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript?answertab=votes#tab-top
        // using: https://stackoverflow.com/a/8084248/3362720 
        // anothre option would be: https://stackoverflow.com/a/1349426/3362720        
        // let r = (Math.random() + 1).toString(36).substring(7);
        // cell.tags.push(r);
        console.log('addEmptyCell()');
        setProjectCells([...projectCells, emptyCell()]);
    }

    if(projectCells.length===0){
        console.log('Empty list');
        addEmptyCell();
    };

    const deleteCell=(id)=>{
        console.log('deleteCell()');
        setProjectCells(projectCells.filter((cell) => cell.id !== id ))
    }

    const updateCell=(id, updatedCell)=>{
        console.log('updateCell()');
        setProjectCells(projectCells.map(
                (cell) => (cell.id === id ? {...cell, ...updatedCell}: cell))
        );
    }        

    const updateCellContent=(id, content)=>{
        console.log('updateCellContent()');
        setProjectCells(
            projectCells.map(
                (cell) => (cell.id === id ? {...cell, content: content}: cell))
        );
        // let cell = projectCells.filter((cell) => cell.id === cellId );
        // cell.content = content;
        // return updateCell(id, cell);
    }

    // Cell Tags
    const deleteCellTag=(id, tag)=>{
        let cell = projectCells.filter((cell) => cell.id === id );
        let tags = cell.tags.filter((tag) => tag !== tag);
        cell.tags = tags
        return updateCell(id, cell);
    }

    return (
        <ProjectContext.Provider value={{
            projectCells,
            projectData,
            projectFilename,

            addEmptyCell,
            deleteCell,
            updateCellContent,
            updateCell,
        }}
        >
        {children}
        </ProjectContext.Provider>
    );
}

export default ProjectContext;