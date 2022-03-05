import { FaPlus } from "react-icons/fa";

function AddCellButton(props){

    function btnAddCellHandler () {
        console.log("AddCellButton.btnAddCellHandler() clicked");
        props.addCell();
    }

    return (
        <button className={'btn btn-primary'} onClick={btnAddCellHandler}>
            <FaPlus color='while' />
        </button>
    );
}

export default AddCellButton