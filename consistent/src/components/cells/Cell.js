import { useState } from 'react';
import classes from './Cell.module.css'

import DeleteCellButton from './DeleteCellButton';
import ConfirmModal from '../ui/ConfirmModal';
import Backdrop from '../ui/Backdrop';
import CellTags from './CellTags';


function Cell( {cell, deleteCell, updateCellContent} ){

    const [ modalIsOpen, setModalIsOpen ] = useState(false);
    const [ cellContent, setCellContent ] = useState(cell.id);

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
        const content = event.target.value; 
        setCellContent(content);
        updateCellContent(cell.id, content);
    }

    return (
        <div className={"Cell"}>
            <div className={classes.CellInner}>

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

            </div>
            {modalIsOpen && <ConfirmModal onCancel={handelCloseModal} onConfirm={handelConfirm}/>}
            {modalIsOpen && <Backdrop onClick={handelCloseModal}/>}
        </div>
    );
}

export default Cell