import { useContext, useState, useEffect } from 'react';

// TODO: consider moving to index.css
import classes from './Cell.module.css'


import ProjectContext from '../context/ProjectContext';
import CellTags from './CellTags';
import DeleteCellButton from './DeleteCellButton';

// TODO: implement cool modal yes/no at some point
// import ConfirmModal from '../ui/ConfirmModal';
// import Backdrop from '../ui/Backdrop';


function Cell( {cell} ){
    const { activeCellId, activateCell, deleteCell, updateCellContent } = useContext(ProjectContext);

    // const [ modalIsOpen, setModalIsOpen ] = useState(false);
    const [ cellContent, setCellContent ] = useState("");
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
        activateCell(cell.id);
    }

    useEffect(()=>{
        console.log('Cell.useEffect()');
        setIsActive(activeCellId===cell.id ? true: false);
      }, [activeCellId]);

    const handelUpdateCellContent=(event) => {
        const content = event.target.value; 
        setCellContent(content);
        updateCellContent(cell.id, content);
    }

    return (
        <div className={"Cell"} onClick={handleCellClick}>
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
                   
                    <div className="actions">
                        <DeleteCellButton onClick={(e)=>{e.stopPropagation(); deleteCell(cell.id)}}/>
                    </div>

            </div>
            <CellTags cell={cell} isActive={isActive}/>

            {/* {modalIsOpen && <ConfirmModal onCancel={handelCloseModal} onConfirm={handelConfirm}/>}
            {modalIsOpen && <Backdrop onClick={handelCloseModal}/>} */}

        </div>
    );
}

export default Cell