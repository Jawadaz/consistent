import { FaArrowUp, FaArrowDown } from "react-icons/fa";

function MoveCellDownButton( ){
    return (
        <button className={'btn btn-primary'} onClick={(e)=>{console.log(e);}}>
            <FaArrowDown color='while' />
        </button>
    );
}

export default MoveCellDownButton;