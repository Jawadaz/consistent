import { FaPlus, FaArrowUp, FaArrowDown } from "react-icons/fa"
import { useContext } from "react"
import ControlButton from "../ui/ControlButton";
import ProjectContext from "../context/ProjectContext";
import FilterContext from "../context/FilterContext";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";

import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

function CellControlsLeft( {cell} ){
    const { addEmptyCell, 
            moveActiveCellDown, 
            moveActiveCellUp, 
            projectCells, 
            isProjectLocked } = useContext(ProjectContext);
    const { isFiltered } = useContext(FilterContext);

    const firstCellId = projectCells[0].id;
    const lastCellId = projectCells[projectCells.length-1].id;
    
    let isMoveCellUpButtonDisabled = isProjectLocked || isFiltered || cell.id===firstCellId;
    let isMoveCellDownButtonDisabled = isProjectLocked || isFiltered || cell.id===lastCellId;

    return (
        <div className={"CellControlsLeft"}>
            <ButtonGroup
                orientation="vertical"
                aria-label="Paragraph Controls - Left"
            >
                <IconButton
                    variant="contained"
                    color="primary"
                    disabled={isMoveCellUpButtonDisabled}
                    onClick={(e)=>moveActiveCellUp()}
                >
                    <ArrowUpwardOutlinedIcon fontSize="small" />
                </IconButton>
                <IconButton
                    variant="contained"
                    color="primary"
                    disabled={isMoveCellDownButtonDisabled}
                    onClick={(e)=>moveActiveCellDown()} 
                >
                    <ArrowDownwardOutlinedIcon fontSize="small" />
                </IconButton>
                <IconButton
                    variant="contained"
                    color="primary"
                    disabled={isProjectLocked || isFiltered}
                    onClick={(e)=>{e.stopPropagation();addEmptyCell()}} 
                >
                    <AddOutlinedIcon fontSize="small" />
                </IconButton>                

            </ButtonGroup>
{/*
            <ControlButton 
                className={'btn btn-primary'}
                onClick={(e)=>moveActiveCellUp()}
                disabled={isMoveCellUpButtonDisabled} 
            >
                <FaArrowUp color='white' />
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
                onClick={(e)=>{e.stopPropagation();addEmptyCell()}} 
                disabled={isProjectLocked || isFiltered}
            >
                <FaPlus color='while' />
            </ControlButton>
*/}
                   
        </div>
    );
}

export default CellControlsLeft;