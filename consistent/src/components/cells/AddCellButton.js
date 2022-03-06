import { FaPlus } from "react-icons/fa";
import { useContext } from 'react'
import ProjectContext from "../context/ProjectContext";

function AddCellButton({btnAddCellClickHandler}){
    
    const { addEmptyCell } = useContext(ProjectContext)
    return (
        <button className={'btn btn-primary'} onClick={()=>addEmptyCell()} >
            <FaPlus color='while' />
        </button>
    );
}

export default AddCellButton