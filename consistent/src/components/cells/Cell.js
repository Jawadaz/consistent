import { useState } from 'react';

import DeleteCellButton from './DeleteCellButton';
import ConfirmModal from '../ui/ConfirmModal';
import Backdrop from '../ui/Backdrop';
import CellContent from './CellContent';
import CellTags from './CellTags';

import classes from './Cell.module.css'

function Cell(props){
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function btnDeleteCellHandler(){
        console.log('btnDeleteCellHandler()');
        setModalIsOpen(true);
    };

    function closeModalHandler(){
        console.log('closeModalHandler()');
        setModalIsOpen(false);
    }

    function deleteCell(){
        console.log('deleteCell()');
        closeModalHandler();
    };

    return (
        <div className={classes.Cell}>
            <div className={classes.cell_inner}>
                <CellContent />
                <CellTags />
                <div className="actions">
                    <DeleteCellButton onClick={btnDeleteCellHandler}/>
                </div>
            </div>
            {modalIsOpen && <ConfirmModal onCancel={closeModalHandler} onConfirm={deleteCell}/>}
            {modalIsOpen && <Backdrop onClick={closeModalHandler}/>}
        </div>
    );
}

export default Cell