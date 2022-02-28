import {useState} from "react"

import { FaPlus } from "react-icons/fa";

function AddCellButton(props){

    function btnAddCellHandler () {
        console.log("AddCellButton.btnAddCellHandler() clicked");
        props.addCell();
    }

    return (
        <div>
            <button className="btn" onClick={btnAddCellHandler}>
                <FaPlus color='while' />
            </button>
        </div>
    );
}

export default AddCellButton