import { FaTimes } from "react-icons/fa"
import {useContext} from "react"
import ProjectContext from "../context/ProjectContext";
import ControlButton from "../ui/ControlButton.js"
import Button from '@mui/material/Button';
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function CellControlsRight ( { cell } ) {

    const { deleteCell, isProjectLocked } = useContext(ProjectContext);

    return (
        <div className="CellControlsRight">
            <ButtonGroup
                orientation="vertical"
                aria-label="Paragraph Controls - Right"
            >
                <IconButton 
                    aria-label="delete" 
                    variant="contained"
                    color="primary"
                    disabled={isProjectLocked}
                    onClick={(e)=>{e.stopPropagation(); deleteCell(cell.id);}}
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </ButtonGroup>
        </div>
    );
}

export default CellControlsRight