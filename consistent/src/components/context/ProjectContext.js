import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid'

const ProjectContext = createContext();

export const ProjectContextProvider=( {children} )=>{

    const emptyCell = () => { 
        return {
            id: uuidv4(),
            content: "",
            tags: []
        };
    };

    const defaultProjectData = () => {
        return {
            id: uuidv4(),
            title: "New Project",
            description: "",
            tags: []
        };
    };


    const [ projectCells, setProjectCells ] = useState( [ emptyCell() ] );
    const [ projectData, setProjectData ] = useState( defaultProjectData() )
    const [ projectTags, setProjectTags ] = useState([])
    // const [ projectFilename, setProjectFilename ] = useState(null);

    const newProject = () => {
        setProjectCells([emptyCell()]);
        let newProjectData = defaultProjectData()
        setProjectData(newProjectData)
        return newProjectData;
    }

    //Project Stuff
    // const saveProject=()=>{
    //     console.log('Save Project');
    //     if(projectFilename===null){
    //         console.log('Cannot the project if the projectFilename is not set');
    //         return;
    //     }
    //     var blob = new Blob(["Hello, world!"], {
    //         type: "text/plain;charset=utf-8"
    //     });
    //     console.log(blob);
    //     // saveAs(blob, projectFilename);
    //     console.log('haha');
    // }
    
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
        let cell = emptyCell();
        setProjectCells([...projectCells, cell]);
        console.log(projectCells, cell);
    }

    const deleteCell=(id)=>{
        console.log('deleteCell()');
        if(projectCells.length===1){
            setProjectCells([emptyCell()]);
        } else {
            setProjectCells(projectCells.filter((cell) => cell.id !== id ));
        }
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
    const updateCellTags=(id, tags)=>{
        console.log('updateCellTags()');
        console.log(tags);
        setProjectCells(
            projectCells.map(
                (cell) => (cell.id === id ? {...cell, tags: tags}: cell))
        );
    }
    // const deleteCellTag=(id, tag)=>{
    //     let cell = projectCells.filter((cell) => cell.id === id );
    //     let tags = cell.tags.filter((cellTag) => cellTag !== tag);
    //     cell.tags = tags;
    //     return updateCell(id, cell);
    // }

    useEffect(()=>{
        console.log('useEffect()');
        
        const updateProjectTags=()=>{
            //
            const allTags = projectCells.map(
                cell => cell.tags
            ).flat();
            const newTags = [...new Map(allTags.map(o => [o.id, o])).values()];
            setProjectTags(newTags);
        }

        updateProjectTags();
    }, [projectCells])
    
    return (
        <ProjectContext.Provider value={{
            projectCells,
            projectData,
            // projectFilename,

            projectTags,

            newProject,
            addEmptyCell,
            deleteCell,
            updateCellContent,
            updateCellTags,
            updateCell,
        }}
        >
        {children}
        </ProjectContext.Provider>
    );
}

export default ProjectContext;