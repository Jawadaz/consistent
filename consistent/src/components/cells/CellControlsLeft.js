import { FaPlus, FaArrowUp, FaArrowDown } from "react-icons/fa"
import { useContext, useState } from "react"
import ControlButton from "../ui/ControlButton";
import ProjectContext from "../context/ProjectContext";

function CellControlsLeft( {cell} ){
    console.log("CellControlsLeft");    
    console.log(cell.id)
    const { addEmptyCell, moveActiveCellDown, moveActiveCellUp, projectCells } = useContext(ProjectContext);
    // const [ isMoveCellUpButtonDisabled, setIsMoveCellUpButtonDisabled ] = useState(false);
    // const [ isMoveCellDownButtonDisabled, setIsMoveCellDownButtonDisabled ] = useState(false);
    let isMoveCellUpButtonDisabled = false;
    let isMoveCellDownButtonDisabled = false

    const firstCellId = projectCells[0].id;
    const lastCellId = projectCells[projectCells.length-1].id;
    if(cell.id===firstCellId){
        isMoveCellUpButtonDisabled = true;
    }
    if(cell.id===lastCellId){
        isMoveCellDownButtonDisabled=true;
    }

    return (
        <div className={"CellControlsLeft"}>
            {   <ControlButton 
                    className={'btn btn-primary'}
                    onClick={(e)=>moveActiveCellUp()}
                    disabled={isMoveCellUpButtonDisabled} 
                >
                    <FaArrowUp color='white' />
                </ControlButton>
            }            
            {   <ControlButton 
                    className={'btn btn-primary'}
                    onClick={(e)=>moveActiveCellDown()} 
                    disabled={isMoveCellDownButtonDisabled}
                >
                    <FaArrowDown color='white' />
                </ControlButton>
            }
            <ControlButton
                className={'btn btn-primary'}
                onClick={(e)=>{e.stopPropagation();addEmptyCell()}} 
                disabled={false}
            >
                <FaPlus color='while' />
            </ControlButton>            
        </div>
    );
}

export default CellControlsLeft;