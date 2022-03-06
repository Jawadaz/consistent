import { useState } from 'react';
import { FaSave } from "react-icons/fa";
import AddCellButton from '../cells/AddCellButton';
import MoveCellDownButton from '../cells/MoveCellDownButton';
import MoveCellUpButton from '../cells/MoveCellUpButton';

function ProjectControls( {children, btnAddCellClickHandler, 
    btnSaveClickHandler, btnSaveAsClickHandler} )
{

    return (
        <div>
            {children}
            <AddCellButton btnAddCellClickHandler={btnAddCellClickHandler}/>
            <MoveCellUpButton />
            <MoveCellDownButton />
            <button className={'btn btn-primary'} onClick={btnSaveClickHandler}>
                    <FaSave color={'white'} />
            </button>
            <button className={'btn btn-primary'} onClick={btnSaveAsClickHandler}>
                Save As...
            </button>
        </div>
    );
}

export default ProjectControls;