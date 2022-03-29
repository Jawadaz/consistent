import { useState, useEffect, useContext } from 'react';
import { FaSave, FaPlus, FaArrowDown, FaArrowUp, FaLock, FaLockOpen, FaUndo, FaRedo, FaFileExport } from "react-icons/fa";
import { CopyToClipboard } from 'react-copy-to-clipboard'
import ProjectContext from '../context/ProjectContext';
import FilterContext from '../context/FilterContext';
import ControlButton from '../ui/ControlButton'


function ProjectControls( {children} )
{

    const { projectFilename, activeCellId, projectCells, 
        addEmptyCell, moveActiveCellDown, moveActiveCellUp, 
        toggleLockProject, isProjectLocked, undo, redo,
        isUndoDisabled, isRedoDisabled, saveAsClick,
        getCellsContentAsText } = useContext(ProjectContext)
    const { isFiltered, filteredProjectCells } = useContext(FilterContext);


    const [ isMoveCellUpButtonDisabled, setIsMoveCellUpButtonDisabled ] = useState(false);
    const [ isMoveCellDownButtonDisabled, setIsMoveCellDownButtonDisabled ] = useState(false);

    const [ isUndoButtonDisabled, setIsUndoButtonDisabled] = useState(true);
    const [ isRedoButtonDisabled, setIsRedoButtonDisabled] = useState(true);

    //////
    const btnSaveClickHandler=(e)=>{
        console.log("btnSaveClickHandler")
        if(projectFilename===null){
            return btnSaveAsClickHandler(e);
        }
        // the user has already set the filename
        // saveProject();
    }

    const btnSaveAsClickHandler=(e)=>{
        console.log("btnSaveAsClickHandler");
        console.log(projectCells);
        saveAsClick();
        
        // setProjectFilename("helloworld.txt");
        // saveProject();
    }    

    const btnLockClickHandler=(e)=>{
        console.log("btnLockClickHandler");
        toggleLockProject();
    }

    const btnUndoClickHandler=(e)=>{
        console.log("btnUndoClickHandler");
        undo();
    }

    const btnRedoClickHandler=(e)=>{
        console.log("btnRedoClickHandler");
        redo();
    }

    const btnExportClickHandler=(e)=>{
        console.log('btnExportClickHandler():');
        return;
    }
    
    useEffect(()=>{
        console.log('ProjectControls.useEffect()');
        
        if(projectCells.length===1){
            setIsMoveCellUpButtonDisabled(true);
            setIsMoveCellDownButtonDisabled(true);
            return;
        }
        if(isFiltered){
            setIsMoveCellUpButtonDisabled(true);
            setIsMoveCellDownButtonDisabled(true);
            return;
        }
        console.log(isProjectLocked);        
        if(isProjectLocked){
            setIsMoveCellUpButtonDisabled(true);
            setIsMoveCellDownButtonDisabled(true);
            return;
        }
        const firstCellId = projectCells[0].id;
        const lastCellId = projectCells[projectCells.length-1].id;
        if(activeCellId===firstCellId){
            setIsMoveCellUpButtonDisabled(true);
        }else{
            setIsMoveCellUpButtonDisabled(false);
        }
        if(activeCellId===lastCellId){
            setIsMoveCellDownButtonDisabled(true);
        }else{
            setIsMoveCellDownButtonDisabled(false);
        }

        setIsUndoButtonDisabled(isUndoDisabled);
        setIsRedoButtonDisabled(isRedoDisabled);

    }, [ projectCells, activeCellId, isFiltered, isProjectLocked, isUndoDisabled, isRedoDisabled ])


    return (
        <div>
            {children}
            <ControlButton 
                className={'btn btn-primary'}
                onClick={(e)=>addEmptyCell()} 
                disabled={isFiltered||isProjectLocked}>
                <FaPlus color='while' />
            </ControlButton>
            <ControlButton 
                className={'btn btn-primary'}
                onClick={(e)=>moveActiveCellDown()} 
                disabled={isMoveCellDownButtonDisabled}
            >
                <FaArrowDown color='white' />
            </ControlButton>
            <ControlButton 
                className={'btn btn-primary'}
                onClick={(e)=>moveActiveCellUp()}
                disabled={isMoveCellUpButtonDisabled} 
            >
                <FaArrowUp color='white' />
            </ControlButton>

            <ControlButton 
                className={'btn btn-primary'}
                disabled={isUndoButtonDisabled}
                onClick={(e)=>btnUndoClickHandler()}
            >
                    <FaUndo color={'white'} />
            </ControlButton>
        
            
            <ControlButton 
                className={'btn btn-primary'}
                disabled={isRedoButtonDisabled}
                onClick={(e)=>btnRedoClickHandler()}
            >
                    <FaRedo color={'white'} />
            </ControlButton>

            <ControlButton 
                className={'btn btn-primary'}
                disabled={isProjectLocked}
                onClick={(e)=>btnSaveClickHandler()}
            >
                    <FaSave color={'white'} />
            </ControlButton>
            <ControlButton 
                className={'btn btn-primary'} 
                onClick={(e)=>btnSaveAsClickHandler()}
                disabled={false}
            >
                Save As...
            </ControlButton>
            
            <CopyToClipboard text={ getCellsContentAsText( isFiltered? filteredProjectCells: projectCells ) }
                onCopy={() => {console.log('hi');} }>
                <ControlButton
                    className={'btn btn-primary'} 
                    onClick={(e) => {} }
                    disabled={false}            
                >
                    <FaFileExport color={'white'} />
                </ControlButton>
            </CopyToClipboard>
            <ControlButton 
                className={'btn btn-primary'} 
                onClick={(e)=>btnLockClickHandler()}
                disabled={false}
            >
                {isProjectLocked ?
                    <FaLock color={'white'} />                
                :
                    <FaLockOpen color={'white'} />
                }
            </ControlButton>            
        </div>
    );
}

export default ProjectControls;