import { FaTimes } from "react-icons/fa"
import {useContext} from "react"
import ProjectContext from "../context/ProjectContext";
import ControlButton from "../ui/ControlButton.js"
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function CellControlsRight ( { cell } ) {

    const { deleteCell, isProjectLocked } = useContext(ProjectContext);

    return (
        <div 
            className="CellControlsRight">
            <IconButton 
            aria-label="delete" 
            fontSize="small"
            variant="contained"
            color="primary"
            onClick={(e)=>{e.stopPropagation(); deleteCell(cell.id);}}
            >
                <DeleteIcon fontSize="small" />
            </IconButton>

            <ControlButton 
                isDisabled={false} 
                onClick={(e)=>{e.stopPropagation(); deleteCell(cell.id);}}
                className={"btn btn-primary"}
                disabled={isProjectLocked}
            >
                <FaTimes color={"white"}/>
            </ControlButton>
        </div>
    );
}

export default CellControlsRight