import { useContext, useState, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import ProjectContext from '../context/ProjectContext';
import CellTags from './CellTags';
import CellControlsRight from './CellControlsRight';
import CellControlsLeft from './CellControlsLeft';

// TODO: implement cool modal yes/no at some point
// import ConfirmModal from '../ui/ConfirmModal';
// import Backdrop from '../ui/Backdrop';


function Cell( {cell} ){
    const { activeCellId, activateCell, updateCellContent, isProjectLocked } = useContext(ProjectContext);

    // const [ modalIsOpen, setModalIsOpen ] = useState(false);
    const [ cellContent, setCellContent ] = useState(cell.content);
    const [ isActive, setIsActive ] = useState(false);

    // const handelDeleteCellButtonClick = () => {
    //     console.log('handelDelete()');
    //     setModalIsOpen(true);
    // };

    // const handelCloseModal = () => {
    //     console.log('handelCloseModal()');
    //     setModalIsOpen(false);
    // }

    // const handelConfirm = () => {
    //     console.log('handelDeleteCell()');
    //     handelCloseModal();
    //     deleteCell(cell.id); 
    // };
    const handleCellClick=(event)=>{
        if(isProjectLocked){
            return;
        }
        activateCell(cell.id);
    }

    useEffect(()=>{
        console.log('Cell.useEffect()');
        setIsActive(activeCellId===cell.id ? true: false);
      }, [activeCellId, cell.id]
    );

    const handelUpdateCellContent=(event) => {
        const content = event.target.value; 
        setCellContent(content);
    }

    const handleUpdateCell=(event) =>{
        const content = event.target.value; 
        updateCellContent(cell.id, content);
    }

    return (
        <div className={"Cell"} onClick={handleCellClick}>
            <div className={'CellInner'}>
                    <div className={'CellContent'}>
                        {/* https://www.npmjs.com/package/react-textarea-autosize */}
                        <TextareaAutosize        
                            onChange={handelUpdateCellContent}
                            onBlur={handleUpdateCell}
                            type="text" 
                            placeholdre=""
                            value={cellContent}
                            // disabled={isProjectLocked}
                        />
                    </div>
                    {isActive && <CellControlsRight cell={cell}/>}                    
                    {isActive && <CellControlsLeft cell={cell}/>}
            </div>
            <CellTags cell={cell} isActive={isActive}/>
            {/* {modalIsOpen && <ConfirmModal onCancel={handelCloseModal} onConfirm={handelConfirm}/>}
            {modalIsOpen && <Backdrop onClick={handelCloseModal}/>} */}

        </div>
    );
}

export default Cell