import { useState } from 'react';
import classes from './Cell.module.css'

import DeleteCellButton from './DeleteCellButton';
import ConfirmModal from '../ui/ConfirmModal';
import Backdrop from '../ui/Backdrop';
import CellTags from './CellTags';


function Cell( {cell, deleteCell, updateCellContent} ){

    const [ modalIsOpen, setModalIsOpen ] = useState(false);
    const [ cellContent, setCellContent ] = useState("");

    const handelDeleteCellButtonClick = () => {
        console.log('handelDelete()');
        setModalIsOpen(true);
    };

    const handelCloseModal = () => {
        console.log('handelCloseModal()');
        setModalIsOpen(false);
    }

    const handelConfirm = () => {
        console.log('handelDeleteCell()');
        handelCloseModal();
        deleteCell(cell.id); 
    };

    const handelUpdateCellContent=(event) => {
        setCellContent(event.target.value);
    }

    return (
        <div className={classes.Cell}>
            <div className={classes.CellInner}>
                <form>
                    <div className={classes.CellContent}>
                        {/* https://www.npmjs.com/package/react-textarea-autosize */}
                        <input 
                            onChange={handelUpdateCellContent} 
                            type="text" 
                            placeholdre=""
                            value={cellContent}
                        />
                    </div>
                    <CellTags props={cell.tags}/>
                    <div className="actions">
                        <DeleteCellButton onClick={()=>{deleteCell(cell.id)}}/>
                    </div>
                </form>
            </div>
            {modalIsOpen && <ConfirmModal onCancel={handelCloseModal} onConfirm={handelConfirm}/>}
            {modalIsOpen && <Backdrop onClick={handelCloseModal}/>}
        </div>
    );
}

export default Cell