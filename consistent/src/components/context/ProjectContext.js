import { createContext, useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from 'uuid'

import dummyProject from "../../fixtures/dummy_project_1.json"
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

    const [ projectCells, setProjectCells ] = useState([emptyCell()]);
    const [ projectData, setProjectData ] = useState(defaultProjectData());
    const [ projectCorpus, setProjectCorpus ] = useState([]);
    const [ projectUndoRedoStack, setProjectUndoRedoStack] = useState([{
        'cells': [...projectCells],
        'data': {...projectData},
    }]); //for undo/redo

    const [ projectTags, setProjectTags ] = useState([]);
    const [ activeCellId, setActiveCellId ] = useState();
    // const [ projectFilename, setProjectFilename ] = useState(null);

    const newProject = () => {
        // let cell = emptyCell();
        // setProjectCells([cell]);
        // let newProjectData = defaultProjectData()
        // setProjectData(newProjectData)
        // activateCell(cell.id);
        // return newProjectData;
        return loadFixture();
    }

    const generateProjectCorpus = () => {
        // a function that takes all the contents in the cells and extract unique tokens
        const corpus = [];
        // projectCells.forEach(cell=> 
        //    tokenize cell content and push it to the corpus 
        //);
        // sort corpus 
        // remove duplicates from corpus
    }

    const loadFixture = () => {
        setProjectCells(dummyProject.cells);
        setProjectData({
            id: dummyProject.id,
            title: dummyProject.title,
            description: dummyProject.description
        });
        return dummyProject;
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
    const activateCell = (id) => {
        console.log('activateCell()');
        setActiveCellId(id);
    }

    const moveActiveCellUp = ()=>{
        console.log('moveActiveCellUp():');
        if(activeCellId===projectCells[0].id){
            console.log('already at top-most position');
            return;
        }
        const activeCellIndex = projectCells.findIndex(cell => {
            return cell.id === activeCellId;
        });
        const activeCell = projectCells[activeCellIndex];
        const cells = [...projectCells];
        cells.splice(activeCellIndex, 1);
        cells.splice(activeCellIndex-1, 0, activeCell);
        setProjectCells(cells);
    }

    const moveActiveCellDown=()=>{
        console.log('moveActiveCellDown():');
        if(activeCellId===projectCells[projectCells.length-1].id){
            console.log('already at buttom-most position');
            return;            
        }
        const activeCellIndex = projectCells.findIndex(cell => {
            return cell.id === activeCellId;
        });
        const activeCell = projectCells[activeCellIndex];
        const cells = [...projectCells];
        cells.splice(activeCellIndex, 1);
        cells.splice(activeCellIndex+1, 0, activeCell);
        setProjectCells(cells);             
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

        const activeCellIndex = projectCells.findIndex(cell => {
            return cell.id === activeCellId;
        });
        
        let cell = emptyCell();
        const cells = [...projectCells];
        cells.splice(activeCellIndex+1, 0, cell);
        setProjectCells(cells);  

        setActiveCellId(cell.id);
    }

    const deleteCell=(id)=>{
        console.log('deleteCell()');
        if(projectCells.length===1){
            let cell=emptyCell();
            setProjectCells([cell]);
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
        console.log('ProjectContext.useEffect()');
        
        // tags
        const updateProjectTags=()=>{
            //
            const allTags = projectCells.map(
                cell => cell.tags
            ).flat();
            const newTags = [...new Map(allTags.map(o => [o.id, o])).values()];
            // TODO: sort project tags here:
            setProjectTags(newTags);
        }

        updateProjectTags();

        // tags
        if(projectCells.length===1){
            activateCell(projectCells[0].id);
        }

    }, [projectCells])

    return (
        <ProjectContext.Provider value={{
            projectCells,
            projectData,
            // projectFilename,

            projectTags,
            projectCorpus,

            newProject,
            addEmptyCell,
            deleteCell,
            updateCellContent,
            updateCellTags,
            updateCell,

            activeCellId,
            activateCell,
            moveActiveCellUp,
            moveActiveCellDown,
        }}
        >
        {children}
        </ProjectContext.Provider>
    );
}

export default ProjectContext;