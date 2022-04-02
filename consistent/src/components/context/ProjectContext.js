import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import dummyProject from "../../fixtures/dummy_project_1.json";

import { saveAs } from "file-saver";

const ProjectContext = createContext();

export const ProjectContextProvider = ({ children }) => {

  const emptyCell = () => {
    return {
      id: uuidv4(),
      content: "",
      tags: [],
    };
  };

  const defaultProjectData = () => {
    return {
      id: uuidv4(),
      title: "New Project",
      description: "",
      tags: [],
    };
  };

  const [projectCells, setProjectCells] = useState([emptyCell()]);
  const [projectData, setProjectData] = useState(defaultProjectData());
  const [projectCorpus, setProjectCorpus] = useState([]);
  const [isProjectLocked, setIsProjectLocked] = useState(false);
  // const [ projectUndoRedoStack, setProjectUndoRedoStack] = useState([{
  //     'cells': [...projectCells],
  //     'data': {...projectData},
  // }]); //for undo/redo

  const [projectTags, setProjectTags] = useState([]);
  const [activeCellId, setActiveCellId] = useState();
  // const [ projectFilename, setProjectFilename ] = useState(null);

  const [projectCellsHistory, setProjectCellsHistory] = useState([
    projectCells,
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isUndoDisabled, setIsUndoDisabled] = useState(true);
  const [isRedoDisabled, setIsRedoDisabled] = useState(true);

  const updateProjectCells = (cells) => {
    setProjectCells(cells);
    pushToProjectCellsHistory(cells);
  };

    const pushToProjectCellsHistory = (cells) => {
        console.log('pushing');
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

    const updateHistoryIndex=(index, length)=>{
        setHistoryIndex(index);
        setIsUndoDisabled((index===length-1) || isProjectLocked);
        setIsRedoDisabled((index===0) || isProjectLocked);
    }

    const undo = () => {
        console.log('undo');
        if(isProjectLocked){
            return;
        }
        if(historyIndex<projectCellsHistory.length-1){
            updateHistoryIndex(historyIndex+1, projectCellsHistory.length);
            setProjectCells(projectCellsHistory[historyIndex+1]);
        }
    }

    const redo = () => {
        console.log('redo');
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

        return newProjectData;
        // return loadFixture();
    }
  };

  const redo = () => {
    console.log("redo");
    if (isProjectLocked) {
      return;
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
        console.log('loadFixture');
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
    const activeCellIndex = projectCells.findIndex((cell) => {
      return cell.id === activeCellId;
    });
    const activeCell = projectCells[activeCellIndex];
    const cells = [...projectCells];
    cells.splice(activeCellIndex, 1);
    cells.splice(activeCellIndex - 1, 0, activeCell);
    updateProjectCells(cells);
  };

  const moveActiveCellDown = () => {
    console.log("moveActiveCellDown():");
    if (activeCellId === projectCells[projectCells.length - 1].id) {
      console.log("already at buttom-most position");
      return;
    }
    const activeCellIndex = projectCells.findIndex((cell) => {
      return cell.id === activeCellId;
    });
    const activeCell = projectCells[activeCellIndex];
    const cells = [...projectCells];
    cells.splice(activeCellIndex, 1);
    cells.splice(activeCellIndex + 1, 0, activeCell);
    updateProjectCells(cells);
  };

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
    console.log("addEmptyCell()");

    const activeCellIndex = projectCells.findIndex((cell) => {
      return cell.id === activeCellId;
    });

    let cell = emptyCell();
    const cells = [...projectCells];
    cells.splice(activeCellIndex + 1, 0, cell);
    updateProjectCells(cells);

    setActiveCellId(cell.id);
  };

  const deleteCell = (id) => {
    console.log("deleteCell()");
    if (projectCells.length === 1) {
      let cell = emptyCell();
      updateProjectCells([cell]);
    } else {
      const activeCellIndex = projectCells.findIndex((cell) => {
        return cell.id === activeCellId;
      });
      updateProjectCells(projectCells.filter((cell) => cell.id !== id));
      // select the previous cell in the filteredCells
      if (activeCellIndex === 0) {
        if (projectCells.length > 1) {
          activateCell(projectCells[1].id);
          return;
        }
      }
      if (activeCellIndex === projectCells.length - 1) {
        activateCell(projectCells[activeCellIndex - 1].id);
        return;
      }

      activateCell(projectCells[activeCellIndex + 1].id);
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
        return addCell("");
    }

    const addCell = (content) => {
        console.log('addCell()');
        const activeCellIndex = projectCells.findIndex(cell => {
            return cell.id === activeCellId;
        });        
        let cell = emptyCell();
        if (content!==null || content!==""){
            cell.content = content;   
        }
        const cells = [...projectCells];
        cells.splice(activeCellIndex+1, 0, cell);
        updateProjectCells(cells);
        setActiveCellId(cell.id);
    }

    const addCells = ( cellContents ) => {
        console.log("addCells():");
        const activeCellIndex = projectCells.findIndex(cell => {
            return cell.id === activeCellId;
        });
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
        console.log('deleteEmptyCells()');
        if(projectCells.length===1){
            return;
        }
        let cells = [];
        projectCells.forEach(cell => { if(cell.content!==""){
            cells.push(cell); }
        });
        updateProjectCells(cells);

    }

    const setProjectTitle = (newProjectTitle) => {
      setProjectData({
        ...projectData,
        title: newProjectTitle
      });
     };
     
    const deleteCell=(id)=>{
        console.log('deleteCell()');
        if(projectCells.length===1){
            let cell=emptyCell();
            updateProjectCells([cell]);
        } else {
            const activeCellIndex = projectCells.findIndex(cell => {
                return cell.id === activeCellId;
            });
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
        //no need to evaluate == because the list contains unique string values
        return -1;
      });
      setProjectTags(newTags);
    };
    // tags
    updateProjectTags();

    // corppus
    generateProjectCorpus();

    if (projectCells.length === 1) {
      activateCell(projectCells[0].id);
    }

    // const deleteCellTag=(id, tag)=>{
    //     let cell = projectCells.filter((cell) => cell.id === id );
    //     let tags = cell.tags.filter((cellTag) => cellTag !== tag);
    //     cell.tags = tags;
    //     return updateCell(id, cell);
    // }

    const createCellsFromText=(text)=>{
        console.log('createCellsFromText():');
        console.log(text);
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

            activeCellId,
            activateCell,
            moveActiveCellUp,
            moveActiveCellDown,
            saveAsClick,
            loadProject,
            setProjectTitle,
        }}
        >
        {children}
        </ProjectContext.Provider>
    );
}

export default ProjectContext;
