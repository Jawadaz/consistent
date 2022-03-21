import { FaTimes } from "react-icons/fa"
import {useContext} from "react"
import ProjectContext from "../context/ProjectContext";
import ControlButton from "../ui/ControlButton.js"


function CellControlsRight ( { cell } ) {

    const { deleteCell, isProjectLocked } = useContext(ProjectContext);

    return (
        <div 
            className="CellControlsRight"
        >
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