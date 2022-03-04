import { FaTimes } from "react-icons/fa";

function DeleteCellButton(props){
    return (
        // Don't stop on tabindex
        // https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
        <button className={'btn btn-primary'}tabIndex={-1} onClick={props.onClick}>
            <FaTimes color="white" />
        </button>
    );
};

export default DeleteCellButton;