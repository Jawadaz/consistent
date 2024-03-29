import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid'

import dummyProject1 from "../../fixtures/dummy_project_1.json"
// import dummyProject2 from "../../fixtures/dummy_project_2.json"

import { saveAs } from 'file-saver'

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
            meta: {}
        };
    };

  const STORAGE_KEY = "ProjectContext";
  const stateFromStorage = (stateName, defaultValue) => {
    //console.log("Loading prop from Storage:" + propName);
    let anObject = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!anObject || !anObject[stateName]) {
      return typeof defaultValue === "function" ? defaultValue() : defaultValue;
    }
    return anObject[stateName];
  };

  const [projectCells, setProjectCells] = useState(stateFromStorage("projectCells", () => [emptyCell()]));
  const [projectData, setProjectData] = useState(stateFromStorage("projectData", () => defaultProjectData()));
  const [projectCorpus, setProjectCorpus] = useState(stateFromStorage("projectCorpus", []));
  const [isProjectLocked, setIsProjectLocked] = useState(stateFromStorage("isProjectLocked", false));

  const [projectTags, setProjectTags] = useState(stateFromStorage("projectTags", []));
  const [activeCellId, setActiveCellId] = useState(stateFromStorage("activeCellId"));
    // const [ projectFilename, setProjectFilename ] = useState(null);

  const [projectCellsHistory, setProjectCellsHistory] = useState(stateFromStorage("projectCellsHistory", () => [projectCells]));
  const [historyIndex, setHistoryIndex] = useState(stateFromStorage("historyIndex", 0));
  const [isUndoDisabled, setIsUndoDisabled] = useState(stateFromStorage("isUndoDisabled", true));
  const [isRedoDisabled, setIsRedoDisabled] = useState(stateFromStorage("isRedoDisabled", true));

  const [isProjectLTR, setIsProjectLTR] = useState(stateFromStorage("isProjectLTR", true));

  useEffect(() => {
    //a hook to store all states as soon as any changes
    let anObject = {
      projectCells: projectCells,
      projectData: projectData,
      projectCorpus: projectCorpus,
      isProjectLocked: isProjectLocked,
      projectTags: projectTags,
      activeCellId: activeCellId,
      projectCellsHistory: projectCellsHistory,
      historyIndex: historyIndex,
      isUndoDisabled: isUndoDisabled,
      isRedoDisabled: isRedoDisabled,
      isProjectLTR: isProjectLTR,
    };
    console.log("Storing data");
    localStorage.setItem(STORAGE_KEY, JSON.stringify(anObject));
  }, [
    projectCells,
    projectData,
    projectCorpus,
    isProjectLocked,
    projectTags,
    activeCellId,
    projectCellsHistory,
    historyIndex,
    isUndoDisabled,
    isRedoDisabled,
    isProjectLTR,
  ]);

    const updateProjectCells = (cells) => {
        setProjectCells(cells);
        pushToProjectCellsHistory(cells);
    }

    const pushToProjectCellsHistory = (cells) => {
        // console.log('pushing');
        if(historyIndex===0){
            const updatedHistory = [cells,...projectCellsHistory];
            setProjectCellsHistory(updatedHistory);
            updateHistoryIndex(0, updatedHistory.length);
        }else{
            //from index 
            const updatedHistory = [...projectCellsHistory];
            updatedHistory.splice(0, historyIndex, cells);
            setProjectCellsHistory(updatedHistory);
            updateHistoryIndex(0, updatedHistory.length);
        }
    }

    const setProjectLTR=(ltr)=>{
        setIsProjectLTR(ltr);
    }

    const updateHistoryIndex=(index, length)=>{
        setHistoryIndex(index);
        setIsUndoDisabled((index===length-1) || isProjectLocked);
        setIsRedoDisabled((index===0) || isProjectLocked);
    }

    const undo = () => {
        // console.log('undo');
        if(isProjectLocked){
            return;
        }
        if(historyIndex<projectCellsHistory.length-1){
            updateHistoryIndex(historyIndex+1, projectCellsHistory.length);
            setProjectCells(projectCellsHistory[historyIndex+1]);
        }
    }

    const redo = () => {
        // console.log('redo');
        if(isProjectLocked){
            return;
        }        
        if(historyIndex>0){
            updateHistoryIndex(historyIndex-1, projectCellsHistory.length);
            setProjectCells(projectCellsHistory[historyIndex-1]);
        }        
    }

    const cleanupProject = (cells) => {
        setIsProjectLocked(false);
        activateCell(cells[0].id);        
        setProjectCellsHistory([cells]);
        updateHistoryIndex(0, 1);
        //clear tags filter
        //clear tokens filter
    }

    const newProject = ( projectId ) => {
        let cell = emptyCell();
        setProjectCells([cell]);
        let newProjectData = defaultProjectData()
        newProjectData.id = projectId;
        setProjectData(newProjectData)
        
        cleanupProject([cell]);

        return { 'projectData': newProjectData, 'projectCells': projectCells };
        // return loadFixture();
    }

    const toggleLockProject=()=>{
        setIsProjectLocked(!isProjectLocked);
        if(!isProjectLocked){
            setActiveCellId(null);
        }
    }

    const getCellsContentAsText = (cells) => {
        let contents = cells.map(cell=>cell.content).join('\n\n');
        return contents;
    }

    const generateProjectCorpus = () => {
        // a function that takes all the contents in the cells and extract unique tokens
        const corpus = [];
        // projectCells.forEach(cell=> 
        //    tokenize cell content and push it to the corpus 
        //);
        // sort corpus 
        // remove duplicates from corpus
        setProjectCorpus(corpus);
    }

    const loadFixture = () => {
        // console.log('loadFixture');
        const dummyProject = dummyProject1;
        setProjectData({
            id: dummyProject.id,
            title: dummyProject.title,
            description: dummyProject.description
        });
        setProjectCells(dummyProject.cells);
        
        cleanupProject(dummyProject.cells)
        setIsProjectLocked(true);
        return dummyProject;
    }

    const loadProject = (project) => {
        setProjectCells(project.cells);
        setProjectData({
            id: project.id,
            title: project.title,
            description: project.description
        });
        cleanupProject(project.cells);
        setIsProjectLocked(true);
        return project.data;
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
        // console.log('activateCell()');
        setActiveCellId(id);
    }

    const saveAsClick = (id) => {
        // console.log('saveAsClick()');
        var blob = new Blob([JSON.stringify({...projectData, cells:projectCells})], {type: "json/plain;charset=utf-8"});
        const filename = `${projectData.title}-${new Date().toISOString().split('.')[0]}Z.json`;
        saveAs(blob, filename);
    }
    const moveActiveCellUp = ()=>{
        // console.log('moveActiveCellUp():');
        if(activeCellId===projectCells[0].id){
            // console.log('already at top-most position');
            return;
        }
        const activeCellIndex = getCellIndex(activeCellId);
        const activeCell = projectCells[activeCellIndex];
        const cells = [...projectCells];
        cells.splice(activeCellIndex, 1);
        cells.splice(activeCellIndex-1, 0, activeCell);
        updateProjectCells(cells);
    }

    const moveActiveCellDown=()=>{
        // console.log('moveActiveCellDown():');
        if(activeCellId===projectCells[projectCells.length-1].id){
            // console.log('already at buttom-most position');
            return;            
        }
        const activeCellIndex = getCellIndex(activeCellId);
        const activeCell = projectCells[activeCellIndex];
        const cells = [...projectCells];
        cells.splice(activeCellIndex, 1);
        cells.splice(activeCellIndex+1, 0, activeCell);
        updateProjectCells(cells);             
    }

    const setProjectTitle = (newProjectTitle) => {
      setProjectData({
        ...projectData,
        title: newProjectTitle
      });
     };


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
        // console.log('addEmptyCell()');
        return addCell("");
    }

    const addCell = (content) => {
        // console.log('addCell()');
        const activeCellIndex = getCellIndex(activeCellId);    
        let cell = emptyCell();
        if (content!==null || content!==""){
            cell.content = content;   
        }
        const cells = [...projectCells];
        cells.splice(activeCellIndex+1, 0, cell);
        updateProjectCells(cells);
        setActiveCellId(cell.id);
        // setActiveCellId(cell.id); celltogoto
        return cell.id
    }

    const getCellIndex = ( cellId ) => {
        const activeCellIndex = projectCells.findIndex(cell => {
            return cell.id === cellId;
        });
        return activeCellIndex;
    }

    const addCells = ( cellContents ) => {
        // console.log("addCells():");
        const activeCellIndex = getCellIndex(activeCellId);
        
        const cells = [...projectCells];
        const newCells = [];
        cellContents.forEach(content=>{
            let cell = emptyCell();
            cell.content = content;
            newCells.push(cell);
        })
        cells.splice(activeCellIndex+1, 0, ...newCells);
        updateProjectCells(cells);
    }
    
    const deleteEmptyCells=()=>{
        // console.log('deleteEmptyCells()');
        if(projectCells.length===1){
            return;
        }
        let cells = [];
        projectCells.forEach(cell => { if(cell.content!==""){
            cells.push(cell); }
        });
        updateProjectCells(cells);

    }

    const deleteCell=(id)=>{
        // console.log('deleteCell()');
        if(projectCells.length===1){
            let cell=emptyCell();
            updateProjectCells([cell]);
        } else {
            const activeCellIndex = getCellIndex(activeCellId);
            updateProjectCells(projectCells.filter((cell) => cell.id !== id ));
            // select the previous cell in the filteredCells
            if(activeCellIndex===0){
                if(projectCells.length>1){
                    activateCell(projectCells[1].id);
                    return;
                }
            } 
            if (activeCellIndex===projectCells.length-1){
                activateCell(projectCells[activeCellIndex-1].id);
                return;
            }
            
            activateCell(projectCells[activeCellIndex+1].id);
        }
    }

    const updateCell=(id, updatedCell)=>{
        // console.log('updateCell()');
        updateProjectCells(projectCells.map(
                (cell) => (cell.id === id ? {...cell, ...updatedCell}: cell))
        );
    }        

    const updateCellContent=(id, content)=>{
        // console.log('updateCellContent()');
        updateProjectCells(
            projectCells.map(
                (cell) => (cell.id === id ? {...cell, content: content}: cell))
        );
        // let cell = projectCells.filter((cell) => cell.id === cellId );
        // cell.content = content;
        // return updateCell(id, cell);
    }

    // Cell Tags
    const updateCellTags=(id, tags)=>{
        // console.log('updateCellTags()');
        // console.log(tags);
        updateProjectCells(
            projectCells.map(
                (cell) => (cell.id === id ? {...cell, tags: tags}: cell))
        );
    }

    const createCellsFromText=(text)=>{
        // console.log('createCellsFromText():');
        // console.log(text);
        let paragraph = [];
        paragraph = text.split(/\n\n/);
        addCells(paragraph);
    }

    useEffect(()=>{
        // tags
        const updateProjectTags=()=>{
            //
            const allTags = projectCells.map(
                cell => cell.tags
            ).flat();
            const newTags = [...new Map(allTags.map(o => [o.id, o])).values()];
            
            newTags.sort(function(a,b){
                if(a.id.toUpperCase()>b.id.toUpperCase()){
                    return 1;
                }
                //no need to evaluate == because the list contains unique string values
                return -1;
            });
            setProjectTags(newTags);
        }
        // tags
        updateProjectTags();

        // corppus
        generateProjectCorpus();

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
            getCellsContentAsText,
            createCellsFromText,

            toggleLockProject,
            isProjectLocked,

            undo,
            redo,
            isUndoDisabled,
            isRedoDisabled,

            setProjectLTR,
            isProjectLTR,

            loadFixture,
            newProject,
            addEmptyCell,
            addCell,
            addCells,
            deleteCell,
            deleteEmptyCells,
            updateCellContent,
            updateCellTags,
            updateCell,
            getCellIndex,

            activeCellId,
            activateCell,
            moveActiveCellUp,
            moveActiveCellDown,
            saveAsClick,
            loadProject,
            setProjectTitle

        }}
        >
        {children}
        </ProjectContext.Provider>
    );
}

export default ProjectContext;