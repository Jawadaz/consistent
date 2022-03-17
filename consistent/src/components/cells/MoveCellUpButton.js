import { FaArrowUp } from "react-icons/fa";

function MoveCellUpButton( ){
    return (
        <button className={'btn btn-primary'} onClick={(e)=>{console.log(e);}}>
            <FaArrowUp color='while' />
        </button>
    );
}

export default MoveCellUpButton;


