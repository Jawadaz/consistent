import { FaPlus, FaArrowUp, FaArrowDown } from "react-icons/fa"
import { useContext } from "react"
import ControlButton from "../ui/ControlButton";
import ProjectContext from "../context/ProjectContext";
import FilterContext from "../context/FilterContext";

function CellControlsLeft( {cell} ){
    const { addEmptyCell, moveActiveCellDown, moveActiveCellUp, projectCells } = useContext(ProjectContext);
    const { isFiltered } = useContext(FilterContext);

    const firstCellId = projectCells[0].id;
    const lastCellId = projectCells[projectCells.length-1].id;
    
    let isMoveCellUpButtonDisabled = isFiltered || cell.id===firstCellId;
    let isMoveCellDownButtonDisabled = isFiltered || cell.id===lastCellId;

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
                disabled={isFiltered}
            >
                <FaPlus color='while' />
            </ControlButton>            
        </div>
    );
}

export default CellControlsLeft;