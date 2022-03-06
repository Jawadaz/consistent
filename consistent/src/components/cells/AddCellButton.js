import { FaPlus } from "react-icons/fa";

function AddCellButton({btnAddCellClickHandler}){
    return (
        <button className={'btn btn-primary'} onClick={btnAddCellClickHandler}>
            <FaPlus color='while' />
        </button>
    );
}

export default AddCellButton