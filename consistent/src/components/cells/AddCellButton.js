import {useState} from "react"
import { FaPlus } from "react-icons/fa";

function AddCellButton(props){

    function btnAddCellHandler () {
        console.log("AddCellButton.btnAddCellHandler() clicked");
        props.addCell();
    }

    return (
        <div>
            <button className={'btn btn-primary'} onClick={btnAddCellHandler}>
                <FaPlus color='while' />
            </button>
        </div>
    );
}

export default AddCellButton