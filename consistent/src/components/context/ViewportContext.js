import { createContext, useState, useContext } from "react";
import ProjectContext from "./ProjectContext";

const ViewportContext = createContext();

export const ViewportContextProvider=( {children} )=>{

    const [ cellToGoTo, setCellToGoTo ] = useState(null);
    const [ showCellNumbers, setShowCellNumbers ] = useState(true);

    const { projectCells } = useContext(ProjectContext);    

    const gotoCellByIndex = (n) =>{
        // make sure n is a positive integer smaller or equal than total length of project.cells
        if(n===null){
            setCellToGoTo(n);
            return;
        }
        if(!isNaN(n) && Number.isInteger(n) && n>=0 && n<projectCells.length ) {
            setCellToGoTo(n);
        }
        else{
            console.warn("n should be a valid cell index. Got:");
            console.warn(n);
        }
    };

    const resetCellToGoTo=()=>{
        setCellToGoTo(null);
    }

    
    return (
        <ViewportContext.Provider 
            value={{
                cellToGoTo,
                showCellNumbers,

                gotoCellByIndex,
                resetCellToGoTo,
                setShowCellNumbers,
            }}
        >
        {children}
        </ViewportContext.Provider>
    );
}

export default ViewportContext;