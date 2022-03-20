import { useState, useEffect, useContext } from 'react';
import { FaSave, FaPlus, FaArrowDown, FaArrowUp } from "react-icons/fa";
import ProjectContext from '../context/ProjectContext';
import FilterContext from '../context/FilterContext';
import ControlButton from '../ui/ControlButton'


function ProjectControls( {children} )
{
    const { projectFilename, activeCellId, projectCells, addEmptyCell, moveActiveCellDown, moveActiveCellUp } = useContext(ProjectContext)
    const { isFiltered } = useContext(FilterContext);

    const [ isMoveCellUpButtonDisabled, setIsMoveCellUpButtonDisabled ] = useState(false);
    const [ isMoveCellDownButtonDisabled, setIsMoveCellDownButtonDisabled ] = useState(false);
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
        // setProjectFilename("helloworld.txt");
        // saveProject();
    }    
    
    useEffect(()=>{
        console.log('ProjectControls.useEffect()');
        
        if(projectCells.length===1){
            setIsMoveCellUpButtonDisabled(true);
            setIsMoveCellDownButtonDisabled(true);
            return;
        }
        if(isFiltered){
            setIsMoveCellUpButtonDisabled(isFiltered);
            setIsMoveCellDownButtonDisabled(isFiltered);
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

    }, [ projectCells, activeCellId, isFiltered])

    return (
        <div>
            {children}
            <ControlButton 
                className={'btn btn-primary'}
                onClick={(e)=>addEmptyCell()} 
                disabled={isFiltered}>
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
                disabled={false}
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
        </div>
    );
}

export default ProjectControls;